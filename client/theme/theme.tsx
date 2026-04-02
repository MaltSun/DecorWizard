import React from 'react';
import { createTheme, alpha } from '@mui/material/styles';
import { backup } from 'node:sqlite';

const fontStyles = `
/* Irish Grover */
@font-face {
  font-family: 'Irish Grover';
  src: url('../../public/fonts/IrishGrover/irishgrover-regular.woff2') format('woff2'),
       url('../../public/fonts/IrishGrover/irishgrover-regular.woff') format('woff'),
       url('../../public/fonts/IrishGrover/IrishGrover-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
 
/* Margot */
@font-face {
  font-family: 'Margot';
       url('../../public/fonts/Margot/ofont_MargotXtrafette.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
 

/* Katibeh */
@font-face {
  font-family: 'Katibeh';
  src: url('../../public/fonts/Katibeh/katibeh-regular.woff2') format('woff2'),
       url('../../public/fonts/Katibeh/katibeh-regular.woff') format('woff'),
       url('../../public/fonts/Katibeh/Katibeh-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

export type ThemeMode = 'light' | 'dark';

export const ThemeModeContext = React.createContext<{
  mode: ThemeMode;
  toggleTheme: () => void;
}>({
  mode: 'light',
  toggleTheme: () => {},
});

if (typeof window !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = fontStyles;
  document.head.appendChild(styleElement);
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FD8E53',
      light: '#FD8E53',
      dark: 'rgb(79, 45, 16)',
    },
    background: {
      default: '#FDF7F5',
      paper: '#F6D8C8',
    },
    error: { main: 'rgba(168, 0, 0, 1)' },
    text: {
      primary: '#FD8F53',
      secondary: '#FF7B6A',
      disabled: '#fcbf9eef',
    },
  },
  typography: {
    fontFamily: ['Katibeh', 'Margot', 'Irish Grover'].join(','),
    h1: {
      fontSize: '3.5rem',
      textTransform: 'uppercase',
      fontWeight: 300,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      textTransform: 'capitalize',
      color: '#FF7B6A',
      textAlign: 'center',
    },
    h3: { fontSize: '2.25rem', fontWeight: 500, textTransform: 'capitalize' },
    h4: { fontSize: '25rem', fontWeight: 500, textTransform: 'capitalize' },
    h5: { fontSize: '1.75rem', fontWeight: 300, textTransform: 'capitalize' },
    h6: { fontSize: '1.5rem', fontWeight: 100, textTransform: 'capitalize' },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
      textTransform: 'capitalize',
      fontWeight: 100,
      color: '#FD8F53',
      fontFamily: 'Roboto',
    },
    body2: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
      textTransform: 'lowercase',
      fontWeight: 100,
      color: '#FD8F53',
      fontFamily: 'Roboto',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '15px',
      letterSpacing: '1px',
    },
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 25,
          padding: '8px 16px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          minWidth: '200px',
          height: '45px',
          fontSize: '15px',
          letterSpacing: '1px',
          border: 'none',
          gap: theme.spacing(3),
          transition: 'background 0.4s ease',
          '&:hover': {
            ...(ownerState.variant === 'contained' && {
              background: theme.palette.text.disabled,
            }),
          },
          ...(ownerState.variant === 'contained' && {
            background: theme.palette.text.disabled,
            color: theme.palette.common.white,
            '&:hover': { background: alpha(theme.palette.text.secondary, 0.39) },
          }),
          ...(ownerState.variant === 'outlined' && {
            background: 'transparent',
            color: theme.palette.text.disabled,
            border: `1px solid ${theme.palette.text.disabled}`,
            '&:hover': {
              background: theme.palette.action.hover,
              transition: '0.6s ease',
              cursor: 'pointer',
              border: `1px solid ${theme.palette.text.primary}`,
            },
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            background: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.text.primary}`,
            transition: 'background 0.4s ease, border 0.4s ease',

            '&:hover': {
              background: theme.palette.action.selected,
            },

            '&.Mui-focused': {
              border: `2px solid ${theme.palette.text.secondary}`,
              color: theme.palette.text.primary,
            },

            '&.Mui-disabled': {
              background: theme.palette.action.disabledBackground,
              border: `1px solid ${theme.palette.text.disabled}`,
              color: theme.palette.text.disabled,
              cursor: 'not-allowed',
              '& .MuiOutlinedInput-input': {
                color: theme.palette.text.disabled,
              },
            },

            '& .MuiOutlinedInput-input': {
              padding: '10px',
              color: 'inherit',
            },
          },

          '& .MuiInputLabel-root': {
            color: theme.palette.text.disabled,
            '&.Mui-focused': {
              color: theme.palette.text.primary,
              background: theme.palette.background,
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled,
            },
          },

          '& input::placeholder': {
            color: theme.palette.text.disabled,
            opacity: 1,
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          opacity: 1,
          '&.authForm': {
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
            },
          },
        }),
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          '& .MuiButton-root': {
            width: '200px',
            border: 'none',
            background: 'transparent',
            fontSize: '18px',
            textTransform: 'uppercase',
            padding: '15px 0px',
            color: theme.palette.text.primary,
            '&.active': {
              color: theme.palette.text.secondary,
              borderBottom: `2px solid ${theme.palette.text.secondary}`,
            },
            '&:hover': {
              background: '#ff7b6a63',
              color: 'white',
              transition: '0.4s ease',
              cursor: 'pointer',
            },
            '&:active': {
              background: 'rgba(91, 91, 91, 0.144)',
              transition: '0.4s ease',
            },
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: '220px',
          border: 'none',
          fontSize: '18px',
          padding: '15px 10px 15px 20px',
          borderTopRightRadius: 35,
          borderBottomRightRadius: 35,
          textTransform: 'capitalize',
          '&:hover': {
            background: 'rgba(44, 43, 43, 0.45)',
            transition: '0.4s ease',
            cursor: 'pointer',
          },
          '&.Mui-selected': {
            '&.active': {
              color: '#ffffff',
              background: theme.palette.primary.dark,
              '&:hover': {
                background: '#fd8e53be',
                transition: '0.4s ease',
                cursor: 'pointer',
              }
            },
          },
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.primary.main,
          color: theme.palette.text.disabled,
          width: '140px',
          height: '140px',
        }),
      },
    },
    // MuiListItemButton: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       color: theme.palette.text.disabled,
    //       background: 'transparent',
    //       '&.active': {
    //         color: theme.palette.text.primary,
    //         background: theme.palette.primary.main,
    //       },
    //     }),
    //   },
    // },
  },
});

export const globalStyles = {
  ':root': {
    '--active-color': 'rgba(168, 0, 0, 1)',
    '--def-text-color': '#fff',
  },
};

export default theme;
