////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.4//////////////////////////////
////////////////////////////////////////////////////////////

const btn = document.querySelector('#myBtn'); // Find your button-id
const modal = document.querySelector('#myModal'); // Find your modal window-id (wrapper)
const close = document.querySelector('#cross'); // Find your close element (cross - "x")

//1-я реализация через функцию в каждом элекменте логики, експорт именованный/////////////////////////////////

/* // Open modal window
function showModal() {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
}

// Close modal window with click on the cross - "x"
function closeModalWithCross() {
  close.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

// Close modal window with click on the grey area
function closeModalWithArea() {
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

//Clotse modal window with "Escape-button"
function closeModalWithEsc() {
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      modal.style.display = "none";
      window.removeEventListener('keydown', closeModalWithEsc);
    }
  });
}

showModal();
closeModalWithCross();
closeModalWithArea();
closeModalWithEsc();

export {
  showModal,
  closeModalWithCross,
  closeModalWithArea,
  closeModalWithEsc
}

*/

//2-я реализация (через одну функцию-обёртку), експорт по дефолту /////////////////////////////////////////////

// Open modal window
export default function showModal() {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

// Close modal window with click on the cross - "x"
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

// Close modal window with click on the grey area
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

//Clotse modal window with "Escape-button"
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      modal.style.display = 'none';
      window.removeEventListener('keydown', closeModalWithEsc);
    }
  });
}

showModal();

/////////////////////////////////////////////////////////////////////////////
/// Для того, чтобы скрипт сработал, нужно:                               ///
///1. "qerySelector" скопировать к себе в рефсы (refs)                    ///
///2. подставить названия ваших айдишников (id), (если их нет, то создать)///
///3. функции импортировать в свой ".js-файл"                             ///
///Создание элемента крестик ("cross"):                                   ///
///<span id="cross">&times;</span>                                        ///
///На всякий случай... Всем вдохновния при разработке! ;-)                ///
/////////////////////////////////////////////////////////////////////////////
