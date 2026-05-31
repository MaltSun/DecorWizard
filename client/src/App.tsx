import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme, { ThemeModeContext, ThemeMode } from '../theme/theme';
import Router from './router';
import './locales/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { cartStore } from './store/cartSlice';

function App() {
  const [mode, setMode] = React.useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('themeMode');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'light';
  });

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleTheme: () => {
        setMode(prev => {
          const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('themeMode', next);
          }
          return next;
        });
      },
    }),
    [mode],
  );

  const muiTheme = React.useMemo(
    () =>
      createTheme(theme, {
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
              background: {
                default: '#121212',
                paper: '#1e1e1e',
              },
              text: {
                primary: '#FDF7F5',
                secondary: '#FFD0B0',
                disabled: '#9e9e9e',
              },
            }
            : {}),
        },
      }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Router />
            <ToastContainer />
          </BrowserRouter>
        </I18nextProvider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
