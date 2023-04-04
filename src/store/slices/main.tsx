import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../thunks/main';
import { Status } from '../../types/status';
import { Character } from '../../types/character';

export interface State {
  characters: Character[];
  search: string;
  status: Status;
  error: string;
}

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    characters: [],
    search: '',
    status: Status.INITIAL,
    error: '',
  } as State,
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.status = Status.PENDING;
      state.error = '';
    });
    builder.addCase(fetchCharacters.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCESS;
      state.error = '';
      state.characters = payload;
    });
    builder.addCase(fetchCharacters.rejected, (state, { payload }) => {
      state.status = Status.ERROR;
      state.error = payload as string;
    });
  },
});

export const mainActions = mainSlice.actions;
