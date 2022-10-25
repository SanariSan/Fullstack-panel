import { createSlice } from '@reduxjs/toolkit';
import { getLSValue } from '../../../helpers/browser';

/* eslint-disable no-param-reassign */

type TThemeOptions = 'light' | 'dark';
type TThemeInitState = { type: TThemeOptions };

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    type: getLSValue('globalTheme') ?? 'light',
  } as TThemeInitState,
  reducers: {
    setTheme(state, action: { payload: { theme: TThemeOptions } }) {
      state.type = action.payload.theme;
    },
  },
});

const theme = themeSlice.reducer;
const { setTheme } = themeSlice.actions;

export { theme, setTheme };
