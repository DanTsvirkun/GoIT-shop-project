import { refs } from './refs';
import hbsIncomeBtn from '../templates/income-account-btn.hbs';
import hbsUserInfo from '../templates/account-user-info.hbs';
import hbsFavoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';
import { openAccountWindow } from './my-modal-window';
import { api } from '../../services/api';
import { isLogIn } from '../../auth-form/js/auth-form';

// import { modalBackDrop } from '../../modal-window/logic-modal';

// const divBtn = document.querySelector('.header-auth');

// divBtn.addEventListener('click', e => {
//   const clickOnImg = e.target.nodeName;

//   if (clickOnImg !== 'IMG') return;
//   openTabletBtn();
// });

// function openTabletBtn() {
//   // const localUserInfo = JSON.parse(localStorage.getItem('user-info'));
//   // closeModal(data);
//   refs.modalBackdropMyAccount.style.display = 'block';
//   // openAccountWindowBtn();
// }

// ================================================================

function markupStartBtn(data) {
  refs.markupStartBtn.innerHTML = hbsIncomeBtn(data); // '.header-auth-mobile'
  openAccountWindow(data);
}

// const closeModal = modalBackDrop(openAccountWindow(data));
// const closeBtn = document.querySelector('.close__my-account');
// closeBtn.addEventListener('click', closeModal);
// ================================================================

function murkupUserInfo(data) {
  refs.modalBackdropMyAccount.innerHTML = hbsUserInfo(data);
}

function murkupFavoritesGoods() {
  const parseFavorites = JSON.parse(localStorage.getItem('user-info'))
    .favorites;

  api.filterMyAccount(parseFavorites).then(res => {
    refs.modalBackdropFavorites.innerHTML = hbsFavoritesGoods(res);
    removeFavorites();
  });

  const favoritesValue = document.querySelector('.js-counter__heart');
  favoritesValue.textContent = parseFavorites.length;
}

function murkupMyAds() {
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;

  api.filterMyAccount(parseMyAds).then(res => {
    refs.modalBackdropMyAds.innerHTML = myAds(res);
    removeUserAds();
  });

  const myAdsValue = document.querySelector('.js-counter__add');
  myAdsValue.textContent = parseMyAds.length;
}

export { markupStartBtn, murkupFavoritesGoods, murkupMyAds, murkupUserInfo };
