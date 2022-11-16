import type { FC } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeControllerComponent } from '../../components/theme-controller';
import { useAppDispatch } from '../../hooks/redux';
import { setTheme, themeSelector } from '../../store';

type TThemeOptions = ReturnType<typeof themeSelector>;

const themeOptions: Array<Record<'value', TThemeOptions>> = [
  {
    value: 'light',
  },
  { value: 'dark' },
];

const ThemeControllerContainer: FC = () => {
  const theme = useSelector(themeSelector);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme({ theme: evt.currentTarget.value as TThemeOptions }));
  };

  const onVisibilityChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisible((_) => !_);
  };

  return (
    <ThemeControllerComponent
      theme={theme}
      onThemeChange={onThemeChange}
      themeOptions={themeOptions}
      isVisible={isVisible}
      onVisibilityChange={onVisibilityChange}
    />
  );
};

export { ThemeControllerContainer };
