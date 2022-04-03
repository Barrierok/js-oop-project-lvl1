import BaseSchema from './BaseSchema.js';

export default class ArraySchema extends BaseSchema {
  required() {
    return this.test('required');
  }

  sizeof(size) {
    return this.test('sizeof', size);
  }
}

export const defaultValidators = {
  required: (data) => Array.isArray(data),
  sizeof: (data, size) => data.length === size,
};
