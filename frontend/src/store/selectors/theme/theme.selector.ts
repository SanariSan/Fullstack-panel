import type { TRootState } from '../../redux.store.type';

const themeSelector = (state: TRootState) => state.theme.name;
const themeSymbolSelector = (state: TRootState) => state.theme.symbol;

export { themeSelector, themeSymbolSelector };
