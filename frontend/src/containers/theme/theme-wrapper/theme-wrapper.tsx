import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLSValue } from '../../../helpers/browser';
import { themeSelector } from '../../../store';

const ThemeWrapperContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useSelector(themeSelector);

  useEffect(() => {
    setLSValue('globalTheme', theme);
  }, [theme]);

  return (
    <div className={`theme--${theme}`} style={{ width: '100vw', height: '100vh' }}>
      {children}
    </div>
  );
};

export { ThemeWrapperContainer };
