const Mustache = require('mustache');

class HelfiCalculator {
  constructor({ name, translations }) {
    this.name = name;
    this.templates = null;
    this.id = null;

    const global_translations = {
      unit_euro: {
        fi: 'euroa',
        sv: 'i euro',
        en: 'in euros',
      },
      unit_person: {
        fi: 'henkeä',
        sv: 'i personer',
        en: 'persons',
      },
      unit_hour: {
        fi: 'tuntia',
        sv: 'i timmar',
        en: 'in hours',
      },
      unit_times_per_month: {
        fi: 'krt / kk',
        sv: null,
        en: null,
      },
      unit_amount_per_month: {
        fi: 'kpl / kk',
        sv: null,
        en: null,
      },
      per_item_variable: {
        fi: 'à ${amount} ',
        sv: null,
        en: null,
      },
      per_item_unit_euro: {
        fi: '${amount} euroa',
        sv: '${amount}€',
        en: '€ ${amount}',

      },
      calculate: {
        fi: 'Laske',
        sv: 'Beräkna',
        en: 'Calculate',
      },
      reset: {
        fi: 'Tyhjennä',
        sv: null,
        en: 'Reset',
      },
      missing_input: {
        fi: 'Tietoja puuttuu',
        sv: null,
        en: 'Missing information',
      },
      select_radio: {
        fi: 'Valitse "${fieldName}"',
        sv: null,
        en: 'Select "${fieldName}"',
      },
      enter_value: {
        fi: 'Täytä "${fieldName}"',
        sv: null,
        en: 'Enter "${fieldName}"',
      },
      must_be_number: {
        fi: '${fieldName} pitää olla numero',
        sv: null,
        en: '${fieldName} must be a number',
      },
      must_be_whole_number: {
        fi: '${fieldName} pitää olla kokonaisluku',
        sv: null,
        en: '${fieldName} must be a whole number',
      },
      min_or_max_out_of_bounds: {
        fi: '${fieldName} pitää olla väliltä ${min} ja ${max}',
        sv: null,
        en: '${fieldName} must be between ${min} and ${max}',
      },
      min_out_of_bounds: {
        fi: '${fieldName} pitää olla ${min} tai enemmän',
        sv: null,
        en: '${fieldName} must be ${min} or more',
      },
      max_out_of_bounds: {
        fi: '${fieldName} pitää olla ${max} tai vähemmän',
        sv: null,
        en: '${fieldName} must be ${max} or fewer',
      },
      result: {
        fi: 'Lopputulos',
        sv: null,
        en: 'Result',
      },
    };
    this.translations = { ...global_translations, ...translations };
  }

  t(key, values) {
    return this.translate(key, values);
  }

  translate(key, values) {
    if (!this.translations) {
      throw 'Translations are missing';
    }

    // https://stackoverflow.com/a/41540381
    function index(obj, is, value) {
      if (typeof is == 'string') {
        is = is.split('.');
      }
      if (is.length == 1 && value !== undefined) {
        return obj[is[0]] = value;
      } else if (is.length == 0) {
        return obj;
      } else {
        return index(obj[is[0]], is.slice(1), value);
      }
    }

    const lang = drupalSettings.path.currentLanguage || 'fi'; // TODO: Is this lang check ok?
    const translation = this.translations[key] ? this.translations[key][lang] : null;
    if (translation) {
      return translation.replace(/\$\{.+?\}/g, (match) => {
        const stripDollarAndParenthesis = match.replace(/(^\$\{|\}$)/g, '');
        return index(values, stripDollarAndParenthesis);
      });
    }
    return `Missing translation: ${key}:${lang}`;
  }

  parseSettings(settings) {
    let parsed;
    try {
      parsed = JSON.parse(settings);
    } catch (e) {
      console.error(`Problem with ${this.name} settings:`, settings);
      throw e;
    }
    return parsed;
  }

