import React from 'react';
import { HeaderContainer, MaterialUISwitch, StyledButton } from './style';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { Typography } from '@mui/material';
import { HeaderProps } from './type';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Header: React.FC<HeaderProps> = ({ active = 'main' }) => {
  const [t] = useTranslation(['common']);

  const navigate = useNavigate();

  const handleMainNavigate = () => {
    navigate(AppRoutes.Main);
  };
  const handleHistoryNavigate = () => {
    navigate(AppRoutes.History);
  };
  const handleProfileNavigate = () => {
    navigate(AppRoutes.Profile);
  };
  return (
    <HeaderContainer>
      <div>
        <Typography
          sx={{ fontSize: '80px', color: '#FD8E53', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={handleMainNavigate}
        >
          decorwizard
        </Typography>
      </div>

      <StyledButton
        sx={
          active === 'main' && {
            fontWeight: 'bold',
            textShadow: '0 0 5px #000',
          }
        }
        onClick={handleMainNavigate}
      >
        {t('common:catalog')}
      </StyledButton>
      <StyledButton
        sx={
          active === 'catalog' && {
            fontWeight: 'bold',
            textShadow: '0 0 5px #000',
          }
        }
        onClick={handleHistoryNavigate}
      >
        {t('common:catalog')}
      </StyledButton>
      <StyledButton
        sx={
          active === 'profile' && {
            fontWeight: 'bold',
            textShadow: '0 0 5px #000',
          }
        }
        onClick={handleProfileNavigate}
      >
        {t('common:profile')}
      </StyledButton>

      <LanguageSwitcher />
    </HeaderContainer>
  );
};

export default Header;
