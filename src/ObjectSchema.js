import BaseSchema from './BaseSchema';

export default class ObjectSchema extends BaseSchema {
  shape(validationObject) {
    return this.test('shape', validationObject);
  }
}

export const defaultValidators = {
  shape: (data, validationObject) => Object
    .entries(data)
    .every(([key, value]) => validationObject[key].isValid(value)),
};
