import { Character } from '../../types/character';
import formObj from './form';
import { FormControlValue, FormControlType, FormErrors, ControlValidatorError } from './types';

export const getBase64Image = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const getFormValue = async (form: HTMLFormElement): Promise<Partial<Character>> => {
  const formControls = form!.elements;

  const acc: Partial<Character> = {};

  for (let i = 0; i < formObj.length; i += 1) {
    const control = formObj[i];
    const controlElement = formControls.namedItem(control.name)!;

    let value: FormControlValue;

    switch (control.type) {
      case FormControlType.TEXT:
      case FormControlType.RADIO:
        value = (controlElement as HTMLInputElement).value;
        break;

      case FormControlType.CHECKBOX:
        value = (controlElement as HTMLInputElement).checked;
        break;

      case FormControlType.DATE:
        value = (controlElement as HTMLInputElement).valueAsDate?.toString() || '';
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

export const getFormErrors = (formValue: Partial<Character>): FormErrors => {
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

const DEFAULT_CHARACTER: Character = {
  id: '',
  name: '',
  alternate_names: [],
  species: '',
  gender: '',
  house: '',
  dateOfBirth: '',
  yearOfBirth: 1985,
  wizard: false,
  ancestry: '',
  eyeColour: '',
  hairColour: '',
  wand: {
    core: '',
    length: null,
    wood: '',
  },
  patronus: '',
  hogwartsStudent: false,
  hogwartsStaff: false,
  actor: '',
  alternate_actors: [],
  alive: true,
  image: '',
};

export const fillDefault = (formValue: Partial<Character>): Character => {
  return {
    ...DEFAULT_CHARACTER,
    ...formValue,
    id: `id-${Date.now()}`,
    dateOfBirth: new Date(formValue.dateOfBirth!).toLocaleDateString(),
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
