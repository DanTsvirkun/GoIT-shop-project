import './categories-styles/category.css';
import allHbs from './categories-templates/category-view-all.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import { api } from '../services/api';
import data from '../services/data';
// =================================================
const ads = document.querySelector('.ads');
const viewAllBtn = document.querySelectorAll('.view-all');
const viewAllUl = document.querySelector('.categories .all-category');
const close = document.querySelector('.close-category');
// =================================================
viewAllBtn.forEach(item => item.addEventListener('click', eachCategory));
close.addEventListener('click', closeCategory);
// =================================================
function eachCategory() {
  ads.classList.add('hide');
  const object = data.allCategories;
  const result = object.map(item => itemHbs(item));
  viewAllUl.innerHTML = result.join('');
}
// ==================================================
function closeCategory() {
  viewAllUl.innerHTML = '';
  ads.classList.remove('hide');
}
