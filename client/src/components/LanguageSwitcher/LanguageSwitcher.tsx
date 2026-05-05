import React from 'react';
import { useTranslation } from 'react-i18next';
import { SwitchButton } from './type';
import theme from '../../../theme/theme';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    sessionStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      style={{
        width: '60px',
        border: '2px solid',
        borderRadius: '20px',
        padding: '5px',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: 'transparent',
        fontWeight: 'bold',
        fontSize: '20px',
      }}
      onClick={toggleLanguage}
    >
      {i18n.language === 'en' ? 'RU' : 'EN'}  
    </button>
  );
};

export default LanguageSwitcher;
