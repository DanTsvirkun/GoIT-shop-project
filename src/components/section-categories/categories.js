import './categories-styles/category.css';
import './categories-styles/more-info.css';
import Siema from 'siema';
import main from './categories-templates/category-main.hbs';
import item from './categories-templates/category-item.hbs';
// ========================================
const categories = document.querySelector('.categories');
const container = categories.querySelector('.container');
// =================static=======================
container.insertAdjacentHTML('beforeend', main());
const list = document.querySelector('.things-list');
list.insertAdjacentHTML('beforeend', item());
// ========================================
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
// ========================================
if (window.matchMedia('(max-width: 767px)').matches) {
  const mySiema = new Siema({
    selector: list,
    loop: true,
    duration: 1000,
  });
  setInterval(() => {
    mySiema.next();
  }, 4000);
} else if (
  window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
) {
  const mySiema = new Siema({
    selector: list,
    duration: 200,
    perPage: 2,
  });
  slidePrev.addEventListener('click', () => mySiema.prev());
  slideNext.addEventListener('click', () => mySiema.next());
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  const mySiema = new Siema({
    selector: list,
    duration: 200,
    perPage: 4,
  });
  slidePrev.addEventListener('click', () => mySiema.prev());
  slideNext.addEventListener('click', () => mySiema.next());
}
// =========================================
