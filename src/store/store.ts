import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './slices/form';
import { mainSlice } from './slices/main';
import { characterModalSlice } from './slices/character-modal';

export const createStore = (preloadedState?: object) =>
  configureStore({
    reducer: {
      main: mainSlice.reducer,
      form: formSlice.reducer,
      characterModal: characterModalSlice.reducer,
    },
    preloadedState,
  });
