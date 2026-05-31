import React, { useState } from 'react';
import { HeaderContainer, NavContent, NavActions, StyledButton, LogoName, BurgerDrawer, BurgerButton, BurgerNavContent, BurgerItem } from './style';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import {
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Box,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import CartDrawer from '../Cart/Cart';
import { useCart } from '../../pages/Cart/useCart';

const BurgerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

interface HeaderProps {
  active?: string;
}

const DRAWER_BREAKPOINT = 1100;

const Header: React.FC<HeaderProps> = ({ active = 'main' }) => {
  const [t] = useTranslation(['common']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(DRAWER_BREAKPOINT));
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleMainNavigate = () => {
    navigate(AppRoutes.Main);
    setDrawerOpen(false);
  };

  const handleCatalogNavigate = () => {
    navigate(AppRoutes.Catalog);
    setDrawerOpen(false);
  };

  const handleHistoryNavigate = () => {
    navigate(AppRoutes.History);
    setDrawerOpen(false);
  };

  const handleProfileNavigate = () => {
    if (sessionStorage.getItem('user')) {
      navigate(AppRoutes.Profile.Path);
    } else {
      navigate(AppRoutes.Login);
    }
    setDrawerOpen(false);
  };

  const navItems = [
    { key: 'catalog', label: t('common:catalog'), onClick: handleCatalogNavigate },
    { key: 'history', label: t('common:history'), onClick: handleHistoryNavigate },
    { key: 'profile', label: t('common:profile'), onClick: handleProfileNavigate },
  ];

  const renderNavButtons = () =>
    navItems.map(({ key, label, onClick }) => (
      <StyledButton
        key={key}
        sx={theme =>
          active === key && {
            color: theme.palette.text.primary,
            textDecoration: 'underline'
          }
        }
        onClick={onClick}
      >
        {label}
      </StyledButton>
    ));

  return (
    <HeaderContainer>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: theme.palette.primary.main, p: 1 }}
          >
            <BurgerIcon />
          </IconButton>
        )}
        <LogoName
          sx={{
            fontSize: { xs: '28px', sm: '35px', md: '50px' },
            lineHeight: 1
          }}
          onClick={handleMainNavigate}
        >
          DECORWIZARD
        </LogoName>
      </Box>

      {!isMobile && (
        <NavContent>
          {renderNavButtons()}
        </NavContent>
      )}

      <NavActions>
        {!isMobile && (
          <>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </>
        )}

        <IconButton color="inherit" onClick={() => setCartOpen(true)} sx={{ p: 1 }}>
          <ShoppingCartIcon />
        </IconButton>
      </NavActions>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <BurgerDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ flexGrow: 1 }}>
            {navItems.map(({ key, label, onClick }) => (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  onClick={onClick}
                  selected={active === key}
                  sx={{
                    borderRadius: '8px',
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: active === key ? 'bold' : 'normal', textTransform: 'uppercase' }}>
                    {label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {isMobile && (
            <Box sx={{
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </Box>
          )}
        </Box>
      </BurgerDrawer>
    </HeaderContainer>
  );

};

export default Header;
