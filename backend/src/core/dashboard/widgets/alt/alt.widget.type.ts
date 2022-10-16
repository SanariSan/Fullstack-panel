import type { TObjectG } from '../../../../general.type';

interface IWidgetAlt {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: (logsObj: Readonly<TObjectG<string[]>>) => void;
}

export type { IWidgetAlt };
