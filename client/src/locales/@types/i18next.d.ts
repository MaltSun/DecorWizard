import type common from '../locales/ru/common.json';
import type aboutUs from '../locales/ru/aboutUs.json';
import type questions from '../locales/ru/question.json';

type Resources = {
  common: typeof common;
  aboutUs: typeof aboutUs;
  questions: typeof questions;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
  }
}
