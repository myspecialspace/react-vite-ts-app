import { FormObject, FormControlType } from './types';
import * as validators from './validators';

const formObj: FormObject = [
  {
    name: 'name',
    type: FormControlType.TEXT,
    validators: [validators.required, validators.minLength(5)],
  },
  {
    name: 'born',
    type: FormControlType.DATE,
    validators: [validators.required, validators.date],
  },
  {
    name: 'species',
    type: FormControlType.SELECT,
    validators: [validators.required],
  },
  {
    name: 'house',
    type: FormControlType.SELECT,
    validators: [validators.required],
  },
  {
    name: 'gender',
    type: FormControlType.RADIO,
    validators: [validators.required],
  },
  {
    name: 'animagus',
    type: FormControlType.TEXT,
    validators: [validators.required],
  },
  {
    name: 'image',
    type: FormControlType.IMAGE,
    validators: [validators.required],
  },
];

export default formObj;
