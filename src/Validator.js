import StringSchema, { defaultValidators as string } from './StringSchema.js';
import NumberSchema, { defaultValidators as number } from './NumberSchema.js';
import ArraySchema, { defaultValidators as array } from './ArraySchema.js';
import ObjectSchema, { defaultValidators as object } from './ObjectSchema.js';

export default class Validator {
  constructor() {
    this.validatorsByTypes = {
      string,
      number,
      array,
      object,
    };
  }

  addValidator = (type, name, fn) => {
    if (!(type in this.validatorsByTypes)) {
      throw new Error(`Unsupported schema type: ${type}`);
    }

    this.validatorsByTypes[type][name] = fn;
  };

  string = () => new StringSchema(this.validatorsByTypes.string);

  number = () => new NumberSchema(this.validatorsByTypes.number);

  array = () => new ArraySchema(this.validatorsByTypes.array);

  object = () => new ObjectSchema(this.validatorsByTypes.object);
}
