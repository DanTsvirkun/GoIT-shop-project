import './categories-styles/category.css';
import mainHbs from './categories-templates/category-all-item.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import { api } from '../services/api';
import { clearActiveCategory } from '../header-main/js/header-main';
// =================================================
const ads = document.querySelector('.ads');
const category = document.querySelector('.categories');
const viewAllDiv = category.querySelector('.all-category');
const catContainer = category.querySelector('.container');
const close = category.querySelector('#closeBtn');
const loadMore = category.querySelector('.load-more');
const modalBtn = document.querySelector('load-more');
// =================================================
category.addEventListener('click', eachCategory);
close.addEventListener('click', closeCategory);
// =================================================
const object = { nameCategory: '', descriptionCategory: '' };
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
  clearActiveCategory();
}
// ==================================================
function mainInfo(word) {
  switch (word) {
    case 'property':
      object.nameCategory = 'property';
      object.descriptionCategory = 'eeerererer';
      break;
    case 'transport':
      object.nameCategory = 'transport';
      object.descriptionCategory = 'ttttyyyyyyy';
      break;
    case 'work':
      object.nameCategory = 'work';
      object.descriptionCategory = 'ggdsgdsgsdgsdgdsgsdg';
      break;
    case 'electronics':
      object.nameCategory = 'electronics';
      object.descriptionCategory = 'gagasgasgasga';
      break;
    case 'business-and-services':
      object.nameCategory = 'business-and-services';
      object.descriptionCategory = 'gagasgasgasga';
      break;
    case 'recreation-and-sports':
      object.nameCategory = 'recreation-and-sports';
      object.descriptionCategory = 'gagasgasgasga';
      break;
    case 'for-free':
      object.nameCategory = 'for-free';
      object.descriptionCategory = 'gagasgasgasga';
      break;
    case 'exchange':
      object.nameCategory = 'exchange';
      object.descriptionCategory = 'gagasgasgasga';
      break;
    default:
      break;
  }
}
