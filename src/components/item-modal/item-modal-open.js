import { api } from '../services/api';
import { funcX } from './item-modal';
// const catActive = document.querySelector('.categories');
const ulX = document.querySelector('.things-list');
ulX.addEventListener('click', customFunc);
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

//////
// const ulX = document.querySelector('.things-list');
// ulX.addEventListener('click', customFunc);
// function customFunc(e) {
//   if (e.currentTarget === e.target) {
//     return;
//   }
//   const currentLiId = e.target.closest('li').dataset.id;
//   console.log(currentLiId);
//   api.searchId(currentLiId).then(data => {
//     funcX(data);
//   });
// }
