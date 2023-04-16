import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './slices/form';
import { mainSlice } from './slices/main';
import { characterModalSlice } from './slices/character-modal';

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    form: formSlice.reducer,
    characterModal: characterModalSlice.reducer,
  },
});

export type AppState = ReturnType<(typeof store)['getState']>;
export const useAppDispatch = () => store.dispatch as (typeof store)['dispatch'];
