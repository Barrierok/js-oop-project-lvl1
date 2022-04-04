import StringSchema, { defaultValidators as string } from './StringSchema';
import NumberSchema, { defaultValidators as number } from './NumberSchema';
import ArraySchema, { defaultValidators as array } from './ArraySchema';
import ObjectSchema, { defaultValidators as object } from './ObjectSchema';

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
