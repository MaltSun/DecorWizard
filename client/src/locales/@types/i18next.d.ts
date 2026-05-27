import type common from '../locales/ru/common.json';
import type aboutUs from '../locales/ru/aboutUs.json';
import type questions from '../locales/ru/question.json';
import type auth from '../locales/ru/auth.json';
import type slider from '../locales/ru/slider.json';
import type steps from '../locales/ru/steps.json';
import type catalog from '../locales/ru/catalog.json';
import type cart from '../locales/ru/cart.json';
import type reviews from '../locales/ru/reviews.json';
import type treeSurvey from '../locales/ru/treeSurvey.json';

type Resources = {
  common: typeof common;
  aboutUs: typeof aboutUs;
  questions: typeof questions;
  auth: typeof auth;
  slider: typeof slider;
  steps: typeof steps;
  catalog: typeof catalog;
  cart: typeof cart;
  reviews: typeof reviews;
  treeSurvey: typeof treeSurvey;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
  }
}
