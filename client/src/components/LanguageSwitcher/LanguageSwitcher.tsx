import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme/theme';
import { buttonStyles, flagStyles } from './style';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    sessionStorage.setItem('i18nextLng', newLang);
  };

  const isEnglish = i18n.language === 'en';



  return (
    <button style={buttonStyles} onClick={toggleLanguage}>
      <img
        src={isEnglish ? '/images/flags/ru.png' : '/images/flags/en.png'}
        alt={isEnglish ? 'Русский' : 'English'}
        style={flagStyles}
      />
    </button>
  );
};

export default LanguageSwitcher;