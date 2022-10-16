type TObjectG<T> = { [key: string]: T };
type TObjectString = TObjectG<string>;
type TObjectNumber = TObjectG<number>;
type TObjectBoolean = TObjectG<boolean>;
type TObjectUnknown = TObjectG<unknown>;
type TObjectAny = TObjectG<any>;

enum ELOG_LEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

// deep modify if needed https://stackoverflow.com/a/65561287
// /\ not working as expected, missing old object (TA) types, they become unknown, fixed version below
// however still smth to notice, mapping modifiers (?:) from old object not overriden in new, even with Required<NonNullable<target>>
type TDeepPartialAny<T> = {
  [K in keyof T]?: T[K] extends TObjectAny ? TDeepPartialAny<T[K]> : any;
};
type TModifyDeep<TA extends TObjectAny, TB extends TDeepPartialAny<TA>> = {
  [K in keyof TA]: K extends keyof TB
    ? TB[K] extends TObjectAny
      ? TModifyDeep<TA[K], TB[K]>
      : Required<TB[K]>
    : TA[K];
} & Omit<TB, keyof TA>;

export type { TObjectG, TObjectString, TObjectNumber, TObjectBoolean, TObjectUnknown, TObjectAny };
export { ELOG_LEVEL };
