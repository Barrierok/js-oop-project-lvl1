import BaseSchema from './BaseSchema.js';

export default class NumberSchema extends BaseSchema {
  required() {
    return this.test('required');
  }

  positive() {
    return this.test('positive');
  }

  range(min, max) {
    return this.test('range', min, max);
  }
}

export const defaultValidators = {
  required: (data) => typeof data === 'number',
  positive: (data) => data > 0,
  range: (data, min, max) => data >= min && data <= max,
};
