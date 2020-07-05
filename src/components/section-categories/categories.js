import './categories-styles/category.css';
import './categories-styles/more-info.css';
import Siema from 'siema';
import catMain from './categories-templates/category-main.hbs';
import catPop from './categories-templates/category-item.hbs';
import { api } from '../services/api';
import { showItemModal } from '../item-modal/item-modal-open';
import throttle from 'lodash.throttle';
const categories = document.querySelector('.categories .container');
const btnLoadMore = document.querySelector('.load-more');
let counterStartIdx = 0;
let counterEndIdx = 4;
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
async function fnSwitch(startIdx, endIdx) {
  await nameAllCategories.slice(startIdx, endIdx).forEach(word => {
    if (counterStartIdx !== nameAllCategories.length - 1) {
      counterStartIdx += 1;
    }
    if (!(counterStartIdx % 3)) {
      counterEndIdx += 2;
    }
    return test(word);
  });
}
function test(word) {
  return api.getCategory(word).then(data => {
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
        duration: 200,
      });
      window.addEventListener(
        'resize',
        throttle(() => {
          if (
            window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
              .matches
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
            mySiema.config.loop = false;
          }
        }, 300),
      );
    } else if (
      window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
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
            window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
              .matches
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
            window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)')
              .matches
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
    if (counterStartIdx === nameAllCategories.length - 1) {
      btnLoadMore.classList.add('hide');
    }
  });
}
fnSwitch(counterStartIdx, counterEndIdx);
function showMoreCategories(e) {
  if (counterStartIdx === nameAllCategories.length - 1) {
    return;
  }
  fnSwitch(counterStartIdx, counterEndIdx);
}
