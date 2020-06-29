import { api } from '../services/api';
import { funcX } from './item-modal';
import ModalLogic from '../modal-window/logic-modal.js';
// const catActive = document.querySelector('.categories');
export const showItemModal = function (el) {
  // const ulX = document.querySelector('.things-list');
  el.addEventListener('click', customFunc);
  //   console.log(el);
};
// const ulX = document.querySelector('.things-list');
// ulX.addEventListener('click', customFunc);
function customFunc(e) {
  if (e.currentTarget === e.target) {
    return;
  }
  const currentLiId = e.target.closest('li').dataset.id;
  console.log(currentLiId);
  api.searchId(currentLiId).then(data => {
    funcX(data);
  });
}
