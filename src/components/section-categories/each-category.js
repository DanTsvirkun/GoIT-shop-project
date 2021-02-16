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
      object.nameCategory = 'Nieruchomości';
      object.descriptionCategory =
        'Publikując ogłoszenia w dziale Nieruchomość, należy przestrzegać zasad, tak jak przy publikacji innych ogłoszeń. Istnieje jednak kilka niuansów, na które trzeba zwrócić uwagę...';
      break;
    case 'transport':
      object.nameCategory = 'Motoryzacja';
      object.descriptionCategory =
        'W tym dziale znajdziesz dowolne dobra ruchome w Twoim stylu';
      break;
    case 'work':
      object.nameCategory = 'Praca';
      object.descriptionCategory =
        'Jeśli szukasz pracy - dobrze trafiłeś. Ponad 500 wakatów każdego dnia';
      break;
    case 'electronics':
      object.nameCategory = 'Elektronika';
      object.descriptionCategory =
        'Wszystko, co związane z elektroniką - od zabawek dla dzieci do lodówek';
      break;
    case 'businessAndServices':
      object.nameCategory = 'Usługi i Firmy';
      object.descriptionCategory =
        'Potrzebujesz pomocy w rozwoju małego biznesu? Pospiesz się, dobrze trafiłeś';
      break;
    case 'recreation-and-sports':
      object.nameCategory = 'Sport i Hobby';
      object.descriptionCategory =
        'Szukasz miejsca, w którym mógłbyś się ukryć od marności i szarości dnia codziennego? Pokażemy Ci miejsce, o którym marzyłeś';
      break;
    case 'free':
      object.nameCategory = 'Oddam za darmo';
      object.descriptionCategory =
        'Zabierz mnie szybciej. Oddadzą mnie szybciej.';
      break;
    case 'trade':
      object.nameCategory = 'Zamienię';
      object.descriptionCategory =
        'Chcesz czegoś nowego, ale nie masz pieniędzy. Kto szuka, zawsze znajdzie';
      break;
    default:
      break;
  }
}
