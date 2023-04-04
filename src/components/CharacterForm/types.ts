import { Character } from '../../types/character';

export type FormValue = Partial<Character>;
export type FormControlValue = Character[FormControlName];

export type ControlValidator = (value: FormControlValue) => ControlValidatorError;
export type ControlValidatorError = string;

export type FormErrors = Record<FormControlName, ControlValidatorError[]>;

export type FormControlName = keyof Character;

export type FormObject = Array<{
  name: FormControlName;
  type: FormControlType;
  validators: ControlValidator[];
}>;

export enum FormControlType {
  TEXT = 'text',
  NUMBER = 'number',
  FILE = 'file',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  IMAGE = 'image',
}
