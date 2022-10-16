import type { TObjectG } from '../../../../general.type';

interface IWidgetMain {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: (logsObj: Readonly<TObjectG<string[]>>) => void;
}

export type { IWidgetMain };
