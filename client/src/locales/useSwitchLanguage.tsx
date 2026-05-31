import i18n from './i18n';

const useSwitchLanguage = () => {
  return languageId => i18n.changeLanguage(languageId);
};

export default useSwitchLanguage;