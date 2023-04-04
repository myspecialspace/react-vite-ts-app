import { ControlValidator } from './types';

export const required: ControlValidator = (value) => {
  if (value === '' || value == null) {
    return 'Обязательное поле';
  }
};

export const minLength = (min: number): ControlValidator => {
  return (value) => {
    if (typeof value === 'string' && value.length < min) {
      return `Минимальная длина ${min} символов`;
    }
  };
};

export const date: ControlValidator = (value) => {
  if (typeof value === 'string' && value) {
    const dateValue = new Date(value);

    if (dateValue.getTime() > Date.now()) {
      return `Дата рождения должна быть в прошлом`;
    }
  }
};
