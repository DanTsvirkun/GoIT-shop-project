import Siema from 'siema';
import throttle from 'lodash.throttle';
import { api } from '../../services/api';
import { deleteUserFavourite, deleteUserAdv } from '../../services/user-api';
import { showItemModal } from '../../item-modal/item-modal-open';
import { closeBtnFavorites, closeBtnMyAds } from './my-modal-window';
import data from '../../services/data';
import catPop from '../../section-categories/categories-templates/category-item.hbs';
import catMain from '../../section-categories/categories-templates/category-main-mini.hbs';
import { ready } from '../../loader/loader';

// ===================== FAVOURITES GOODS =======================

function removeFavorites() {
  const userFavoritesList = document.querySelector('.selected-goods__list');
  userFavoritesList.children.forEach(item =>
    item.addEventListener('click', removeFavoritesItem),
  );
}

function removeFavoritesItem(e) {
  const favoritesValue = document.querySelector('.js-counter__heart');
  const userFavoritesList = document.querySelector('.selected-goods__list');

  if (e.target.nodeName !== 'SPAN') {
    userFavoritesList.addEventListener('click', () => {
      closeBtnFavorites();
    });

    showItemModal(userFavoritesList);

    return;
  }

  const idItem = e.currentTarget.closest('li').dataset.id;
  e.currentTarget.remove();
  backendFavouriteRemove(idItem);

  favoritesValue.textContent = userFavoritesList.childElementCount; // FAVOURITES COUNTER
}

function backendFavouriteRemove(idItem) {
  const user = JSON.parse(localStorage.getItem('user-info'));
  const arrayFav = user.favorites;
  const userID = user.userId;
  const userToken = user.token;
  const searchItem = arrayFav.filter(data => data !== idItem);
  localStorage.setItem(
    'user-info',
    JSON.stringify({
      ...user,
      favorites: [...searchItem],
    }),
  );

  deleteUserFavourite(userID, idItem, userToken);
}

// ===================== USER ADS GOODS =======================

function removeUserAds() {
  const userAdsList = document.querySelector('.my-ads__list');

  userAdsList.children.forEach(item =>
    item.addEventListener('click', removeAdsItem),
  );
}

