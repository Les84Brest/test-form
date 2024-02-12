import FormInput from "./form-input";
import IMask from 'imask';
import { formInputChangeEvent } from "../shared/form-events";

class MaskedPhoneInput extends FormInput {
  constructor(elementNode, validationRules) {
    super(elementNode, validationRules);

    const maskOptions = {
      mask: '+{375}(00)000-00-00'
    };

    this.phoneMaskedInput = new IMask(elementNode, maskOptions);
  }

  phoneValidation() {
    return this.phoneMaskedInput.masked.isComplete ? true : false;
  }

  handleFormInputBlur(event) {
    this.isDirty = true;
    this.validationStatus = this.phoneValidation()
      ? { isValid: true, errorText: '' }
      : { isValid: false, errorText: 'Wrong phone number' };

    this.handleValidation();
    this.elementNode.dispatchEvent(formInputChangeEvent);
  }

  handleFormInput(event) {
    if (this.isDirty) {
      this.validationStatus = this.phoneValidation()
        ? { isValid: true, errorText: '' }
        : { isValid: false, errorText: 'Wrong phone number' }

      this.handleValidation();
      this.elementNode.dispatchEvent(formInputChangeEvent);
    }
  }


}

export default MaskedPhoneInput