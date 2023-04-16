import { createSlice } from '@reduxjs/toolkit';
import { getLSValue, setLSValue } from '../../../helpers/browser';
import { ThemeListNode, THEME_VARIATIONS } from './theme.const';
import type { TThemeInitState, TThemeOptions } from './theme.type';

/* eslint-disable no-param-reassign */

// get user theme preference settings
const userThemePref =
  getLSValue('globalTheme') ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// find preset for user theme, default to first otherwise
let userThemePrefVariationIdx = THEME_VARIATIONS.findIndex(({ name }) => name === userThemePref);
userThemePrefVariationIdx = userThemePrefVariationIdx === -1 ? 0 : userThemePrefVariationIdx;

// initialize linked list, starting with preferenced theme
let themeNodeList: ThemeListNode = new ThemeListNode(THEME_VARIATIONS[userThemePrefVariationIdx]);
const startNode: ThemeListNode = themeNodeList;

// fill the list with leftover nodes
THEME_VARIATIONS.filter((_, idx) => idx !== userThemePrefVariationIdx).forEach((el) => {
  themeNodeList.next = new ThemeListNode(el);
  themeNodeList = themeNodeList.next;
});

// return to start and create cycle
themeNodeList.next = startNode;
themeNodeList = themeNodeList.next;

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    name: userThemePref,
    symbol: themeNodeList.value.symbol,
  } as TThemeInitState,
  reducers: {
    setTheme(state, action: { payload: { theme: TThemeOptions } }) {},
    switchTheme(state, action: { payload: undefined }) {
      if (!themeNodeList.next) return;
      themeNodeList = themeNodeList.next;

      const { name, symbol } = themeNodeList.value;
      setLSValue('globalTheme', name);
      state.name = name;
      state.symbol = symbol;
    },
  },
});

const theme = themeSlice.reducer;
const { setTheme, switchTheme } = themeSlice.actions;

export { theme, setTheme, switchTheme };
