/* eslint-disable no-console */
const processArgs = process.argv.slice(2);
const envPath = '../../../../.env';
require('dotenv').config({ path: envPath }); // Get environment from instance .env file
const backstop = require('backstopjs');
const fs = require('fs');

const TYPE = {
  FULL: 'full',
  FAST: 'fast'
};

const COMMAND = {
  REFERENCE: 'reference',
  TEST: 'test',
  APPROVE: 'approve',
};

function patchReport(type) {
  const reportFile = `backstop_data/${type}/html_report/index.html`;
  // eslint-disable-next-line func-names
  fs.readFile(reportFile, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/<script src="config.js">/g, `
      <style>
        [data-reactroot] div > img {
          outline: 1px dashed rebeccapurple;
        }
      </style>
      <script src="config.js?cachebust=${new Date().getTime()}">`);

    // eslint-disable-next-line func-names
    fs.writeFile(reportFile, result, 'utf8', function (error) {
      if (error) return console.log(error);
    });
  });
}

function getConfig(hostname, type) {
  const removeDefault = [
    '.header',
    '.breadcrumb__container',
    '.block--react-and-share',
    '.footer',
    '.sliding-popup-bottom'
  ];

  // All of our breakpoints
  let viewports = [
    {
      'label': 'Breakpoint_XS',
      'width': 320,
      'height': 450
    },
    {
      'label': 'Breakpoint_S',
      'width': 576,
      'height': 630
    },
    {
      'label': 'Breakpoint_M',
      'width': 768,
      'height': 920
    },
    {
      'label': 'Breakpoint_L',
      'width': 992,
      'height': 650
    },
    {
      'label': 'Breakpoint_XL',
      'width': 1024,
      'height': 580
    },
    {
      'label': 'Breakpoint_XXL',
      'width': 2560,
      'height': 1440
    }
  ];
  let expandComponents = true; // Get all the components on page

  // For faster checks, check only mobile and generic desktop sizes
  if (type === TYPE.FAST) {
    viewports = [
      {
        'label': 'Mobile',
        'width': 320,
        'height': 450
      },
      {
        'label': 'Desktop',
        'width': 1900,
        'height': 970
      }
    ];
    expandComponents = false; // Take only the first component into account with fast mode
  }

  return {
    filter: processArgs[2] ?? null, // Add filter for label string here if you want to debug a single component, like the events component.
    config: {
      'id': type,
      'viewports': viewports,
      'scenarios': [

        // Layout landing
        {
          'label': 'DC: layout landing - hero',
          'url': `https://${hostname}/en/dc-layouts/dc-landing-page//dc-landing-hero`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout landing - no-hero',
          'url': `https://${hostname}/en/dc-layouts/dc-landing-page//dc-landing-no-hero`,
          'removeSelectors': removeDefault
        },

        // Layout standard
        {
          'label': 'DC: layout standard - hero - subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-hero-subnav-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - hero - no-subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-hero-no-subnav`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - hero - no-subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-hero-no-subnav-no`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - no-hero - subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-no-hero-subnav`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - no-hero - subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-no-hero-subnav-no`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - no-hero - no-subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-no-hero-no-subnav-0`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - no-hero - no-subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-no-hero-no-subnav`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout standard - hero - subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-standard-page/dc-standard-hero-subnav-no`,
          'removeSelectors': removeDefault
        },

        // Layout tpr unit
        {
          'label': 'DC: layout tpr unit - subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-unit/dc-tpr-unit-subnav-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr unit - subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-unit/dc-tpr-unit-subnav-no-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr unit - no-subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-unit/dc-tpr-unit-no-subnav-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr unit - no-subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-unit/dc-tpr-unit-no-subnav-no-sidebar`,
          'removeSelectors': removeDefault
        },

        // Layout tpr service
        {
          'label': 'DC: layout tpr service - subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-service/dc-tpr-service-subnav-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr service - subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-service/dc-tpr-service-subnav-no-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr service - no-subnav - sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-service/dc-tpr-service-no-subnav-sidebar`,
          'removeSelectors': removeDefault
        },
        {
          'label': 'DC: layout tpr service - no-subnav - no-sidebar',
          'url': `https://${hostname}/en/dc-layouts/dc-tpr-service/dc-tpr-service-no-subnav-no-sidebar`,
          'removeSelectors': removeDefault
        },

        // Components
        {
          'label': 'DC: component accordion',
          'url': `https://${hostname}/en/dc-components/dc-accordion`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--accordion'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component banner',
          'url': `https://${hostname}/en/dc-components/dc-banner`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--banner'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component chart',
          'url': `https://${hostname}/en/dc-components/dc-chart`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--chart'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component columns',
          'url': `https://${hostname}/en/dc-components/dc-columns`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--columns'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component contact card listing',
          'url': `https://${hostname}/en/dc-components/dc-contact-card-listing`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--contact-card-listing'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component content cards',
          'url': `https://${hostname}/en/dc-components/dc-content-cards`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--content-cards'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component content liftup',
          'url': `https://${hostname}/en/dc-components/dc-content-liftup`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--content-liftup'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component events',
          'url': `https://${hostname}/en/dc-components/dc-events`,
          'removeSelectors': removeDefault,
          // 'hideSelectors': [
          //   '.event-list__event-image',
          // ],
          'delay': 1000, // The images are slow to load
          'readySelector': '.react-search__results-stats',
          'selectors': [
            '.component--event-list'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component image',
          'url': `https://${hostname}/en/dc-components/dc-image`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--image'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component liftup with image',
          'url': `https://${hostname}/en/dc-components/dc-liftup-with-image`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--liftup-with-image'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component list of links',
          'url': `https://${hostname}/en/dc-components/dc-list-of-links`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--list-of-links'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component map',
          'url': `https://${hostname}/en/dc-components/dc-map`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--map'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component remote video',
          'url': `https://${hostname}/en/dc-components/dc-remote-video`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--remote-video'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component service list',
          'url': `https://${hostname}/en/dc-components/dc-service-list`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--service-list'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component sidebar text',
          'url': `https://${hostname}/en/dc-components/dc-sidebar-text`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.sidebar-text'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component text',
          'url': `https://${hostname}/en/dc-components/dc-text`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--paragraph-text'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component unit search',
          'url': `https://${hostname}/en/dc-components/dc-unit-search`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--unit-search'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component news list',
          'url': `https://${hostname}/en/dc-components/dc-news-list`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--news-list'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component popular services',
          'url': `https://${hostname}/en/dc-components/dc-popular-services`,
          'removeSelectors': removeDefault,
          'selectors': [
            '.component--popular-services'
          ],
          'selectorExpansion': expandComponents,
        },
        {
          'label': 'DC: component phasing',
          'url': `https://${hostname}/en/dc-components/dc-phasing`,
          'removeSelectors': removeDefault,
          'selectorExpansion': expandComponents,
        },
        // {
        //   'label': 'Component Banner',
        //   'cookiePath': 'backstop_data/engine_scripts/cookies.json',
        //   'url': `https://${hostname}/en/dc-components/dc-banner`,
        //   'referenceUrl': '',
        //   'readyEvent': '',
        //   'readySelector': '',
        //   'delay': 0,
        //   'hideSelectors': [],
        //   'removeSelectors': removeDefault,
        //   'hoverSelector': '',
        //   'clickSelector': '',
        //   'postInteractionWait': 0,
        //   'selectors': [
        //     '.component--banner'
        //   ],
        //   'selectorExpansion': true,
        //   'expect': 0,
        //   'misMatchThreshold': 0.1,
        //   'requireSameDimensions': true
        // }
      ],
      'mergeImgHack': true,
      'onBeforeScript': 'onBefore.js',
      // 'onReadyScript': 'onReady.js',
      'paths': {
        'bitmaps_reference': `backstop_data/${type}/bitmaps_reference`,
        'bitmaps_test': `backstop_data/${type}/bitmaps_test`,
        'engine_scripts': `backstop_data/${type}/engine_scripts`,
        'html_report': `backstop_data/${type}/html_report`,
        'ci_report': `backstop_data/${type}/ci_report`
      },
      'report': ['browser'],
      'engine': 'playwright',
      'engineOptions': {
        'browser': 'chromium',
        // 'browser': 'firefox',
        // 'browser': 'webkit',
        'args': ['--no-sandbox'],
      },
      'asyncCaptureLimit': 10,
      'asyncCompareLimit': 100,
      'debug': false,
      'debugWindow': false,
      'hostname': `${hostname}`,
    }
  };
}

if (process.env.DRUPAL_HOSTNAME) {
  const hostname = process.env.DRUPAL_HOSTNAME;
  const type = (processArgs.includes(TYPE.FAST)) ? TYPE.FAST : TYPE.FULL;
  let command;

  if (processArgs.includes(COMMAND.REFERENCE)) {
    command = COMMAND.REFERENCE;
  } else if (processArgs.includes(COMMAND.TEST)) {
    command = COMMAND.TEST;
  } else if (processArgs.includes(COMMAND.APPROVE)) {
    command = COMMAND.APPROVE;
  } else {
    throw new Error('Missing a known command');
  }

  const reportUrl = `https://${hostname}/themes/contrib/hdbt/backstop_data/${type}/html_report/index.html`;

  backstop(command, getConfig(hostname, type))
    .then(() => {
      patchReport(type);
      if(command === COMMAND.REFERENCE) {
        console.log(`\n\n📗 Created reference\n\nNext, do some changes and run 'test' command or check the report:\n🖼️  ${reportUrl}`);
      } else if (command === COMMAND.TEST) {
        console.log(`\n\n📗 Test passed\n\nYou can now check the report:\n🖼️  ${reportUrl}`);
      } else if (command === COMMAND.APPROVE) {
        console.log(`\n\n📗 Approved changes, you can verify by checking the report:\n\nYou can now check the report:\n🖼️  ${reportUrl}`);
      }

    }).catch((e) => {
      patchReport(type);
      console.error('\n\n📕 ', e, `\n\nCheck the report:\n🖼️  ${reportUrl}`);
    });

} else {
  console.error(`📕 Environment not found, are you sure the instance .env file can be found in ${envPath}?`);
}
