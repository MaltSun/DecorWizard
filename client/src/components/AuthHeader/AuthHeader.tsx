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
