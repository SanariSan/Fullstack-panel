import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */

const notesSlice = createSlice({
  name: 'notes',
  initialState: {} as Record<string, string | undefined>,
  reducers: {
    noteAdd(state, action: { payload: { title: string; text: string } }) {
      state[action.payload.title] = action.payload.text;
    },
    noteRemove(state, action: { payload: { title: string } }) {
      state[action.payload.title] = undefined;
    },
  },
});

const notes = notesSlice.reducer;
const { noteAdd, noteRemove } = notesSlice.actions;

export { notes, noteAdd, noteRemove };
