import FormInput from './form-input';
import MaskedPhoneInput from './masked-phone-input';
import { TYPE_SUCCESS, TYPE_ERROR } from './snackbar';

class Form {
  formNode = null;
  snackbar = null;
  sendServise = null;
  isValid = false;
  isDirty = false;
  formElements = [];

  constructor(formNode, sendFormServise, snackbar) {
    this.formNode = formNode;
    this.sendServise = sendFormServise;
    this.snackbar = snackbar;
    this.init();
  }

  init() {
    const submitButton = this.formNode.formSubmit;
    submitButton.disabled = true;

    this.formElements.push(new FormInput(this.formNode.userName, { notEmpty: true, minWidth: 3 }));
    this.formElements.push(new FormInput(this.formNode.email, { isEmail: true, notEmpty: true }));
    this.formElements.push(new MaskedPhoneInput(this.formNode.phone, { notEmpty: true, isPhoneNumber: true }));
    this.formElements.push(new FormInput(this.formNode.message, { notEmpty: true }));

    this.formNode.addEventListener('formInputChange', () => {
      this.updateValidationStatus();
    });

    this.formNode.addEventListener('submit', (e) => {
      this.handleFormSubmit(e);
    })
  }

  updateValidationStatus() {
    let formIsValid = true;

    this.formElements.every(elem => {
      if (!elem.getValidationStatus()) {
        formIsValid = false;
        return false;
      }
      return true;
    })
    this.isValid = formIsValid;
    this.formNode.formSubmit.disabled = !formIsValid;
  }


  async handleFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData(this.formNode);

    if (this.isValid) {
      let response = await this.sendServise.sendFormData(formData);

      switch (response.status) {
        case 'error':
          this.handleServerError(response);
          break;
        case 'success':
          this.handleServerSuccess(response);
          break;
      }
    }

  }

  handleServerSuccess(response) {
    const { message } = response;
    this.snackbar.open(TYPE_SUCCESS, message);
    this.formNode.reset();
    this.formNode.formSubmit.disabled = true;
  }

  handleServerError(response){
    const {fields} = response;
    const messageText = Object.entries(fields).reduce((acc, cur) => {
      const [key, val] = cur;
      return acc += `${key} - ${val} <br/>`;
    }, '')

    this.snackbar.open(TYPE_ERROR, messageText);
    this.formNode.reset();
    this.formNode.formSubmit.disabled = true;
  }

}

export default Form;