import { ControlValidator } from './types';

export const required: ControlValidator = (value) => {
  if (value === '' || value == null) {
    return 'Obligatory field';
  }

  return ``;
};

export const minLength = (min: number): ControlValidator => {
  return (value) => {
    if (typeof value === 'string' && value.length < min) {
      return `Minimum length ${min} symbols`;
    }

    return ``;
  };
};

export const date: ControlValidator = (value) => {
  if (typeof value === 'string' && value) {
    const dateValue = new Date(value);

    if (dateValue.getTime() > Date.now()) {
      return `Date of birth must be in the past`;
    }
  }

  return ``;
};
