import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../theme/theme';
import Router from './router';
import './locales/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { GlobalStyles } from '@mui/material';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        {/* <GlobalStyles styles={globalStyles} /> */}
        <BrowserRouter>
          <Router />
          <ToastContainer />
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
