const fs = require('fs');
const md5 = require('md5')
const path = require('path');
const glob = require('glob');
const SVGSpriter = require('svg-sprite');

const plugin = {
  name: 'svgToSprite'
};

// Generates styles for each icon.
class svgToSprite {
  constructor(inputPattern, outputSvgSpriteFilename, outputIconJsonFilename) {
    // Current theme name.
    this.themeName = path.basename(path.resolve(process.cwd())).replace(/_/g, '-');

    // Input and output patterns.
    this.inputPattern = inputPattern;
    this.svgSpriteFilename = outputSvgSpriteFilename;
    this.svgToCssOutputFilename = `css/${this.themeName}-icons.css`;
    this.svgToJsonOutputFilename = outputIconJsonFilename;

    // Mapped SVG files.
    this.files = [];
    this.cssVariables = [];
    this.classes = [];

    // Path for icons and icons css file.
    this.path = 'dist/icons';
    this.iconsCssPath = `dist/css/${this.themeName}-icons.css`;

    // Sprite configuration files.
    this.spriteFilename = 'icons/sprite.svg';
    this.spriteHashFilename = '';
  }

  apply(compiler) {
    const pluginName = svgToSprite.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    // Tapping to the "thisCompilation" hook in order to further tap
    // to the compilation process on an earlier stage.
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {

      // Tapping to the assets processing pipeline on a specific stage.
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        () => {
          if (this.files) {
            // Create Spriter instance with custom configuration.
            let spriter = new SVGSpriter({
              mode: {
                stack: {
                  dest: "dist",
                  sprite: this.svgSpriteFilename,
                }
              }
            });

            // Add SVG files to Spriter instance.
            this.files.map((pathname) => {
              spriter.add(pathname, null, fs.readFileSync(pathname, 'utf-8'));
            });

            // Compile the sprite.
            spriter.compile((error, result) => {
              for (let mode in result) {
                for (let resource in result[mode]) {
                  let hash = md5(result[mode][resource].contents).slice(-5);
                  let outputFilename = this.svgSpriteFilename.replace(/.svg/g, `-${hash}.svg`);

                  if (result[mode][resource].contents) {
                    this.spriteHashFilename = outputFilename;

                    // Adding new asset to the compilation, so it will be
                    // automatically generated by the webpack
                    // in the output directory.
                    compilation.emitAsset(
                      outputFilename,
                      new RawSource(result[mode][resource].contents)
                    );
                  }
                }
              }
            });
          }
        }
      );
    });

    // SVG to CSS.
    // Create styles for the icons.
    compiler.hooks.emit.tapAsync('svgToCss', (compilation, callback) => {
      let iconClass = this.themeName === 'hdbt' ? 'hel' : this.themeName;
      let useOldClass = this.themeName === 'hdbt'; // TODO: Remove once hdbt-icon class has been removed.

      // Create --hel-icon--{icon name} CSS variables.
      let cssVariables = 'html{';

      while(this.cssVariables.length) {
        let fullFilename = this.cssVariables.shift();
        let filename = fullFilename.replace(/^.*[\\\/]/, '')
        let name = filename.split('.');
        cssVariables += `--${iconClass}-icon--${name[0]}: url(../${this.spriteHashFilename}#${name[0]});`;
      }
      cssVariables += '}';

      // Create .hel-icon--{icon name} or {theme-name}--{icon name} css classes.
      let cssClasses = '';
      while(this.classes.length) {
        let fullFilename = this.classes.shift();
        let filename = fullFilename.replace(/^.*[\\\/]/, '')
        let name = filename.split('.');
        cssClasses += `.${iconClass}-icon--${name[0]} {--url: var(--${iconClass}-icon--${name[0]});}`;

        // TODO: Remove once hdbt-icon class has been removed.
        if (useOldClass) {
          cssClasses += `.hdbt-icon--${name[0]} {--url: var(--${iconClass}-icon--${name[0]});}`;
        }
      }

      // Add a URL as a CSS variable to the hel-icon mask-image.
      // If icons are used elsewhere (f.e. in a separate theme or module) this
      // variable will provide the correct URL for the icon.
      let hdbtIconUrl = `.${iconClass}-icon{` +
        `-webkit-mask-image:var(--url);mask-image:var(--url);` +
      `}`;

      // TODO: Remove once hdbt-icon class has been removed.
      if (useOldClass) {
        hdbtIconUrl += `.hdbt-icon::before{` +
          `-webkit-mask-image:var(--url);mask-image:var(--url);` +
        `}`;
      }

      // Combine CSS variables and classes.
      let filelist = cssVariables + cssClasses + hdbtIconUrl;

      // Compile the assets.
      compilation.assets[this.svgToCssOutputFilename] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };
      callback();
    });
    compiler.hooks.environment.tap('svgToCss', this.checkForFiles.bind(this));
    compiler.hooks.watchRun.tap('svgToCss', this.checkForFiles.bind(this));

    // SVG to JSON
    // Create a list of icons in JSON format.
    compiler.hooks.emit.tapAsync('svgToJson', (compilation, callback) => {
      let filelist = '[';
      const last = this.files[this.files.length - 1];

      while(this.files.length) {
        let fullfilename = this.files.shift();
        let filename = fullfilename.replace(/^.*[\\\/]/, '')
        let name = filename.split('.');
        let divider = (fullfilename === last) ? '"' : '",';
        filelist += '"' + name[0] + divider;
      }
      filelist += ']';

      compilation.assets[this.svgToJsonOutputFilename] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };
      callback();
    });
    compiler.hooks.environment.tap('svgToJson', this.checkForFiles.bind(this));
    compiler.hooks.watchRun.tap('svgToJson', this.checkForFiles.bind(this));
  }

  // Map files to suitable variables.
  checkForFiles() {
    glob.sync(this.inputPattern).map((match) => {
      const pathname = path.resolve(match);
      const stats = fs.lstatSync(pathname);

      if (stats.isFile()) {

        this.classes = [...new Set([...this.classes, pathname])];
        this.cssVariables = [...new Set([...this.cssVariables, pathname])];
        this.files = [...new Set([...this.files, pathname])];
      }
    });
  }
}

module.exports = svgToSprite;
