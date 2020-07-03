import incomeBtn from '../templates/income-account-btn.hbs';
import userAvatar from '../templates/account-avatar.hbs';
import userInfo from '../templates/account-user-info.hbs';
import favoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';

import { refs } from './refs';
import { openModal } from './my-modal-window';
import { api } from '../../services/api';

import { modalBackDrop } from '../../modal-window/logic-modal';

const divBtn = document.querySelector('.header-auth');

divBtn.addEventListener('click', e => {
  const onImg = e.target.nodeName;

  if (onImg !== 'IMG') return;
  openTabletBtn();
});

function openTabletBtn() {
  // const localUserInfo = JSON.parse(localStorage.getItem('user-info'));
  // closeModal(data);
  refs.modalBackdropMyAccount.style.display = 'block';
  // openModalBtn();
}

// ================================================================

function markupIncomeBtn(data) {
  refs.btnOpenModal.innerHTML = incomeBtn(data);

  refs.btnOpenModal.addEventListener('click', e => btnOpenModal(e, data));
  openModal(data);

  // const closeModal = modalBackDrop(openModal(data));
  // const closeBtn = document.querySelector('.close__my-account');
  // closeBtn.addEventListener('click', closeModal);
}

function murkupUserAvatar(data) {
  refs.hbsUserAvatar.innerHTML = userAvatar(data);
}

function murkupUserInfo(data) {
  refs.hbsUserInfo.innerHTML = userInfo(data);
}

function murkupFavoritesGoods() {
  const parseFavorites = JSON.parse(localStorage.getItem('user-info'))
    .favorites;

  api.filterMyAccount(parseFavorites).then(res => {
    refs.userFavoritesList.innerHTML = favoritesGoods(res);
    removeFavorites();
  });

  refs.favoritesValue.textContent = parseFavorites.length;
}

function murkupMyAds() {
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;

  api.filterMyAccount(parseMyAds).then(res => {
    refs.userAdsList.innerHTML = myAds(res);
    removeUserAds();
  });

  refs.myAdsValue.textContent = parseMyAds.length;
}

export {
  markupIncomeBtn,
  murkupUserAvatar,
  murkupUserInfo,
  murkupFavoritesGoods,
  murkupMyAds,
};
