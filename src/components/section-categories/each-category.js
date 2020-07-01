import './categories-styles/category.css';
import mainHbs from './categories-templates/category-main.hbs';
import itemHbs from './categories-templates/category-item.hbs';
import { api } from '../services/api';

// =================================================
const ads = document.querySelector('.ads');
const viewAllBtn = document.querySelectorAll('.view-all');
const viewAllDiv = document.querySelector('.categories .category-main');
const close = document.querySelector('.close-category');
// =================================================
viewAllBtn.forEach(item => item.addEventListener('click', eachCategory));
close.addEventListener('click', closeCategory);
// =================================================
function eachCategory() {
  // ads.classList.add('hide');
  close.classList.remove('hide');

  const result = object.map(item => itemHbs(item));
  viewAllUl.innerHTML = result.join('');
}
// ==================================================
function closeCategory() {
  viewAllUl.innerHTML = '';
  ads.classList.remove('hide');
  close.classList.add('hide');
}
