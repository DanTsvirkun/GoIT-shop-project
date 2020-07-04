// import { animateCSS } from './account-animation.js';

function removeFavorites() {
  const userFavoritesList = document.querySelector('.selected-goods__list');

  userFavoritesList.children.forEach(item =>
    item.addEventListener('click', removeFavoritesItem),
  );
}

function removeUserAds() {
  const userAdsList = document.querySelector('.my-ads__list');

  userAdsList.children.forEach(item =>
    item.addEventListener('click', removeAdsItem),
  );
}

function removeFavoritesItem(e) {
  if (e.target.nodeName !== 'SPAN') return;
  e.currentTarget.remove();

  // animateCSS();
  const favoritesValue = document.querySelector('.js-counter__heart');
  const userFavoritesList = document.querySelector('.selected-goods__list');

  favoritesValue.textContent = userFavoritesList.childElementCount;
}

function removeAdsItem(e) {
  if (e.target.nodeName !== 'SPAN') return;
  e.currentTarget.remove();

  const myAdsValue = document.querySelector('.js-counter__add');
  const userAdsList = document.querySelector('.my-ads__list');

  myAdsValue.textContent = userAdsList.childElementCount;
}

export { removeFavorites, removeUserAds };
