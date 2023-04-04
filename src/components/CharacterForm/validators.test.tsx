import { describe, it } from 'vitest';
import * as validators from './validators';

describe('validators', () => {
  it('required ""', () => {
    const result = validators.required('');
    expect(result).toEqual('Обязательное поле');
  });
  it('required "example"', () => {
    const result = validators.required('example');
    expect(result).toBeUndefined();
  });

  it('minLength 5 "example"', () => {
    const result = validators.minLength(5)('example');
    expect(result).toBeUndefined();
  });

  it('minLength 5 "hi"', () => {
    const result = validators.minLength(5)('hi');
    expect(result).toEqual('Минимальная длина 5 символов');
  });

  it('date past', () => {
    const result = validators.date('Sun Mar 26 2023 19:05:06 GMT+0300 (Москва, стандартное время)');
    expect(result).toBeUndefined();
  });

  it('date future', () => {
    const futureDate = new Date(Date.now() + 1000).toString();
    const result = validators.date(futureDate);
    expect(result).toEqual('Дата рождения должна быть в прошлом');
  });
});
