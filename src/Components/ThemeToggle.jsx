import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { TodoContext } from '../App';

const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useContext(TodoContext);
  const isDark = themeMode === 'dark';

  const handleToggle = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton onClick={handleToggle} color="inherit">
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 