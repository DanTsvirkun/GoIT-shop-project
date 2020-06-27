////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.4//////////////////////////////
////////////////////////////////////////////////////////////

//const btn = document.querySelector('#myBtn'); // You must find your button-id
//btn.addEventListener('click', showModal); // Added on the your button listener
const modal = document.querySelector('#myModal'); // Find your modal window-id (wrapper)
const close = document.querySelector('#cross'); // Find your close element (cross - "x")

// Open modal window
export default function showModal() {
  close.addEventListener('click', closeModalWithCross);
  window.addEventListener('click', closeModalWithArea);
  window.addEventListener('keydown', closeModalWithEsc);
  modal.style.display = 'flex';

  function closeModal() {
    modal.style.display = 'none';
    close.removeEventListener('click', closeModalWithCross);
    window.removeEventListener('click', closeModalWithArea);
    window.removeEventListener('keydown', closeModalWithEsc);
  }
// Close modal window with click on the cross - "x"
  function closeModalWithCross() {
    closeModal();
  }

// Close modal window with click on the grey area
  function closeModalWithArea(e) {
    if (e.target === modal) {
      closeModal();
    }
  }

// Clotse modal window with "Escape-button"
  function closeModalWithEsc(e) {
    if (e.code === 'Escape') {
      closeModal();
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
