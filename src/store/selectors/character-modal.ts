import { createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../index';

export const self = (state: AppState) => state.characterModal;
export const character = createSelector(self, (state) => state.character);
