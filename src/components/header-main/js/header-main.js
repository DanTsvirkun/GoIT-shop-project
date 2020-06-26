import '../css/header-main.css';
import refs from './refs.js';
import authBlock from '../templates/auth-block.hbs';
import categoriesList from '../templates/categories.hbs';

let activeCategoryATM;

const testArrayFromBack = [
  'Недвижимость',
  'Транспорт',
  'Работа',
  'Электроника',
  'Бизнес и услуги',
  'Отдых и спорт',
  'Отдам бесплатно',
  'Обмен',
];

const categoriesMarkup = categoriesList(testArrayFromBack);
refs.categories.insertAdjacentHTML('beforeend', categoriesMarkup);
const authBlockMarkup = authBlock();
refs.authBlockMobile.insertAdjacentHTML('beforeend', authBlockMarkup);
refs.authBlock.insertAdjacentHTML('beforeend', authBlockMarkup);
refs.categories.addEventListener('click', activeCategory);
refs.clearBlock.addEventListener('click', clearActiveCategory);

function activeCategory(e) {
  if (e.target !== e.currentTarget) {
    if (document.querySelector('.active-category')) {
      activeCategoryATM = document.querySelector('.active-category');
      activeCategoryATM.classList.remove('active-category');
    }
    if (e.target.classList.contains('active-category')) {
      return;
    } else {
      e.target.classList.add('active-category');
    }
  }
}

function clearActiveCategory() {
  if (document.querySelector('.active-category')) {
    activeCategoryATM = document.querySelector('.active-category');
    activeCategoryATM.classList.remove('active-category');
  }
}