async function removeAdsItem(e) {
  const myAdsValue = document.querySelector('.js-counter__add');
  const userAdsList = document.querySelector('.my-ads__list');

  if (e.target.nodeName !== 'SPAN') {
    userAdsList.addEventListener('click', () => {
      closeBtnMyAds();
    });

    showItemModal(userAdsList);

    return;
  }

  const idItem = e.currentTarget.closest('li').dataset.id;
  const category = e.currentTarget.closest('li').dataset.category;
  e.currentTarget.remove();

  backendAdvRemove(idItem);
  await api.deleteAdv(category, idItem);

  const blockList = document.querySelector('.block__list');
  const arroundBlockList = document.querySelector('.arround-block__list');
  const horizontalBlock = document.querySelector('.horizontal-block');
  const categories = document.querySelector('.categories .container');
  const btnLoadMore = document.querySelector('.load-more');
  const nameAllCategories = [
    'electronics',
    'property',
    'transport',
    'work',
    'businessAndServices',
    'recreationAndSport',
    'free',
    'trade',
  ];
  const dataII = data.allCategories.filter(adv => adv.category === category);
  console.log(data.allCategories);
  console.log(dataII);
  if (document.querySelector('.loader-wrapper')) {
    ready();
    blockList.classList.add('block__list-show');
    arroundBlockList.classList.add('arround-block__list-show');
    horizontalBlock.classList.add('horizontal-block-show');
  }
  switch (category) {
    case 'property':
      dataII[0].nameCategory = 'Недвижимость';
      dataII[0].descriptionCategory =
        'При публикации объявлений в разделе Недвижимость необходимо придерживаться правил, что и при размещении любых других объявлений. Однако есть несколько нюансов, на которые стоит обратить внимание.';
      break;
    case 'transport':
      dataII[0].nameCategory = 'Транспорт';
      dataII[0].descriptionCategory =
        'В этом разделе вы можете найти любое передвигающееся средство по вашему вкусу';
      break;
    case 'work':
      dataII[0].nameCategory = 'Работа';
      dataII[0].descriptionCategory =
        'Если ищешь работу  тогда тебе к нам. более 500 вакансий каждый день';
      break;
    case 'electronics':
      dataII[0].nameCategory = 'Электроника';
      dataII[0].descriptionCategory =
        'Любая электроника от детских игрушек до холодильников';
      break;
    case 'businessAndServices':
      dataII[0].nameCategory = 'Бизнес и услуги';
      dataII[0].descriptionCategory =
        'Нужна помощь в продвижении малого бизнеса? Торопись тебе точно к нам';
      break;
    case 'recreationAndSport':
      dataII[0].nameCategory = 'Отдых и спортивные состязания';
      dataII[0].descriptionCategory =
        'Ищешь место куда бы укрытся от суеты и будней? Мы покажем тебе место о котором ты мечтал';
      break;
    case 'free':
      dataII[0].nameCategory = 'Бесплатно';
      dataII[0].descriptionCategory =
        'Забери меня скорей. Отдадут меня быстрей';
      break;
    case 'trade':
      dataII[0].nameCategory = 'Обмен';
      dataII[0].descriptionCategory =
        'Хочешь обновку а денег нет. Кто ищет всегда найдет';
      break;
    default:
      break;
  }
  let cat = dataII[0].category;
  if (document.querySelector(`.${cat}-wrapper`)) {
    document.querySelector(`.${cat}-wrapper`).innerHTML = catMain(dataII[0]);
  }
  let list = document.querySelector(`.${cat}-list`);
  if (list) {
    list.insertAdjacentHTML('beforeend', catPop(dataII));
    const slidePrev = document.querySelector(`.${cat}-wrapper .slide-prev`);
    const slideNext = document.querySelector(`.${cat}-wrapper .slide-next`);

    if (window.matchMedia('(max-width: 767px)').matches) {
      const mySiema = new Siema({
        selector: list,
        loop: true,
        duration: 100,
        perPage: 1,
        easing: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
      });
      window.addEventListener(
        'resize',
        throttle(() => {
          if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiema.perPage = 2;
            mySiema.loop = false;
            mySiema.config.perPage = 2;
            mySiema.config.loop = false;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiema.perPage = 4;
            mySiema.loop = false;
            mySiema.config.perPage = 4;
            mySiema.config.loop = false;
          } else if (window.matchMedia('(max-width: 767px)').matches) {
            mySiema.perPage = 1;
            mySiema.loop = true;
            mySiema.config.perPage = 1;
            mySiema.config.loop = true;
          }
        }, 300),
      );
    } else if (
      window.matchMedia('(min-width: 768px)').matches &&
      window.matchMedia('(max-width: 1279px)').matches
    ) {
      const mySiemaTablet = new Siema({
        selector: list,
        duration: 200,
        perPage: 2,
      });
      slidePrev.addEventListener('click', () => mySiemaTablet.prev());
      slideNext.addEventListener('click', () => mySiemaTablet.next());
      window.addEventListener(
        'resize',
        throttle(() => {
          if (window.matchMedia('(max-width: 767px)').matches) {
            mySiemaTablet.perPage = 1;
            mySiemaTablet.loop = true;
            mySiemaTablet.config.perPage = 1;
            mySiemaTablet.config.loop = true;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiemaTablet.perPage = 4;
            mySiemaTablet.loop = false;
            mySiemaTablet.config.perPage = 4;
            mySiemaTablet.config.loop = false;
          } else if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiemaTablet.perPage = 2;
            mySiemaTablet.loop = false;
            mySiemaTablet.config.perPage = 2;
            mySiemaTablet.config.loop = false;
          }
        }, 300),
      );
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
      const mySiemaPC = new Siema({
        selector: list,
        duration: 200,
        perPage: 4,
      });
      slidePrev.addEventListener('click', () => mySiemaPC.prev());
      slideNext.addEventListener('click', () => mySiemaPC.next());
      window.addEventListener(
        'resize',
        throttle(() => {
          if (window.matchMedia('(max-width: 767px)').matches) {
            mySiemaPC.perPage = 1;
            mySiemaPC.loop = true;
            mySiemaPC.config.perPage = 1;
            mySiemaPC.config.loop = true;
          } else if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiemaPC.perPage = 2;
            mySiemaPC.loop = false;
            mySiemaPC.config.perPage = 2;
            mySiemaPC.config.loop = false;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiemaPC.perPage = 4;
            mySiemaPC.loop = false;
            mySiemaPC.config.perPage = 4;
            mySiemaPC.config.loop = false;
          }
        }, 300),
      );
    }
    const ulX = document.querySelector(`.${cat}-list`);
    showItemModal(ulX);
  }

  myAdsValue.textContent = userAdsList.childElementCount; // ADS COUNTER
}

function backendAdvRemove(idItem) {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const arrayAdv = user.adv;
  const arrayFav = user.favorites;
  const userID = user.userId;
  const userToken = user.token;
  const newAdv = arrayAdv.filter(data => data !== idItem);
  const advToDelete = data.allCategories.find(item => item.id === idItem);
  data.allCategories = data.allCategories.filter(item => item.id !== idItem);
  data[advToDelete.category] = data[advToDelete.category].filter(
    item => item.id !== idItem,
  );
  localStorage.setItem(
    'user-info',
    JSON.stringify({
      ...user,
      adv: [...newAdv],
    }),
  );
  user = JSON.parse(localStorage.getItem('user-info'));
  if (arrayFav.includes(idItem)) {
    const newFav = arrayFav.filter(data => data !== idItem);
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...newFav],
      }),
    );
    // favoritesValue.textContent = userFavoritesList.childElementCount;
  }
  deleteUserAdv(userID, idItem, userToken);
}

export { removeFavorites, removeUserAds };
