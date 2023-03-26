import { describe, it } from 'vitest';
import * as utils from './utils';

describe('utils', () => {
  it('getFormErrors has error', () => {
    const result = utils.getFormErrors({});
    expect(result).toEqual({
      name: ['Obligatory field'],
      dateOfBirth: ['Obligatory field'],
      species: ['Obligatory field'],
      house: ['Obligatory field'],
      gender: ['Obligatory field'],
      wizard: ['Obligatory field'],
      image: ['Obligatory field'],
    });
  });

  it('getFormErrors no error ', () => {
    const result = utils.getFormErrors({
      name: 'segsdgsdg',
      dateOfBirth: 'Thu Mar 02 2023 03:00:00 GMT+0300 (Москва, стандартное время)',
      species: 'werewolf',
      house: 'Gryffindor',
      gender: 'male',
      wizard: false,
      image: 'data:image/jpeg;base64,/9j/4A...',
    });

    expect(result).toEqual({});
  });
});
