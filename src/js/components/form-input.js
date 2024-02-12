import Validator from "../validation/validator";
import { formInputChangeEvent } from "../shared/form-events";

class FormInput {
  isError = false;
  isDirty = false;
  showValidationMsg = false;
  validationStatus = { isValid: false, errorText: '' };

  elementNode = null;
  errorTextNode = null;
  inputValidator = null;


  constructor(elementNode, validationRules) {
    this.elementNode = elementNode;
    this.inputValidator = new Validator(validationRules);

    this.elementNode.addEventListener('blur', (event) => {
      this.handleFormInputBlur(event);
    });

    this.elementNode.addEventListener('input', (event) => {
      this.handleFormInput(event)
    });

    this.errorTextNode = this.elementNode.parentNode.querySelector('.form-input__validation');
  }

  handleFormInputBlur(event){
    this.isDirty = true;
    this.validationStatus = this.inputValidator.validate(event.target.value);
    this.handleValidation();

    // Let's notify the form that something has changed in input
    this.elementNode.dispatchEvent(formInputChangeEvent);
  }

  handleFormInput(event){
    this.validationStatus = this.inputValidator.validate(event.target.value);

    if (this.isDirty) {
      this.handleValidation();
      // Let's notify the form that something has changed in input
      this.elementNode.dispatchEvent(formInputChangeEvent);
    }
  }

  getValidationStatus() {
    if (!this.isDirty) return false;
    return this.validationStatus.isValid;
  }

  handleValidation() {
    const { isValid, errorText } = this.validationStatus;
    if (isValid) {
      this.errorTextNode.classList.remove('invalid');
      return;
    } else {
      this.errorTextNode.classList.add('invalid');
      this.errorTextNode.innerText = errorText;
    }

  }

  resetInput() {
    this.elementNode.value = '';
    this.isDirty = false;
  }
}
export default FormInput