import { Localization, LocalizationProps } from 'expo-localization';
import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import { localeResources } from './locale';

/**
 * Initialize i18n
 */
export function initI18N(): void {

  const languageDetector: i18next.i18n = {
    type: 'languageDetector',
    async: true,
    detect: (callback: (locale: string) => void): {} =>
      Localization
      .getLocalizationAsync()
      .then(({locale}: LocalizationProps) => {
        callback(locale);
      }),
    // @ts-ignore
    init: (): void => {}, // tslint:disable-line:no-empty
    // tslint:disable-next-line:no-empty
    cacheUserLanguage: (): void => {},
  };

  i18next
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'en',

      // Load i18n messages here
      resources: localeResources,

      ns: ['common'],
      defaultNS: 'common',

      debug: true, // TODO disable in prod

      interpolation: {
        escapeValue: false, // not needed for react
      },
    });
}