  getFieldValue(elemID) {
    const elem = document.querySelector(`#${elemID}_${this.id}`);
    if (!elem) {
      throw `Element #${elemID}_${this.id} missing from ${this.name} at getFieldValue`;
    }

    if (elem.dataset?.type === 'radio') {
      const checked = elem.querySelector('input:checked');
      if (checked) {
        return checked.value;
      } else {
        return null;
      }
    }

    if (elem.dataset?.type === 'input_integer' || elem.dataset?.type === 'input_float') {

      // Check that required input has value
      if (elem.value === 'undefined' || elem.value === '') {
        return null;
      }

      const elemValue = elem.value.replace(',', '.');

      if (elem.dataset.type === 'input_integer' && Number.isNaN(Number.parseInt(elemValue))) {
        return null;
      }

      if (elem.dataset.type === 'input_float' && Number.isNaN(Number.parseFloat(elemValue))) {
        return null;
      }

      return elemValue;
    }

  }

  validateBasics(elemID) {

    const elem = document.querySelector(`#${elemID}_${this.id}`);
    if (!elem) {
      throw `Element #${elemID}_${this.id} missing from ${this.name} at validateBasics`;
    }

    const fieldName = document.querySelector(`#label_${elem.id}`)?.innerText || elem.id;

    if (elem.dataset?.type === 'radio') {
      const checked = elem.querySelector('input:checked');
      if (!checked && elem.dataset.required) {
        return [this.translate('select_radio', { fieldName: fieldName })];
      }
    }

    // Check number inputs
    if (elem.dataset?.type === 'input_integer' || elem.dataset?.type === 'input_float') {

      // Optional empty inputs can be ignored
      if (!elem.dataset.required && (typeof elem.value === 'undefined' || elem.value === '')) {
        return [];
      }

      // Check that required input has value
      if (elem.value === 'undefined' || elem.value === '') {
        return [this.translate('enter_value', { fieldName: fieldName })];
      }

      const elemValue = elem.value.replace(',', '.');

      // Check if it's an integer number
      const integerRegex = /^-?([1-9][0-9]*|0)$/;
      if (elem.dataset.type === 'input_integer' && !integerRegex.test(elemValue)) {
        return [this.translate('must_be_whole_number', { fieldName: fieldName })];
      }

      // Check if it's a decimal number or integer
      const floatRegex = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
      if (elem.dataset.type === 'input_float' && !floatRegex.test(elemValue)) {
        return [this.translate('must_be_number', { fieldName: fieldName })];
      }

      // If both bounds are set
      if (typeof elem.dataset.min !== 'undefined' && typeof elem.dataset.max !== 'undefined') {
        if (Number.parseFloat(elem.dataset.min) > Number.parseFloat(elemValue) || elemValue > Number.parseFloat(elem.dataset.max)) {
          return [this.translate('min_or_max_out_of_bounds', { fieldName: fieldName, min: elem.dataset.min, max: elem.dataset.max })];
        }
        // Less than min
      } else if (typeof elem.dataset.min !== 'undefined') {
        if (Number.parseFloat(elem.dataset.min) > Number.parseFloat(elemValue)) {
          return [this.translate('min_out_of_bounds', { fieldName: fieldName, min: elem.dataset.min })];
        }
        // More than max
      } else if (typeof elem.dataset.max !== 'undefined') {
        if (Number.parseFloat(elemValue) > Number.parseFloat(elem.dataset.max)) {
          return [this.translate('max_out_of_bounds', { fieldName: fieldName, max: elem.dataset.max })];
        }
      }
    }
    return [];
  }


  hideGroup(id) {
    const elem = document.querySelector(`#${id}_${this.id}:not([data-hide-group='true'])`);
    if (elem && elem.dataset) {
      elem.dataset.hideGroup = true;
    }
  }

  showGroup(id) {
    const elem = document.querySelector(`#${id}_${this.id}[data-hide-group='true']`);
    if (elem && elem.dataset) {
      elem.dataset.hideGroup = false;
    }
  }

