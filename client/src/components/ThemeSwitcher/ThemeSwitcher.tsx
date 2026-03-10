import React from 'react';
// import { SwitchButton } from './style';
import theme, { ThemeModeContext } from '../../../theme/theme';
import { Button } from '@mui/material';

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = React.useContext(ThemeModeContext);

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
        fontSize: '20px'
      }}
      onClick={toggleTheme}
    >
      {mode === 'light' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeSwitcher;
