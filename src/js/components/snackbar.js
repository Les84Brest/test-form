export const TYPE_ERROR = 'TYPE_ERROR';
export const TYPE_SUCCESS = 'TYPE_SUCCESS';

class Snackbar {
  snackbarNode = null;

  constructor(snackbarNode) {
    this.snackbarNode = snackbarNode;
    this.init();
  }

  init() {
    this.snackbarNode.addEventListener('click', () => {
      this.close();
    })
  }

  open(type, text) {
    this.snackbarNode.classList.add('visible');

    switch (type) {
      case TYPE_ERROR:
        this.snackbarNode.classList.add('error')
        break;
      case TYPE_SUCCESS:
        this.snackbarNode.classList.add('success')
        break;
    }

    this.snackbarNode.querySelector('.message__text').innerHTML = text;

    setTimeout(() => {
      this.close();
    }, 4000);
  }

  close() {
    this.snackbarNode.classList.remove('visible');
    this.snackbarNode.classList.remove('error');
    this.snackbarNode.classList.remove('success');
  }


}

export default Snackbar