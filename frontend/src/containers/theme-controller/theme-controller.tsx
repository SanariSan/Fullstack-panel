import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { ThemeControllerComponent } from '../../components/theme-controller';
import { useAppDispatch } from '../../hooks/redux';
import { switchTheme, themeSelector, themeSymbolSelector } from '../../store';

const ThemeControllerContainer: FC = () => {
  const theme = useSelector(themeSelector);
  const symbol = useSelector(themeSymbolSelector);
  const dispatch = useAppDispatch();

  const onThemeChange = () => {
    dispatch(switchTheme());
  };

  return (
    <ThemeControllerComponent theme={theme} onThemeChange={onThemeChange} themeOption={symbol} />
  );
};

export { ThemeControllerContainer };
