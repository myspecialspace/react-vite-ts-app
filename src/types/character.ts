import { Nullable } from './nullable';

export interface Character {
  id: string;
  type: string;
  attributes: Nullable<CharacterAttrs>;
}

export interface CharacterAttrs {
  slug: string;
  name: string;
  born: string;
  died: string;
  gender: string;
  species: string;
  height: string;
  weight: string;
  hair_color: string;
  eye_color: string;
  skin_color: string;
  blood_status: string;
  marital_status: string;
  nationality: string;
  animagus: string;
  boggart: string;
  house: string;
  patronus: string;
  alias_names: string[];
  family_members: string[];
  jobs: string[];
  romances: string[];
  titles: string[];
  wands: string[];
  image: string;
  wiki: string;
}
