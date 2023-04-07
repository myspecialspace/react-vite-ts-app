import { CharacterAttrs } from '../../types/character';

export type FormValue = Partial<CharacterAttrs>;
export type FormControlValue = CharacterAttrs[FormControlName];

export type ControlValidator = (value?: string) => ControlValidatorError;
export type ControlValidatorError = string | undefined;

export type FormErrors = Record<FormControlName, ControlValidatorError[]>;

export type FormControlName = keyof CharacterAttrs;

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
  RADIO = 'radio',
  DATE = 'date',
  IMAGE = 'image',
}
