import './categories-styles/category.css';
import allHbs from './categories-templates/category-view-all.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import { api } from '../services/api';
// =================================================
const ads = document.querySelector('.ads');
const categories = document.querySelector('.categories .container');
const category = document.querySelectorAll(
  '.categories .container .category-list',
);
const list = document.querySelector(
  '.categories .container .category-list .category-info .things-list',
);
const loadMore = document.querySelector('.categories .load-more');
const viewAll = document.querySelectorAll('.view-all');
// =================================================
viewAll.forEach(item => item.addEventListener('click', eachCategory));
// =================================================
const test = api.getCategory('transport');
// =================================================
function eachCategory(e) {
  ads.classList.add('hide');
  category.forEach(item => item.classList.add('hide'));
  loadMore.classList.add('hide');
  categories.innerHTML = allHbs();
  //   const object = test.map(item => itemHbs(item));
  //   list.insertAdjacentHTML('beforeend', object);
}

// console.log(test);
