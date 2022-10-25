import type { FC } from 'react';
import classNames from 'classnames';
import s from './theme-controller.module.scss';

type TThemeController = {
  theme: string;
  onThemeChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  themeOptions: Array<{
    name: string;
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
  <div className={classNames(s.controllerWrap, 'themed')}>
    <button className={classNames('themed')} onClick={onVisibilityChange}>
      {'{O}'}
    </button>
    {isVisible && (
      <select value={theme} onChange={onThemeChange} className={s.select}>
        {themeOptions.map((option, idx) => (
          <option value={option.value} key={idx}>
            {option.name}
          </option>
        ))}
      </select>
    )}
  </div>
);

export { ThemeControllerComponent };
