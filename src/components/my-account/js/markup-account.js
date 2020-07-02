import incomeBtn from '../templates/income-account-btn.hbs';
import userAvatar from '../templates/account-avatar.hbs';
import userInfo from '../templates/account-user-info.hbs';
import favoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';

import { refs } from './refs';

function markupIncomeBtn() {
  refs.btnOpenModal.insertAdjacentHTML('beforeend', incomeBtn());
}
markupIncomeBtn();

function murkupUserAvatar() {
  refs.hbsUserAvatar.innerHTML = userAvatar();
}

function murkupUserInfo() {
  refs.hbsUserInfo.innerHTML = userInfo();
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
