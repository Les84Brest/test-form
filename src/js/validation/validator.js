class Validator {
  constructor(validationRules) {
    this.validationRules = validationRules;
  }

  validate(value) {
    let isValid = true;
    const errors = [];

    for (const validation in this.validationRules) {
      switch (validation) {
        case 'notEmpty':
          if (!value.length) {
            isValid = false;
            errors.push('Field is empty')
          }
          break;
        case 'minWidth':
          const minThreshold = this.validationRules[validation];
          if (value.length < minThreshold) {
            isValid = false;
            errors.push(`Value must be larger than ${minThreshold}`)
          }
          break;
        case 'isEmail':
          const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
          if (!emailRegExp.test(value)) {
            isValid = false;
            errors.push(`Wrong email value`);
          }
          break;

      }
    }

    return { isValid, errorText: errors.join(', ') };
  }
}

export default Validator