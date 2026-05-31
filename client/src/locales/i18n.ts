import i18n from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initConfig = {
  fallbackLng: 'ru',
  supportedLngs: ['en', 'ru'],
  defaultNS: 'common',
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
  },
  interpolation: { escapeValue: false },
  partialBundledLanguages: true,
  react: { useSuspense: true },
};

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      fetch(`/locales/${language}/${namespace}.json`).then((res) => res.json()),
    ),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(initConfig);

export default i18n;
