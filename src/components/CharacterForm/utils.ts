import { Character, CharacterAttrs } from '../../types/character';

export const getBase64Image = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

const DEFAULT_CHARACTER_ATTR: CharacterAttrs = {
  slug: '',
  name: '',
  born: '',
  died: '',
  gender: '',
  species: '',
  height: '',
  weight: '',
  hair_color: '',
  eye_color: '',
  skin_color: '',
  blood_status: '',
  marital_status: '',
  nationality: '',
  animagus: '',
  boggart: '',
  house: '',
  patronus: '',
  alias_names: [],
  family_members: [],
  jobs: [],
  romances: [],
  titles: [],
  wands: [],
  image: '',
  wiki: '',
};

export const fillDefault = (formValue: Partial<CharacterAttrs>): Character => {
  return {
    id: `id-${Date.now()}`,
    type: 'character',
    attributes: {
      ...DEFAULT_CHARACTER_ATTR,
      ...formValue,
    },
  };
};

export const SPECIES_OPTIONS: string[] = [
  'human',
  'werewolf',
  'ghost',
  'dragon',
  'centaur',
  'goblin',
  'house-elf',
  'hippogriff',
  'half-giant',
  'giant',
  'vampire',
];

export const HOUSE_OPTIONS: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
