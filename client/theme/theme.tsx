import React from 'react';
import { createTheme, alpha } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';

export const ThemeModeContext = React.createContext<{
  mode: ThemeMode;
  toggleTheme: () => void;
}>({
  mode: 'light',
  toggleTheme: () => { },
});

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap');
`;

if (typeof window !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = fontStyles;
  document.head.appendChild(styleElement);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#80011F',
      light: '#f7e7ce',
      dark: '#5C2A2A',
    },
    background: {
      default: '#f7e7ce46',
      paper: '#f7e7ce',
    },
    text: {
      primary: '#80011F',
      secondary: '#5C2A2A',
      disabled: '#A88A7E',
    },
  },

  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',

    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '3.6rem',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      color: '#80011F',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2.6rem',
      fontWeight: 600,
      color: '#80011F',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2.1rem',
      fontWeight: 500,
      color: '#80011F',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#80011F',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.65,
      color: '#5C2A2A',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#5C2A2A',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '0.8px',
    },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 25,
          padding: '12px 32px',
          minWidth: 200,
          height: 48,
          fontSize: '15px',
          ...(ownerState.variant === 'contained' && {
            backgroundColor: '#A88A7E',
            color: '#fff',
            '&:hover': { backgroundColor: '#5C2A2A' },
          }),
        }),
      },
    },
  },
});

export default theme;