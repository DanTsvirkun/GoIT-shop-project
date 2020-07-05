import './categories-styles/category.css';
import mainHbs from './categories-templates/category-all-item.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import {
  api
} from '../services/api';
import {
  clearActiveCategory
} from '../header-main/js/header-main';
import {
  showItemModal
} from '../item-modal/item-modal-open';
// =================================================
const ads = document.querySelector('.ads');
const category = document.querySelector('.categories');
const viewAllDiv = category.querySelector('.all-category');
const catContainer = category.querySelector('.container');
const close = category.querySelector('#closeBtn');
const loadMore = category.querySelector('.load-more');
const modalBtn = document.querySelector('load-more');
// =================================================
showItemModal(viewAllDiv);
// ================================================
category.addEventListener('click', eachCategory);
close.addEventListener('click', closeCategory);
// =================================================
const object = {
  nameCategory: '',
  descriptionCategory: ''
};
// ======
export function eachCategory(event) {
  if (
    event.target.classList.contains('view-all') ||
    event.target.classList.contains('categories-filter__item--btn')
  ) {
    const nameCat = event.target.dataset.category;
    mainInfo(nameCat);
    ads.classList.add('hide');
    catContainer.classList.add('hide');
    loadMore.classList.add('hide');
    viewAllDiv.innerHTML = mainHbs(object);
    const show = document.querySelector('.show-all');
    show.classList.add('category-line');
    close.classList.remove('hide');
    viewAllDiv.classList.remove('hide');
    viewAllDiv.classList.add('container');

    call(nameCat, show);
  } else return;
}
// =================================================
function call(name, show) {
  api.getCategory(name).then(data => {
    show.innerHTML = itemHbs(data);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    viewAllDiv.classList.add('all-category-show');
    close.classList.add('close-category-show');
  });
}
// =================================================
export function closeCategory() {
  viewAllDiv.innerHTML = '';
  close.classList.add('hide');
  viewAllDiv.classList.add('hide');
  ads.classList.remove('hide');
  catContainer.classList.remove('hide');
  loadMore.classList.remove('hide');
  viewAllDiv.classList.remove('all-category-show');
  close.classList.remove('close-category-show');
  viewAllDiv.classList.remove('container');
  clearActiveCategory();
}
// ==================================================
function mainInfo(word) {
  switch (word) {
    case 'property':
      object.nameCategory = 'Недвижимость';
      object.descriptionCategory =
        'При публикации объявлений в разделе Недвижимость необходимо придерживаться правил, что и при размещении любых других объявлений. Однако есть несколько нюансов, на которые стоит обратить внимание.';
      break;
    case 'transport':
      object.nameCategory = 'Транспорт';
      object.descriptionCategory =
        'В этом разделе вы можете найти любое передвигающееся средство по вашему вкусу';
      break;
    case 'work':
      object.nameCategory = 'Работа';
      object.descriptionCategory =
        'Если ищешь работу  тогда тебе к нам. более 500 вакансий каждый день';
      break;
    case 'electronics':
      object.nameCategory = 'Электроника';
      object.descriptionCategory =
        'Любая электроника от детских игрушек до холодильников';
      break;
    case 'business-and-services':
      object.nameCategory = 'Бизнес и услуги';
      object.descriptionCategory =
        'Нужна помощь в продвижении малого бизнеса. Торопись тебе точно к нам';
      break;
    case 'recreation-and-sports':
      object.nameCategory = 'Отдых и спорт';
      object.descriptionCategory =
        'Ищешь место куда бы укрытся от суеты и будней. Мы покажем тебе место о котором ты мечьтал';
      break;
    case 'for-free':
      object.nameCategory = 'Отдам даром';
      object.descriptionCategory = 'Забери меня скорей. Отдадут меня быстрей';
      break;
    case 'exchange':
      object.nameCategory = 'Обмен';
      object.descriptionCategory =
        'Хочешь обновку а денег нет. Кто ищет всегда найдет';
      break;
    default:
      break;
  }
}
