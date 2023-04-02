import { Character } from '../types/character';

export enum HogwartsRole {
  STAFF = 'staff',
  STUDENT = 'student',
  OTHER = 'other',
}

export const getHogwartsRole = (character: Character): HogwartsRole => {
  if (character.hogwartsStaff) {
    return HogwartsRole.STAFF;
  }

  if (character.hogwartsStudent) {
    return HogwartsRole.STUDENT;
  }

  return HogwartsRole.OTHER;
};
