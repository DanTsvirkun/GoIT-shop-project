import { refs } from './refs';
import { isLogIn } from '../../auth-form/js/auth-form';

import {
  murkupFavoritesGoods,
  murkupMyAds,
  murkupUserInfo,
} from './markup-account';
import { avatarManipulation } from './file-reader';

import {
  animationOpenModal,
  animationCloseModal,
  animationOpenFavorites,
  animationCloseFavorites,
  animationOpenMyAds,
  animationCloseMyAds,
} from './account-animation.js';
import { modalBackDrop } from '../../modal-window/logic-modal';

// =================== OPEN ACCOUNT WINDOW =======================

export function openAccountWindow(data) {
  refs.markupStartBtn.addEventListener('click', e => {
    myAccount(e, data);
  });
}
// refs.markupAccountWindow.addEventListener('click', markupAccountWindow);

function myAccount(e, data) {
  murkupUserInfo(data);
  murkupFavoritesGoods();
  murkupMyAds();

  avatarManipulation();

  const refs = {
    openFavorites: document.querySelector('.account-list__favorites'),
    openMyAds: document.querySelector('.account-list__advertisement'),

    closeBtnAccount: document.querySelector('.close__my-account'),
    logoutAccount: document.querySelector('.account-logout'),

    modalBackdropMyAccount: document.querySelector(
      '.moodal-backdrop__my-account',
    ),
  };

  refs.openFavorites.addEventListener('click', openFavorites);
  refs.openMyAds.addEventListener('click', openMyAds);
  refs.logoutAccount.addEventListener('click', logOut);
  refs.closeBtnAccount.addEventListener('click', closeBtnAccount);
  window.addEventListener('click', windowClose);

  refs.modalBackdropMyAccount.style.display = 'block';

  animationOpenModal();
}

function openFavorites() {
  const closeFavorites = document.querySelector('.close__favorites');
  closeFavorites.addEventListener('click', closeBtnFavorites);

  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropFavorites.style.display = 'block';

  animationOpenFavorites();
}

function openMyAds() {
  const closeMyAds = document.querySelector('.close__my-ads');
  closeMyAds.addEventListener('click', closeBtnMyAds);

  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropMyAds.style.display = 'block';

  animationOpenMyAds();
}

function logOut(e) {
  closeBtnAccount();
  windowClose(e);
}

// =================CLOSE WHEN CLICK ARROUND==================

function windowClose(e) {
  const modalBackdropMyAccount = document.querySelector(
    '.moodal-backdrop__my-account',
  );
  const modalBackdropFavorites = document.querySelector(
    '.moodal-backdrop__favorites',
  );
  const modalBackdropMyAds = document.querySelector('.moodal-backdrop__my-ads');
  if (e.target === modalBackdropMyAccount) {
    modalBackdropMyAccount.style.display = 'none';

    animationCloseModal();
  }

  if (e.target === modalBackdropFavorites) {
    modalBackdropFavorites.style.display = 'none';

    animationCloseFavorites();
  }

  if (e.target === modalBackdropMyAds) {
    modalBackdropMyAds.style.display = 'none';

    animationCloseMyAds();
  }

  isLogIn();
}

// =====================CLOSE MODAL ON BTN=====================

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
