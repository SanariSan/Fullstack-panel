import type { TRootState } from '../../redux.store.type';

const themeSelector = (state: TRootState) => state.theme.type;

export { themeSelector };
