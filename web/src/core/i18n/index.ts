import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import deTranslations from '~/translations/de.json';
import enTranslations from '~/translations/en.json';
import viTranslations from '~/translations/vi.json';
import { isDev } from '../config';

export const i18nResources = {
  de: { title: 'Deutsch', translation: deTranslations },
  en: { title: 'English', translation: enTranslations },
  vi: { title: 'Tiếng Việt', translation: viTranslations }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    debug: isDev,
    resources: i18nResources,
    fallbackLng: 'en',
    keySeparator: '.',
    interpolation: { escapeValue: false }
  });

export default i18n;
