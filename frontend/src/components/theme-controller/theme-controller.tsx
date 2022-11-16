import type { FC } from 'react';
import classNames from 'classnames';
import s from './theme-controller.module.scss';

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
    className={classNames(s.controllerWrap, s[theme])}
    style={{ transform: isVisible ? 'translateX(-10px)' : 'translateX(62px)' }}
  >
    <button className={classNames(s[theme], s.opener)} onClick={onVisibilityChange}>
      <span>{isVisible ? '>>' : '>>'}</span>
    </button>

    <select value={theme} onChange={onThemeChange} className={s.select}>
      {themeOptions.map((option, idx) => (
        <option value={option.value} key={idx}>
          {option.value}
        </option>
      ))}
    </select>
  </div>
);

export { ThemeControllerComponent };
