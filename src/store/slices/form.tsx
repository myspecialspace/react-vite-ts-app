import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormErrors, FormValue } from '../../components/CharacterForm/types';
import { fillDefault, getFormErrors } from '../../components/CharacterForm/utils';
import { Character } from '../../types/character';

export interface State {
  characters: Character[];
  errors: FormErrors;
  saved: boolean;
  formValue: FormValue;
}

export const getInitialState = (): State => ({
  characters: [],
  errors: {} as FormErrors,
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
    submit(state, { payload }: PayloadAction<FormValue>) {
      const formErrors = getFormErrors(payload);

      const hasOneError = Object.values(formErrors).some((formError) => formError.length > 0);

      if (hasOneError) {
        state.saved = false;
        state.formValue = payload;
        state.errors = formErrors;
      } else {
        const character = fillDefault(payload);
        state.characters = [...state.characters, character];
        state.saved = true;
        state.formValue = getInitialState().formValue;
        state.errors = getInitialState().errors;
      }
    },
  },
});

export const formActions = formSlice.actions;
