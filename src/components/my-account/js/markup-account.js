import incomeBtn from '../templates/income-account-btn.hbs';
import userAvatar from '../templates/account-avatar.hbs';
import userInfo from '../templates/account-user-info.hbs';
import favoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';
import { refs } from './refs';
import { openModal, openModalMobile } from './my-modal-window';
import { api } from '../../services/api';

function markupIncomeBtn(data) {
  refs.btnOpenModalMobile.innerHTML = incomeBtn(data);
  refs.btnOpenModal.innerHTML = incomeBtn(data);

  openModalMobile(data);
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

  api.filterMyAccount(parseFavorites).then(res => {
    refs.userFavoritesList.innerHTML = favoritesGoods(res);
  });

  refs.favoritesValue.textContent = parseFavorites.length;
  removeFavorites();
}

function murkupMyAds() {
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;

  api.filterMyAccount(parseMyAds).then(res => {
    refs.userAdsList.innerHTML = myAds(res);
  });

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
