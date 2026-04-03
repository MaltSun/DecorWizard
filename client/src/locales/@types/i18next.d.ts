import type common from '../locales/ru/common.json';
import type aboutUs from '../locales/ru/aboutUs.json';
import type questions from '../locales/ru/question.json';
import type auth from '../locales/ru/auth.json';
import type slider from '../locales/ru/slider.json';
import type steps from '../locales/ru/steps.json';
import type catalog from '../locales/ru/catalog.json';

type Resources = {
  common: typeof common;
  aboutUs: typeof aboutUs;
  questions: typeof questions;
  auth: typeof auth;
  slider: typeof slider;
  steps: typeof steps;
  catalog: typeof catalog;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
  }
}
