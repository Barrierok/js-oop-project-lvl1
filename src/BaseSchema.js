export default class BaseSchema {
  constructor(validators) {
    this.requiredValue = false;
    this.validators = validators;
    this.checks = [];
  }

  test = (validatorName, ...args) => {
    const validate = this.validators[validatorName];

    if (validatorName === 'required') {
      this.requiredValue = true;
    }

    this.checks.push({ validate, args });

    return this;
  };

  isValid = (data) => {
    if (data === null && !this.requiredValue) {
      return true;
    }

    return this.checks.every(({ validate, args }) => validate(data, ...args));
  };
}
