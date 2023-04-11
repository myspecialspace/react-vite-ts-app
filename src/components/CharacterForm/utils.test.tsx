import { describe, it } from 'vitest';
import * as utils from './utils';

describe('utils', () => {
  it('getFormErrors has error', () => {
    const result = utils.getFormErrors({});
    expect(result).toEqual({
      name: ['Required field'],
      born: ['Required field'],
      species: ['Required field'],
      house: ['Required field'],
      gender: ['Required field'],
      animagus: ['Required field'],
      image: ['Required field'],
    });
  });

  it('getFormErrors no error ', () => {
    const result = utils.getFormErrors({
      name: 'segsdgsdg',
      born: 'Thu Mar 02 2023 03:00:00 GMT+0300 (Москва, стандартное время)',
      species: 'werewolf',
      house: 'Gryffindor',
      gender: 'male',
      animagus: 'Gerbil',
      image: 'data:image/jpeg;base64,/9j/4A...',
    });

    expect(result).toEqual({});
  });
});
