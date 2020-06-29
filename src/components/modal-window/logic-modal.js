////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.7//////////////////////////////
////////////////////////////////////////////////////////////

//////////////Вызвать метод modalBackdrop, передать разметку/////////////////////////////
//<div class="modalContainer"><div> - этот див с классом должен быть в основной разметке,
//так как на него повешены глобальные настройки
/////////////////////////////////////////////////////////////////////////////////////////

export const modalBackDrop = (innerElement) => {
  const container = document.querySelector('.modalContainer');
  const createModalMarkup = (closeModal) => {
    return `
    <div class ="modal">
        ${innerElement};
    </div>
    `;
  }
  const closeModal = () => {
    container.innerHTML = '';
    container.addEventListener('click', close);
    document.removeEventListener('keydown', close);
  }

  const close = (e) => {
    if (e.target === document.querySelector('.modal') || e.key === 'Escape') {
      closeModal();
    } else return;
  }

  container.innerHTML = createModalMarkup(closeModal);
  container.addEventListener('click', close);
  document.addEventListener('keydown', close);
  return closeModal;
}

////////Your element///////////////////////////////////////////////////////////////

const adv = () => {
  const innerElement2 = `
    <div class="innerBlock2">
    <h2>Open Window</h2>
    <button class="closeBtnAdv">x</button>
    </div>
    `;
  const closeModal = modalBackDrop(innerElement2); // !!!!!!!!!! Передать разметку, в ответ получить метод на закрытие окна
  const closeBtn = document.querySelector('.closeBtnAdv');
  closeBtn.addEventListener('click', closeModal);
}

adv();
