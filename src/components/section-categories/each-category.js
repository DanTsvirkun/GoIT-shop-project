import './categories-styles/category.css';
import mainHbs from './categories-templates/category-all-item.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import { api } from '../services/api';
import { clearActiveCategory } from '../header-main/js/header-main';
import { showItemModal } from '../item-modal/item-modal-open';
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
  descriptionCategory: '',
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
      object.nameCategory = 'Property';
      object.descriptionCategory = 'Wide variety of flats and houses';
      break;
    case 'transport':
      object.nameCategory = 'Transport';
      object.descriptionCategory =
        'In this section, you can find any vehicle of your choice';
      break;
    case 'work':
      object.nameCategory = 'Work';
      object.descriptionCategory =
        'If you are looking for a job then come to us. More than 500 vacancies every day';
      break;
    case 'electronics':
      object.nameCategory = 'Electronics';
      object.descriptionCategory =
        "Any electronics from children's toys to refrigerators";
      break;
    case 'businessAndServices':
      object.nameCategory = 'Business and services';
      object.descriptionCategory =
        'Need help promoting small business? Hurry up, come exactly to us';
      break;
    case 'recreation-and-sports':
      object.nameCategory = 'Recreation and sport';
      object.descriptionCategory =
        'Looking for a place to hide from the hustle and bustle and everyday life. We will show you the place you dreamed of';
      break;
    case 'free':
      object.nameCategory = 'Free';
      object.descriptionCategory = "Take me away. I'm going to be taken soon!";
      break;
    case 'trade':
      object.nameCategory = 'Trade';
      object.descriptionCategory =
        'You want a new thing, but there is no money. Who seeks will always find';
      break;
    default:
      break;
  }
}
