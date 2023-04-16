import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk('fetch/characters', async (search: string) => {
  const res = await fetch(`https://api.potterdb.com/v1/characters?filter[name_cont]=${search}`);

  if (res.ok) {
    const json = await res.json();
    return json.data;
  }

  throw Error(await res.text());
});
