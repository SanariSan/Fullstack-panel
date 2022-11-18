import type { FC } from 'react';
import classNames from 'classnames';
import style from './theme-controller.module.scss';

type TThemeController = {
  theme: string;
  onThemeChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  themeOptions: Array<{
    value: string;
  }>;
  isVisible: boolean;
  onVisibilityChange: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

const ThemeControllerComponent: FC<TThemeController> = ({
  theme,
  onThemeChange,
  themeOptions,
  isVisible,
  onVisibilityChange,
}) => (
  <div
    className={classNames(style.controllerWrap, style[theme])}
    style={{ transform: isVisible ? 'translateX(-10px)' : 'translateX(62px)' }}
  >
    <button className={classNames(style[theme], style.opener)} onClick={onVisibilityChange}>
      <span>{isVisible ? '>>' : '>>'}</span>
    </button>

    <select value={theme} onChange={onThemeChange} className={style.select}>
      {themeOptions.map((option, idx) => (
        <option value={option.value} key={idx}>
          {option.value}
        </option>
      ))}
    </select>
  </div>
);

export { ThemeControllerComponent };
