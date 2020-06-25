import './categories-styles/category.css';
import Siema from 'siema';
import catMain from './categories-templates/category-main.hbs';
import catPop from './categories-templates/category-popular.hbs';
// ========================================
const categories = document.querySelector('.categories');
// ========================================
categories.insertAdjacentHTML('beforeend', catMain());
const list = document.querySelector('.things-list');
list.insertAdjacentHTML('beforeend', catPop());
const mySiema = new Siema({
  selector: list,
  loop: true,
  duration: 1000,
});
setInterval(() => {
  mySiema.next();
}, 3500);
