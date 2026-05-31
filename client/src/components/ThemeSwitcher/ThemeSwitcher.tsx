import React from 'react';
// import { SwitchButton } from './style';
import theme, { ThemeModeContext } from '../../../theme/theme';
import { Button } from '@mui/material';
import { buttonStyles, flagStyles } from './style';

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = React.useContext(ThemeModeContext);

  return (
   <button style={buttonStyles} onClick={toggleTheme}>
         <img
           src={mode === 'light' ? '/images/theme/light.png' : '/images/theme/dark.png'}
           alt={mode === 'light' ? 'Dark' : 'Light'}
           style={flagStyles}
         />
       </button>
  );
};

export default ThemeSwitcher;