  renderResult(result) {
    let resultClass;
    if (result.error) {
      resultClass = 'hds-notification--error';
    } else if (result.alert) {
      resultClass = 'hds-notification--alert';
    } else if (result.info) {
      resultClass = 'hds-notification--info';
    }

    let message = result.message;
    if (Array.isArray(result.message) && result.message.length > 1) {
      message = `<ul><li>${result.message.join('</li><li>')}</li></ul>`;
    }

    document.querySelector(`#${this.id} .helfi-calculator-result`).innerHTML = `
        <section aria-label="Notification" class="hds-notification ${resultClass}">
          <div class="hds-notification__content">
            <div class="hds-notification__label" role="heading" aria-level="2">
              <span>${result.title}</span>
            </div>
            <div class="hds-notification__body">${message}</div>
          </div>
        </section>`;
  }

  clearResult() {
    document.querySelector(`#${this.id} .helfi-calculator-result`).innerHTML = '';
  }

  init({ id, form_data, eventHandlers }) {
    this.id = id;

    this.templates = {
      form: `
        <form class="helfi-calculator">
          {{#form_items}}
            {{>form_item}}
          {{/form_items}}
          <div class="helfi-calculator__buttons">
            <input type="submit" enterkeyhint="done" value="{{#submit}}{{submit}}{{/submit}}{{^submit}}${this.translate('calculate')}{{/submit}}" class="hds-button hds-button--primary">
            <input type="reset" value="{{#reset}}{{reset}}{{/reset}}{{^reset}}${this.translate('reset')}{{/reset}}" class="hds-button hds-button--secondary">
          </div>
        </form>
        <div class="helfi-calculator-result" aria-live="polite" aria-atomic="true"></div>
      `,
      partials: {
        form_item: `
          <div class="helfi-calculator__item">
            {{#group}}{{>group}}{{/group}}
            {{#heading}}{{>heading}}{{/heading}}
            {{#paragraph}}{{>paragraph}}{{/paragraph}}
            {{#input}}{{>input}}{{/input}}
            {{#input_integer}}{{>input_integer}}{{/input_integer}}
            {{#input_float}}{{>input_float}}{{/input_float}}
            {{#radio}}{{>radio}}{{/radio}}
          </div>
        `,
        group_item: `
          <div class="helfi-calculator__item">
            {{#heading}}{{>heading}}{{/heading}}
            {{#paragraph}}{{>paragraph}}{{/paragraph}}
            {{#input}}{{>input}}{{/input}}
            {{#input_integer}}{{>input_integer}}{{/input_integer}}
            {{#input_float}}{{>input_float}}{{/input_float}}
            {{#radio}}{{>radio}}{{/radio}}
          </div>
        `,
        group: `
          <div id="{{id}}_{{form_id}}" class="helfi-calculator__group" {{#hide_group}}data-hide-group="true"{{/hide_group}}>
            {{#group_items}}
              {{>group_item}}
            {{/group_items}}
          </div>
        `,
        heading: `
          <h{{level}}{{^level}}2{{/level}}>{{text}}</h{{level}}{{^level}}2{{/level}}>
        `,
        paragraph: `
          <p>{{text}}</p>
        `,
        input: `
          <div class="form-item hds-text-input">
            {{#label}}<label class="hds-text-input__label" for="{{id}}_{{form_id}}">{{label}}{{#unit}} ({{unit}}){{/unit}}{{#required}}<span aria-label="required" class="required">*</span>{{/required}}</label>{{/label}}
            <div class="hds-text-input__input-wrapper">
              <input
                type="{{type}}"
                data-type="input"
                id="{{id}}_{{form_id}}"
                name="{{id}}"
                {{#inputmode}}inputmode="{{inputmode}}"{{/inputmode}}
                {{#pattern}}pattern="{{pattern}}"{{/pattern}}
                {{#min}}data-min="{{min}}"{{/min}}
                {{#max}}data-max="{{max}}"{{/max}}
                {{#size}}size="{{size}}"{{/size}}
                {{#maxlength}}maxlength="{{maxlength}}"{{/maxlength}}
                {{#required}}data-required="required"{{/required}}
                {{#label}}data-label="{{label}}"{{/label}}
                {{#value}}value="{{value}}"{{/value}}
                class="form-text hds-text-input__input">
            </div>
            {{#helper_text}}<span class="hds-text-input__helper-text">{{helper_text}}</span>{{/helper_text}}
          </div>
        `,
        input_integer: `
          <div class="form-item hds-text-input">
            <label class="hds-text-input__label" for="{{id}}_{{form_id}}"><span id="label_{{id}}_{{form_id}}">{{label}}</span>{{#unit}} ({{unit}}){{/unit}}{{#required}}<span aria-label="required" class="required">*</span>{{/required}}</label>
            <div class="hds-text-input__input-wrapper">
              <input
                type="text"
                data-type="input_integer"
                id="{{id}}_{{form_id}}"
                name="{{id}}"
                inputmode="numeric"
                {{#min}}data-min="{{min}}"{{/min}}
                {{#max}}data-max="{{max}}"{{/max}}
                {{#size}}size="{{size}}"{{/size}}
                {{#maxlength}}maxlength="{{maxlength}}"{{/maxlength}}
                {{#required}}data-required="required"{{/required}}
                data-label="label_{{id}}_{{form_id}}"
                {{#value}}value="{{value}}"{{/value}}
                class="form-text hds-text-input__input">
            </div>
            {{#helper_text}}<span class="hds-text-input__helper-text">{{helper_text}}</span>{{/helper_text}}
          </div>
        `,
        input_float: `
          <div class="form-item hds-text-input">
            <label class="hds-text-input__label" for="{{id}}_{{form_id}}"><span id="label_{{id}}_{{form_id}}">{{label}}</span>{{#unit}} ({{unit}}){{/unit}}{{#required}}<span aria-label="required" class="required">*</span>{{/required}}</label>
            <div class="hds-text-input__input-wrapper">
              <input
                type="text"${''/* We can not use numeric here, nor can we use inputmode decimal https://design-system.service.gov.uk/components/text-input/#asking-for-decimal-numbers */}
                data-type="input_float"
                id="{{id}}_{{form_id}}"
                name="{{id}}"
                {{#min}}data-min="{{min}}"{{/min}}
                {{#max}}data-max="{{max}}"{{/max}}
                {{#size}}size="{{size}}"{{/size}}
                {{#maxlength}}maxlength="{{maxlength}}"{{/maxlength}}
                {{#required}}data-required="required"{{/required}}
                {{#label}}data-label="{{label}}"{{/label}}
                {{#value}}value="{{value}}"{{/value}}
                class="form-text hds-text-input__input">
            </div>
            {{#helper_text}}<span class="hds-text-input__helper-text">{{helper_text}}</span>{{/helper_text}}
          </div>
        `,
        radio: `
          <fieldset
              data-type="radio"
              id="{{id}}_{{form_id}}"
              {{#required}}data-required="true"{{/required}}
              class="hds-selection-group">
            <legend class="hds-selection-group__legend"><span id="label_{{id}}_{{form_id}}">{{label}}</span>{{#unit}} ({{unit}}){{/unit}}{{#required}}<span aria-label="required" class="required">*</span>{{/required}}</legend>
            <div class="hds-selection-group__items">
              {{#radio_items}}
                {{>radio_item}}
              {{/radio_items}}
            </div>
          </fieldset>
        `,
        radio_item: `
          <div class="hds-selection-group__item">
            <div class="hds-radio-button">
              <input
                type="radio"
                id="{{item_id}}_{{form_id}}"
                name="{{name}}"
                {{#required}}data-required="required"{{/required}}
                data-label="label_{{id}}_{{form_id}}"
                value="{{value}}"
                class="hds-radio-button__input">
              <label for="{{item_id}}_{{form_id}}" class="hds-radio-button__label">{{label}}</label>
            </div>
          </div>
        `,
      }
    };

    const render = Mustache.render(
      this.templates.form,
      form_data,
      this.templates.partials,
    );

    document.getElementById(this.id).innerHTML = render;

    for (const event in eventHandlers) {
      if (Object.hasOwnProperty.call(eventHandlers, event)) {
        document.getElementById(id).addEventListener(event, eventHandlers[event]);
        // console.log('Started waiting for', event, '-events');
      }
    }
  }
}


// module.exports = () => new HelfiCalculator();
window.HelfiCalculator = (translations) => {
  return new HelfiCalculator(translations);
};


