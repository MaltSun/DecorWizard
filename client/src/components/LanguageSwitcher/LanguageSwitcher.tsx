import React from 'react';
import { useTranslation } from 'react-i18next';
import { SwitchButton } from './type';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    sessionStorage.setItem('i18nextLng', newLang);
  };

  return (
    <SwitchButton onClick={toggleLanguage}>
      {i18n.language === 'en' ? 'EN' : 'RU'}
    </SwitchButton>
  );
};

export default LanguageSwitcher;
