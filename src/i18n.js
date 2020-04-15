import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { format as dateFnsFormat } from 'date-fns';
import { initReactI18next } from 'react-i18next';

import enResources from './locales/en/translation';
import frResources from './locales/fr/translation';

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    ns: ['translation', 'common'],
    resources: {
      en: { translation: enResources },
      fr: { translation: frResources },
    },
    lng: 'fr',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      format: function (value, format) {
        console.log('i18n value', value);
        console.log('i18n format', format);
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        if (format === 'capitalize') {
          return `${value.charAt(0).toUpperCase()} ${value.slice(1)}`;
        }
        if (value instanceof Date) {
          return dateFnsFormat(value, format);
        }
        return value.toUpperCase();
      },
    },
  });

export default i18n;
