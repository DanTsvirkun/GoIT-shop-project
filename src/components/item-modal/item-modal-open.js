import { api } from '../services/api';
import { getUserInfo } from '../services/user-api';
import { funcMarkup } from './item-modal';
export const showItemModal = function (el) {
  el.addEventListener('click', customFunc);
};
function customFunc(e) {
  if (e.currentTarget === e.target) {
    return;
  }
  if (document.querySelector('.adv-modal')) {
    document.querySelector('.adv-modal').style.display = 'block';
  }
  if (document.querySelector('.modalContainer')) {
    document.querySelector('.modalContainer').style.display = 'block';
  }
  const currentLiId = e.target.closest('li').dataset.id;
  api.searchId(currentLiId).then(data => {
    getUserInfo(data.author).then(res => funcMarkup({ ...data, ...res.data }));
  });
}
