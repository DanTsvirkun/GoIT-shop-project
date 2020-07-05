import { refs } from './refs';
import hbsUserInfo from '../templates/account-user-info.hbs';
import hbsFavoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';
import { api } from '../../services/api';

// import { modalBackDrop } from '../../modal-window/logic-modal';

// ================================================================
// const closeModal = modalBackDrop(openAccMob(data));
// const closeBtn = document.querySelector('.close__my-account');
// closeBtn.addEventListener('click', closeModal);
// ================================================================

function murkupUserInfo(data) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    refs.mobileBackdropMyAccount.innerHTML = hbsUserInfo(data);
  } else {
    refs.modalBackdropMyAccount.innerHTML = hbsUserInfo(data);
  }
}

function murkupFavoritesGoods() {
  const parseFavorites = JSON.parse(localStorage.getItem('user-info'))
    .favorites;

  api.filterMyAccount(parseFavorites).then(res => {
    console.log('favorites', res);
    if (window.matchMedia('(max-width: 767px)').matches) {
      refs.mobileBackdropFavorites.innerHTML = hbsFavoritesGoods(res);
    } else {
      refs.modalBackdropFavorites.innerHTML = hbsFavoritesGoods(res);
    }

    removeFavorites();
  });

  const favoritesValue = document.querySelector('.js-counter__heart');
  favoritesValue.textContent = parseFavorites.length;
}

function murkupMyAds() {
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;

  api.filterMyAccount(parseMyAds).then(res => {
    console.log('ads', res);
    if (window.matchMedia('(max-width: 767px)').matches) {
      refs.mobileBackdropMyAds.innerHTML = myAds(res);
    } else {
      refs.modalBackdropMyAds.innerHTML = myAds(res);
    }

    removeUserAds();
  });

  const myAdsValue = document.querySelector('.js-counter__add');
  myAdsValue.textContent = parseMyAds.length;
}

export { murkupFavoritesGoods, murkupMyAds, murkupUserInfo };
