////////////////////////////////////////////////////////////
//LOGIC FOR MODAL WINDOW v.0.7//////////////////////////////
////////////////////////////////////////////////////////////

//////////////Вызвать метод modalBackdrop, передать разметку/////////////////////////////
//<div class="modalContainer"></div> - этот див с классом должен быть в основной разметке,
//так как на него повешены глобальные настройки
/////////////////////////////////////////////////////////////////////////////////////////​

export const modalBackDrop = innerElement => {
  const body = document.querySelector('body');
  const container = document.querySelector('.modalContainer');
  const createModalMarkup = closeModal => {
    body.classList.add('lockOverflow');
    return `
        ${innerElement}
    `;
  };
  const closeModal = () => {
    container.classList.remove('show-modal');
    container.addEventListener('click', close);
    document.removeEventListener('keydown', close);
    document.querySelector('body').style.overflow = 'unset';
  };
  const close = e => {
    if (
      e.target === document.querySelector('.modalContainer') ||
      e.key === 'Escape'
    ) {
      closeModal();
    } else return;
  };
  container.innerHTML = createModalMarkup(closeModal);
  container.classList.add('show-modal', 'transition-effect');
  document.querySelector('body').style.overflow = 'hidden';
  container.addEventListener('click', close);
  document.addEventListener('keydown', close);
  return closeModal;
};

////////Your element///////////////////////////////////////////////////////////////

/* const adv = () => {
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
​
adv();
 */
