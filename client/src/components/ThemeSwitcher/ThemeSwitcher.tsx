import React from 'react';
import { SwitchButton } from './type';
import { ThemeModeContext } from '../../../theme/theme';

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = React.useContext(ThemeModeContext);

  return (
    <SwitchButton onClick={toggleTheme}>
      {mode === 'light' ? 'Light' : 'Dark'}
    </SwitchButton>
  );
};

export default ThemeSwitcher;
