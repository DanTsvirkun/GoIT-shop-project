import itemModalCardTablet from './item-modal-tablet.hbs';
import './item-modal.css';
import { api } from '../services/api';
import { addUserFavourite } from '../services/user-api';
import { deleteUserFavourite } from '../services/user-api';
import debounce from 'lodash.debounce';
import { modalBackDrop } from '../modal-window/logic-modal.js';
import { funcSlider } from './item-modal-slider.js';

let idItem = null;
let heart = null;

export const funcMarkup = data => {
  const closeModal = modalBackDrop(itemModalCardTablet(data));
  let favBlock = document.querySelector('.item_modal--icons');
  const closeBtn = document.querySelector('.icon-cross');
  closeBtn.addEventListener('click', closeModal);
  funcSlider();
  idItem = data.id;
  if (!localStorage.getItem('user-info')) {
    favBlock.classList.add('item_modal--icons-disactive');
  } else {
    heart = document.querySelector('.icon-fav');
    api.getFavorites(idItem)
      ? heart.classList.add('icon-fav--active')
      : heart.classList.remove('icon-fav--active');
    heart.addEventListener('click', debounce(heartAttack, 300));
  }
  const showSellerBtn = document.querySelector(
    '.item_modal--tablet--button-buy',
  );
  const showHideBlock = document.querySelector('.item_modal-seller');
  showSellerBtn.addEventListener('click', changeClassSeller);
  function changeClassSeller(e) {
    if (!showHideBlock.classList.contains('item_modal-seller-active')) {
      showHideBlock.classList.add('item_modal-seller-active');
      showSellerBtn.textContent = 'Hide';
      showSellerBtn.classList.add('item_modal--tablet--button-buy-active');
    } else if (showHideBlock.classList.contains('item_modal-seller-active')) {
      showHideBlock.classList.remove('item_modal-seller-active');
      showSellerBtn.textContent = "Author's contact info";
      showSellerBtn.classList.remove('item_modal--tablet--button-buy-active');
    }
  }
  let allLiImg = document.querySelectorAll('.slider_image-min');
  allLiImg[0].classList.add('slider_image-min--active');
};

function heartAttack(e) {
  if (api.getFavorites(idItem)) {
    heart.classList.remove('icon-fav--active');
    const user = JSON.parse(localStorage.getItem('user-info'));
    const arrayFav = user.favorites;
    const userID = user.userId;
    const userToken = user.token;
    const searchItem = arrayFav.filter(data => data !== idItem);
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...searchItem],
      }),
    );

    deleteUserFavourite(userID, idItem, userToken);
  } else if (!api.getFavorites(idItem)) {
    heart.classList.add('icon-fav--active');

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userID = user.userId;
    const userToken = user.token;
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...user.favorites, idItem],
      }),
    );

    addUserFavourite(userID, idItem, userToken);
  }
}
