import './categories-styles/category.css';
import Siema from 'siema';
import catMain from './categories-templates/category-main.hbs';
import catPop from './categories-templates/category-popular.hbs';
// ========================================
const categories = document.querySelector('.categories');
// =================static=======================
categories.insertAdjacentHTML('beforeend', catMain());
const list = document.querySelector('.things-list');
list.insertAdjacentHTML('beforeend', catPop());
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
// const object = data.hits.map(item => adsTemplateSM(item)).join('');
// blockList.insertAdjacentHTML('beforeend', object);
// =========================================
// function createCategory() {
//   categories.insertAdjacentHTML('beforeend', catMain());
// }
