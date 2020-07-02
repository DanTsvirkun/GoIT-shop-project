import incomeBtn from '../templates/income-account-btn.hbs';
import userAvatar from '../templates/account-avatar.hbs';
import userInfo from '../templates/account-user-info.hbs';
import favoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';

import { refs } from './refs';
import { openModal } from './my-modal-window';
import { modalBackDrop } from '../../modal-window/logic-modal';

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
  refs.userFavoritesList.innerHTML = favoritesGoods();
  refs.favoritesValue.textContent = refs.userFavoritesList.childElementCount;
  removeFavorites();
}

function murkupMyAds() {
  refs.userAdsList.innerHTML = myAds();
  refs.myAdsValue.textContent = refs.userAdsList.childElementCount;
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
