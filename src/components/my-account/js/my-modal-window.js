import { refs } from './refs';
import { isLogIn } from '../../auth-form/js/auth-form';
import { signOutUser } from '../../services/user-api';

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

// =================== OPEN ACCOUNT WINDOW =======================

export function openAccMob(data) {
  refs.markupStartBtn.addEventListener('click', e => {
    myAccount(e, data);
  });
}

export function openAcc(data) {
  refs.markupStartBtnTablet.addEventListener('click', e => {
    myAccount(e, data);
  });
}

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
  };

  const mobileBackdropMyAccount = document.querySelector('.js-mobil__account');
  const modalBackdropMyAccount = document.querySelector(
    '.js-tablet__my-account',
  );

  if (window.matchMedia('(max-width: 767px)').matches) {
    mobileBackdropMyAccount.style.display = 'block';
  } else {
    modalBackdropMyAccount.style.display = 'block';
  }

  refs.openFavorites.addEventListener('click', openFavorites);
  refs.openMyAds.addEventListener('click', openMyAds);
  refs.logoutAccount.addEventListener('click', e => {
    logOut(e, data);
  });
  refs.closeBtnAccount.addEventListener('click', closeBtnAccount);
  window.addEventListener('click', windowClose);

  animationOpenModal();
}

function openFavorites() {
  const closeFavorites = document.querySelector('.close__favorites');
  closeFavorites.addEventListener('click', closeBtnFavorites);

  refs.mobileBackdropMyAccount.style.display = 'none';
  refs.mobileBackdropFavorites.style.display = 'block';

  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropFavorites.style.display = 'block';

  animationOpenFavorites();
}

function openMyAds() {
  const closeMyAds = document.querySelector('.close__my-ads');
  closeMyAds.addEventListener('click', closeBtnMyAds);

  refs.mobileBackdropMyAccount.style.display = 'none';
  refs.mobileBackdropMyAds.style.display = 'block';

  refs.modalBackdropMyAccount.style.display = 'none';
  refs.modalBackdropMyAds.style.display = 'block';

  animationOpenMyAds();
}

// ========================== SIGNOUT ==========================

function logOut() {
  signOutUser();
  isLogIn();
  closeBtnAccount();
}

// ================= CLOSE WHEN CLICK ARROUND ==================

function windowClose(e) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const mobileBackdropMyAccount = document.querySelector(
      '.js-mobil__account',
    );
    const mobileBackdropFavorites = document.querySelector(
      '.js-mobil__favorites',
    );
    const mobileBackdropMyAds = document.querySelector('.js-mobil__my-ads');

    if (e.target === mobileBackdropMyAccount) {
      mobileBackdropMyAccount.style.display = 'none';
      animationCloseModal();
    }

    if (e.target === mobileBackdropFavorites) {
      mobileBackdropFavorites.style.display = 'none';
      animationCloseFavorites();
    }

    if (e.target === mobileBackdropMyAds) {
      mobileBackdropMyAds.style.display = 'none';
      animationCloseMyAds();
    }
  } else {
    const modalBackdropMyAccount = document.querySelector(
      '.js-tablet__my-account',
    );
    const modalBackdropFavorites = document.querySelector(
      '.js-tablet__favorites',
    );
    const modalBackdropMyAds = document.querySelector('.js-tablet__my-ads');

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
  }

  isLogIn();
}

// ===================== CLOSE MODAL ON BTN =====================

function closeBtnAccount() {
  isLogIn();
  refs.mobileBackdropMyAccount.style.display = 'none';
  refs.modalBackdropMyAccount.style.display = 'none';
  animationCloseModal();
}

function closeBtnFavorites() {
  refs.mobileBackdropFavorites.style.display = 'none';
  refs.modalBackdropFavorites.style.display = 'none';

  animationCloseFavorites();
}

function closeBtnMyAds() {
  refs.mobileBackdropMyAds.style.display = 'none';
  refs.modalBackdropMyAds.style.display = 'none';

  animationCloseMyAds();
}
