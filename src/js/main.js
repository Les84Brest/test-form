import '../scss/main.scss';
import '../index.html'
import Modal from './components/modal';
import Snackbar, { TYPE_SUCCESS } from './components/snackbar';
import Form from './components/form';
import SendFeedback from './api/send-feedback';

document.addEventListener('DOMContentLoaded', function(){
  const formNode = document.forms.feedback_form;
  const openModalBtn = document.querySelector('.btn.btn-show');
  const modalNode = document.querySelector('.modal');
  const snackbarNode = document.querySelector('.message');
  const sendFormServise = new SendFeedback();

  const snackbar = new Snackbar(snackbarNode);
  const modalPopup = new Modal(modalNode);
  const feedbackForm = new Form(formNode, sendFormServise, snackbar);

  openModalBtn.addEventListener('click', () => {
    modalPopup.openModal();
  })

})

