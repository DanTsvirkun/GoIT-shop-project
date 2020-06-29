////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.5//////////////////////////////
////////////////////////////////////////////////////////////

class ModalLogic {
  constructor({
    modalid,
    crossid,
    openid,
    markup
  }) {
    this.modal = document.querySelector(modalid); // Find your modal window
    this.close = document.querySelector(crossid); // Find your close element (cross - "x")
    this.btn = document.querySelector(openid); // Find your open button
    this.markup = markup; // Your markup string
    this.modalEventListeners();
  }
  modalEventListeners() {
    this.btn.addEventListener('click', this.createMarkup);
    this.close.addEventListener('click', this.closeModalWithCross);
    window.addEventListener('click', closeModalWithArea);
    window.addEventListener('keydown', closeModalWithEsc);
  }
  createMarkup() {
    this.modal.innerHTML = this.markup;
  }
  closeModal() {
    this.modal.innerHTML = '';
    this.close.removeEventListener('click', closeModalWithCross);
    window.removeEventListener('click', closeModalWithArea);
    window.removeEventListener('keydown', closeModalWithEsc);
  }
  // Close modal window with click on the cross - "x"
  closeModalWithCross() {
    this.closeModal();
  }
  // Close modal window with click on the grey area
  closeModalWithArea(e) {
    if (e.target !== this.modal) {
      this.closeModal();
    }
  }
  // Close modal window with "Escape-button"
  closeModalWithEsc(e) {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  }
}

/////////////////////////////////////////////////////////////////////////////
/// Для того, чтобы скрипт сработал, нужно:                               ///
///1. подставить названия ваших айдишников (id), (если их нет, то создать)///
///2. функции импортировать в свой ".js-файл"                             ///
///3. найти свой id, через который вы будете открывать модалку            ///
///Создание элемента крестик ("cross"):                                   ///
///<span id="cross">&times;</span>                                        ///
///На всякий случай... Всем вдохновния при разработке! ;-)                ///
/////////////////////////////////////////////////////////////////////////////
