import { refs } from './refs';

import {
  murkupUserAvatar,
  murkupUserInfo,
  murkupFavoritesGoods,
  murkupMyAds,
} from './markup-account';

import {
  animationOpenModal,
  animationCloseModal,
  animationOpenFavorites,
  animationCloseFavorites,
  animationOpenMyAds,
  animationCloseMyAds,
} from './account-animation.js';

// ===================OPEN MODAL ON BTN=======================

refs.btnOpenModal.addEventListener('click', btnOpenModal);
refs.openFavorites.addEventListener('click', openFavorites);
refs.openMyAds.addEventListener('click', openMyAds);

function btnOpenModal() {
  murkupUserAvatar();
  murkupUserInfo();
  refs.modalBackdropMyAccount.style.display = 'block';
  animationOpenModal();
}

function openFavorites() {
  murkupFavoritesGoods();
  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropFavorites.style.display = 'block';
  animationOpenFavorites();
}

function openMyAds() {
  murkupMyAds();
  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropMyAds.style.display = 'block';
  animationOpenMyAds();
}

// =================CLOSE WHEN CLICK ARROUND==================

window.addEventListener('click', windowClose);

function windowClose(e) {
  e.target === refs.modalBackdropMyAccount &&
    (refs.modalBackdropMyAccount.style.display = 'none') &&
    animationCloseModal();

  e.target === refs.modalBackdropFavorites &&
    (refs.modalBackdropFavorites.style.display = 'none') &&
    animationCloseFavorites();

  e.target === refs.modalBackdropMyAds &&
    (refs.modalBackdropMyAds.style.display = 'none') &&
    animationCloseMyAds();
}

// =====================CLOSE MODAL ON BTN=====================

refs.closeBtnAccount.addEventListener('click', closeBtnAccount);
refs.closeBtnFavorites.addEventListener('click', closeBtnFavorites);
refs.closeBtnMyAds.addEventListener('click', closeBtnMyAds);

function closeBtnAccount() {
  refs.modalBackdropMyAccount.style.display = 'none';
  animationCloseModal();
}

function closeBtnFavorites() {
  refs.modalBackdropFavorites.style.display = 'none';
  animationCloseFavorites();
}

function closeBtnMyAds() {
  refs.modalBackdropMyAds.style.display = 'none';
  animationCloseMyAds();
}

// ======================LOGOUT======================

refs.logoutAccount.addEventListener('click', logOut);

function logOut() {
  refs.modalBackdropMyAccount.style.display = 'none';
  refs.btnOpenModal.style.display = 'none';
}
