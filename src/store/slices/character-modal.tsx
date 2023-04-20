import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/character';

export interface State {
  character: Character | null;
}

export const getInitialState = (): State => ({
  character: null,
});

export const characterModalSlice = createSlice({
  name: 'character-modal',
  initialState: getInitialState(),
  reducers: {
    set(state, { payload }: PayloadAction<Character>) {
      state.character = payload;
    },
    reset(state) {
      state.character = null;
    },
  },
});

export const characterModalActions = characterModalSlice.actions;
