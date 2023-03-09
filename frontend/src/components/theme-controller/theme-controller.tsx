import type { FC } from 'react';
import classNames from 'classnames';
import style from './theme-controller.module.scss';

type TThemeController = {
  theme: string;
  onThemeChange: () => void;
  themeOption: string;
};

const ThemeControllerComponent: FC<TThemeController> = ({ theme, onThemeChange, themeOption }) => (
  <div className={classNames(style.controllerWrap, style[theme])}>
    <span className={style.symbol} onClick={onThemeChange}>
      {themeOption}
    </span>
  </div>
);

export { ThemeControllerComponent };
