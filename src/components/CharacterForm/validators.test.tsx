import { describe, it } from 'vitest';
import * as validators from './validators';

describe('validators', () => {
  it('required ""', () => {
    const result = validators.required('');
    expect(result).toEqual('Required field');
  });

  it('minLength 5 "hi"', () => {
    const result = validators.minLength(5)('hi');
    expect(result).toEqual('Minimum length 5 symbols');
  });

  it('date future', () => {
    const futureDate = new Date(Date.now() + 1000).toString();
    const result = validators.date(futureDate);
    expect(result).toEqual('Date of birth must be in the past');
  });
});
