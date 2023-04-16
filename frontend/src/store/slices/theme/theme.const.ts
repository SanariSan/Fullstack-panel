import type { TThemeInitState, TThemeOptions } from './theme.type';

class ThemeListNode {
  public value: {
    name: TThemeOptions;
    symbol: string;
  };

  public next: ThemeListNode | undefined;

  constructor(value: { name: TThemeOptions; symbol: string }) {
    this.value = value;
    this.next = undefined;
  }
}

const THEME_VARIATIONS: TThemeInitState[] = [
  {
    name: 'dark',
    symbol: '☀',
  },
  {
    name: 'light',
    symbol: '☽',
  },
];

export { ThemeListNode, THEME_VARIATIONS };
