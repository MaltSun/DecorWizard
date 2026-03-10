import React, { useState } from 'react';
import { HeaderContainer, NavContent, NavActions, StyledButton } from './style';
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

const DRAWER_BREAKPOINT = 870;

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
  
  const handleProfileNavigate = () => {
    navigate(AppRoutes.Profile);
    setDrawerOpen(false);
  };

  const navItems = [
    { key: 'main', label: t('common:main'), onClick: handleMainNavigate },
    { key: 'catalog', label: t('common:catalog'), onClick: handleCatalogNavigate },
    { key: 'profile', label: t('common:profile'), onClick: handleProfileNavigate },
  ];

  const renderNavButtons = () =>
    navItems.map(({ key, label, onClick }) => (
      <StyledButton
        key={key}
        sx={theme =>
          active === key && {
            fontWeight: 'bold',
            textShadow: `0 0 5px ${theme.palette.common.black}`,
          }
        }
        onClick={onClick}
      >
        {label}
      </StyledButton>
    ));

  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>
        {isMobile && (
          <IconButton
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={t => ({ color: t.palette.primary.main })}
          >
            <BurgerIcon />
          </IconButton>
        )}
        <Typography
          sx={theme => ({
            fontSize: isMobile ? '40px' : '80px',
            color: theme.palette.primary.main,
            cursor: 'pointer',
            fontWeight: 'bold',
          })}
          onClick={handleMainNavigate}
        >
          decorwizard
        </Typography>
      </Box>

      {!isMobile && (
        <NavContent>
          {renderNavButtons()}
          <NavActions>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </NavActions>
        </NavContent>
      )}

      {isMobile && (
        <NavActions>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </NavActions>
      )}

      <IconButton color="inherit" onClick={() => setCartOpen(true)}>
        <Badge color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.paper,
            minWidth: 240,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="close"
            sx={t => ({ color: t.palette.text.primary })}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map(({ key, label, onClick }) => (
            <ListItem key={key} disablePadding>
              <ListItemButton
                onClick={onClick}
                selected={active === key}
                sx={t => ({
                  fontFamily: 'Katibeh',
                  fontSize: '1.25rem',
                  textTransform: 'uppercase',
                  color: active === key ? t.palette.text.primary : t.palette.text.secondary,
                })}
              >
                {label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </HeaderContainer>
  );
};

export default Header;
