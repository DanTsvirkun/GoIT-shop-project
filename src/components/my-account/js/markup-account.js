import incomeBtn from '../templates/income-account-btn.hbs';
import userAvatar from '../templates/account-avatar.hbs';
import userInfo from '../templates/account-user-info.hbs';
import favoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';

import { refs } from './refs';
import { openModal } from './my-modal-window';
import { api } from '../../services/api';

// import { modalBackDrop } from '../../modal-window/logic-modal';

// if (localStorage.getItem('user-info')) {

function markupIncomeBtn(data) {
  refs.btnOpenModal.innerHTML = incomeBtn(data);

  openModal(data);
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
  // const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;
  api.filterMyAccount(parseFavorites).then(res => {
    refs.userFavoritesList.innerHTML = favoritesGoods(res);
  });

  // refs.userFavoritesList.innerHTML = favoritesGoods(favBack);

  refs.favoritesValue.textContent = parseFavorites.length;
  removeFavorites();
}

function murkupMyAds() {
  // const parseFavorites = JSON.parse(localStorage.getItem('user-info'))
  //   .favorites;
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;

  api.filterMyAccount(parseMyAds).then(res => {
    refs.userAdsList.innerHTML = myAds(res);
  });

  // console.log('myAdsBack.advertisement', myAdsBack);
  // console.log('parseMyAds', parseMyAds);
  // console.log('parseFavorites', parseFavorites);

  refs.myAdsValue.textContent = parseMyAds.length;
  removeUserAds();
}

export {
  markupIncomeBtn,
  murkupUserAvatar,
  murkupUserInfo,
  murkupFavoritesGoods,
  murkupMyAds,
};

// =====================================
// import menu from '../menu.json';
// const listItem = menuItem(menu);
// =====================================
