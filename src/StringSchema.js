import BaseSchema from './BaseSchema.js';

export default class StringSchema extends BaseSchema {
  required() {
    return this.test('required');
  }

  minLength(number) {
    return this.test('minLength', number);
  }

  contains(string) {
    return this.test('contains', string);
  }
}

export const defaultValidators = {
  required: (data) => typeof data === 'string' && data !== '',
  minLength: (data, number) => data.length >= number,
  contains: (data, string) => data.includes(string),
};
