import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { AuthHeaderButtonGroup } from './style';
import type { AuthHeaderProps } from './type';
import { Button } from '@mui/material';

const AuthHeader: React.FC<AuthHeaderProps> = ({ active }) => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate(AppRoutes.Login);
  };

  const handleRegistrationNavigate = () => {
    navigate(AppRoutes.Login);
  };

  // return active === 'login' ? (
  //   <AuthHeaderButtonGroup>
  //     <ActiveButton variant="outlined" onClick={handleLoginNavigate}>
  //       {t('login')}
  //     </ActiveButton>
  //     <DefButton variant="outlined" onClick={handleRegistrationNavigate}>
  //       {t('signup')}
  //     </DefButton>
  //   </AuthHeaderButtonGroup>
  // ) : (
  //   <AuthHeaderButtonGroup>
  //     <DefButton variant="outlined" onClick={handleLoginNavigate}>
  //       {t('login')}
  //     </DefButton>
  //     <ActiveButton variant="outlined" onClick={handleRegistrationNavigate}>
  //       {t('signup')}
  //     </ActiveButton>
  //   </AuthHeaderButtonGroup>
  // );
  return (
    <AuthHeaderButtonGroup>
      <Button
        className={active === 'login' ? 'active' : undefined}
        onClick={() => navigate(AppRoutes.Login)}

      >
        {t('login')}
      </Button>

      <Button
        className={active === 'signup' ? 'active' : undefined}
        onClick={() => navigate(AppRoutes.Registration || AppRoutes.Login)} 
      >
        {t('signup')}
      </Button>
    </AuthHeaderButtonGroup>
  );
};

export default AuthHeader;
