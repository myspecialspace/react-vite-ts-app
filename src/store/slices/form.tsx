import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValue } from '../../components/CharacterForm/types';
import { fillDefault } from '../../components/CharacterForm/utils';
import { Character } from '../../types/character';

export interface State {
  characters: Character[];
  saved: boolean;
  formValue: FormValue;
}

export const getInitialState = (): State => ({
  characters: [],
  formValue: {},
  saved: false,
});

export const formSlice = createSlice({
  name: 'form',
  initialState: getInitialState(),
  reducers: {
    setSaved(state, { payload }: PayloadAction<boolean>) {
      state.saved = payload;
    },
    setValue(state, { payload }: PayloadAction<FormValue>) {
      state.formValue = payload;
    },
    submit(state) {
      const character = fillDefault(state.formValue);
      state.characters = [...state.characters, character];
      state.saved = true;
      state.formValue = getInitialState().formValue;
    },
  },
});

export const formActions = formSlice.actions;
