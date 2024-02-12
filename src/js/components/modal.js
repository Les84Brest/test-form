
class Modal {
  modalNode = null;

  constructor(modalNode) {
    this.modalNode = modalNode;
    this.initModal();
  }

  initModal() {
    if (this.modalNode) {
      this.modalNode.addEventListener('click', (event) => {
        if(!event.target.closest('.modal__body')){
          this.closeModal();
        }
      } );

      this.modalNode.querySelector('.modal__close')
        .addEventListener('click', this.closeModal.bind(this));
    }
  }

  openModal() {
    this.modalNode.classList.add('modal__open');
    this.lockBody();
  }

  closeModal() {
    this.modalNode.classList.remove('modal__open');
    this.unlockBody();
  }

  lockBody() {
    const scrollPadding = window.innerWidth - document.querySelector('.main').offsetWidth +'px';
    document.body.style.paddingRight = scrollPadding;
    document.body.classList.add('body-lock');
  }

  unlockBody(){
    document.body.style.paddingRight = '';
    document.body.classList.remove('body-lock');
  }
}

export default Modal;