import { Character, CharacterAttrs } from '../../types/character';
import formObj from './form';
import {
  FormControlValue,
  FormControlType,
  FormErrors,
  ControlValidatorError,
  FormValue,
} from './types';

export const getBase64Image = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const getFormValue = async (form: HTMLFormElement): Promise<FormValue> => {
  const formControls = form!.elements;

  const acc: FormValue = {};

  for (let i = 0; i < formObj.length; i += 1) {
    const control = formObj[i];
    const controlElement = formControls.namedItem(control.name)!;

    let value: FormControlValue;

    switch (control.type) {
      case FormControlType.TEXT:
      case FormControlType.RADIO:
        value = (controlElement as HTMLInputElement).value;
        break;

      case FormControlType.DATE:
        value = (controlElement as HTMLInputElement).value;
        break;

      case FormControlType.SELECT:
        value = (controlElement as HTMLSelectElement).value;
        break;

      case FormControlType.IMAGE: {
        const file = (controlElement as HTMLInputElement).files?.[0];
        value = file ? await getBase64Image(file) : '';
        break;
      }

      default:
        throw Error(`Uknown control type "${control.type}".`);
    }

    (acc[control.name] as FormControlValue) = value;
  }

  return acc;
};

export const getFormErrors = (formValue: Partial<CharacterAttrs>): FormErrors => {
  return formObj.reduce((acc, control) => {
    const value = formValue[control.name];

    const errors: ControlValidatorError[] = [];

    control.validators.forEach((fn) => {
      const result = fn(value!);
      if (result) {
        errors.push(result);
      }
    });

    if (errors.length > 0) {
      acc[control.name] = errors;
    }

    return acc;
  }, {} as FormErrors);
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
