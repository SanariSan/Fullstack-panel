import { createSlice } from '@reduxjs/toolkit';
import { getLSValue, setLSValue } from '../../../helpers/browser';

/* eslint-disable no-param-reassign */

type TThemeOptions = 'light' | 'dark';
type TThemeInitState = { type: TThemeOptions };

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    type:
      getLSValue('globalTheme') ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  } as TThemeInitState,
  reducers: {
    setTheme(state, action: { payload: { theme: TThemeOptions } }) {
      const { theme } = action.payload;
      setLSValue('globalTheme', theme);
      state.type = theme;
    },
  },
});

const theme = themeSlice.reducer;
const { setTheme } = themeSlice.actions;

export { theme, setTheme };
