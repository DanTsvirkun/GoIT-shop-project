import './categories-styles/category.css';
import './categories-styles/more-info.css';
import Siema from 'siema';
import catMain from './categories-templates/category-main.hbs';
import catPop from './categories-templates/category-item.hbs';
import { load, ready } from '../loader/loader';
import { api } from '../services/api';
import { showItemModal } from '../item-modal/item-modal-open';
import throttle from 'lodash.throttle';
// =========================================================
const blockList = document.querySelector('.block__list');
const arroundBlockList = document.querySelector('.arround-block__list');
const horizontalBlock = document.querySelector('.horizontal-block');
// =========================================================
const categories = document.querySelector('.categories .container');
const btnLoadMore = document.querySelector('.load-more');
let counterStartIdx = 0;
let counterEndIdx = 2;
const nameAllCategories = [
  'electronics',
  'property',
  'transport',
  'work',
  'business-and-services',
  'recreation-and-sports',
  'for-free',
  'exchange',
];
load();
function fnSwitch(startIdx, endIdx) {
  nameAllCategories.slice(startIdx, endIdx).forEach((word, idx, curArr) => {
    if (counterStartIdx < nameAllCategories.length + 1) {
      counterStartIdx += 1;
    }

    if (curArr.length < 2 || counterEndIdx !== 3) {
      counterEndIdx += 1;
    }
    return test(word);
  });
}

function test(word) {
  return api.getCategory(word).then(data => {
    if (document.querySelector('.loader-wrapper')) {
      ready();
      blockList.classList.add('block__list-show');
      arroundBlockList.classList.add('arround-block__list-show');
      horizontalBlock.classList.add('horizontal-block-show');
    }
    switch (word) {
      case 'property':
        data[0].nameCategory = 'Недвижимость';
        data[0].descriptionCategory =
          'При публикации объявлений в разделе Недвижимость необходимо придерживаться правил, что и при размещении любых других объявлений. Однако есть несколько нюансов, на которые стоит обратить внимание.';
        break;
      case 'transport':
        data[0].nameCategory = 'Транспорт';
        data[0].descriptionCategory =
          'В этом разделе вы можете найти любое передвигающееся средство по вашему вкусу';
        break;
      case 'work':
        data[0].nameCategory = 'Работа';
        data[0].descriptionCategory =
          'Если ищешь работу  тогда тебе к нам. более 500 вакансий каждый день';
        break;
      case 'electronics':
        data[0].nameCategory = 'Электроника';
        data[0].descriptionCategory =
          'Любая электроника от детских игрушек до холодильников';
        break;
      case 'business-and-services':
        data[0].nameCategory = 'Бизнес и услуги';
        data[0].descriptionCategory =
          'Нужна помощь в продвижении малого бизнеса. Торопись тебе точно к нам';
        break;
      case 'recreation-and-sports':
        data[0].nameCategory = 'Отдых и спортивные состязания';
        data[0].descriptionCategory =
          'Ищешь место куда бы укрытся от суеты и будней. Мы покажем тебе место о котором ты мечьтал';
        break;
      case 'for-free':
        data[0].nameCategory = 'Бесплатно';
        data[0].descriptionCategory =
          'Забери меня скорей. Отдадут меня быстрей';
        break;
      case 'exchange':
        data[0].nameCategory = 'Обмен';
        data[0].descriptionCategory =
          'Хочешь обновку а денег нет. Кто ищет всегда найдет';
        break;
      default:
        break;
    }
    let category = data[0].category;
    categories.insertAdjacentHTML('beforeend', catMain(data[0]));
    let list = document.querySelector(`.${category}-list`);
    list.insertAdjacentHTML('beforeend', catPop(data));
    const slidePrev = document.querySelector(
      `.${category}-wrapper .slide-prev`,
    );
    const slideNext = document.querySelector(
      `.${category}-wrapper .slide-next`,
    );
    // ===================================================

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
            console.log('1');
            mySiema.perPage = 2;
            mySiema.loop = false;
            mySiema.config.perPage = 2;
            mySiema.config.loop = false;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            console.log('2');
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
    const ulX = document.querySelector(`.${word}-list`);
    showItemModal(ulX);
    btnLoadMore.classList.remove('hide');
    btnLoadMore.addEventListener('click', showMoreCategories);
    if (counterStartIdx === nameAllCategories.length) {
      btnLoadMore.classList.add('hide');
    }
  });
}
fnSwitch(counterStartIdx, counterEndIdx);

function showMoreCategories(e) {
  if (counterStartIdx > nameAllCategories.length) {
    return;
  }
  fnSwitch(counterStartIdx, counterEndIdx);
}
