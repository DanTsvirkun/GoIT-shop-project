import axios from 'axios';
import { refs } from './refs';
import hbsUserInfo from '../templates/account-user-info.hbs';
import hbsFavoritesGoods from '../templates/favorites-goods-modal.hbs';
import myAds from '../templates/my-ads-modal.hbs';
import { removeFavorites, removeUserAds } from './counter-goods';
import { api } from '../../services/api';

function murkupUserInfo(data) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    refs.mobileBackdropMyAccount.innerHTML = hbsUserInfo(data);
  } else {
    refs.modalBackdropMyAccount.innerHTML = hbsUserInfo(data);
  }
}

async function murkupFavoritesGoods() {
  const parseFavorites = JSON.parse(localStorage.getItem('user-info'))
    .favorites;
  const favCheckBtn = document.querySelector('.account-list__favorites');
  favCheckBtn.addEventListener('click', checkFavs);
  api.filterMyAccount(parseFavorites).then(res => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      refs.mobileBackdropFavorites.innerHTML = hbsFavoritesGoods(res);
    } else {
      refs.modalBackdropFavorites.innerHTML = hbsFavoritesGoods(res);
    }
    removeFavorites();
  });
  const favoritesValue = document.querySelector('.js-counter__heart');
  favoritesValue.textContent = parseFavorites.length;

  async function checkFavs() {
    let call;
    let filteredFavorites = [];

    const token = JSON.parse(localStorage.getItem('user-info')).token;

    const info = await axios({
      method: 'GET',
      url: 'https://callboard-back-presentational.goit.global/user',
      headers: {
        Authorization: token,
      },
    });

    const parseFavorites = info.data.favourites;

    if (parseFavorites[0]) {
      for (let i = 0; i < parseFavorites.length; i++) {
        call = await axios({
          method: 'GET',
          url: `https://callboard-back-presentational.goit.global/call/${parseFavorites[i]._id}`,
          headers: { Authorization: token },
        });
        if (call.data.success) {
          filteredFavorites.push(parseFavorites[i]);
        } else {
          const favs = Array.from(
            document.querySelectorAll('.selected-goods__item'),
          );
          // const doc = favs.find(item => item.dataset.id === parseFavorites[i]);
          // doc.remove();
          favoritesValue.textContent -= 1;
        }
      }
    }
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        userId: info.data.id,
        email: info.data.email,
        token,
        favorites: filteredFavorites,
        adv: info.data.calls.map(item => item._id),
      }),
    );
  }
}

function murkupMyAds() {
  const parseMyAds = JSON.parse(localStorage.getItem('user-info')).adv;
  api.filterMyAccount(parseMyAds).then(res => {
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
