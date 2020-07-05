// import { animateCSS } from './account-animation.js';
import { api } from '../../services/api';
import { deleteUserFavourite, deleteUserAdv } from '../../services/user-api';

// ===================== FAVOURITES GOODS =======================

function removeFavorites() {
  const userFavoritesList = document.querySelector('.selected-goods__list');

  userFavoritesList.children.forEach(item =>
    item.addEventListener('click', removeFavoritesItem),
  );
}

function removeFavoritesItem(e) {
  if (e.target.nodeName !== 'SPAN') return;
  const idItem = e.currentTarget.closest('li').dataset.id;

  e.currentTarget.remove();

  backendFavouriteRemove(idItem);

  // animateCSS();
  const favoritesValue = document.querySelector('.js-counter__heart');
  const userFavoritesList = document.querySelector('.selected-goods__list');

  favoritesValue.textContent = userFavoritesList.childElementCount; // FAVOURITES COUNTER
}

function backendFavouriteRemove(idItem) {
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
}

// ===================== USER ADS GOODS =======================

function removeUserAds() {
  const userAdsList = document.querySelector('.my-ads__list');

  userAdsList.children.forEach(item =>
    item.addEventListener('click', removeAdsItem),
  );
}

function removeAdsItem(e) {
  if (e.target.nodeName !== 'SPAN') return;
  const idItem = e.currentTarget.closest('li').dataset.id;
  const category = e.currentTarget.closest('li').dataset.category;

  e.currentTarget.remove();

  backendAdvRemove(idItem);
  api.deleteAdv(category, idItem);

  const myAdsValue = document.querySelector('.js-counter__add');
  const userAdsList = document.querySelector('.my-ads__list');

  myAdsValue.textContent = userAdsList.childElementCount; // ADS COUNTER
}

function backendAdvRemove(idItem) {
  const user = JSON.parse(localStorage.getItem('user-info'));
  const arrayAdv = user.adv;
  const userID = user.userId;
  const userToken = user.token;
  const searchItem = arrayAdv.filter(data => data !== idItem);
  localStorage.setItem(
    'user-info',
    JSON.stringify({
      ...user,
      adv: [...searchItem],
    }),
  );

  deleteUserAdv(userID, idItem, userToken);
}

export { removeFavorites, removeUserAds };
