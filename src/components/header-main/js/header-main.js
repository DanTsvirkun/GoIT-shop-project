import '../css/header-main.css';
import refs from './refs';
import categoriesList from '../templates/categories.hbs';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { eachCategory } from '../../section-categories/each-category';
import { closeCategory } from '../../section-categories/each-category';
import { api } from '../../services/api';
import categoryTemplate from '../../section-categories/categories-templates/category-all-item.hbs';
import categoryItemTemplate from '../../section-categories/categories-templates/category-item.hbs';

const arrayFromBack = [
  'Недвижимость',
  'Транспорт',
  'Работа',
  'Электроника',
  'Бизнес и услуги',
  'Отдых и спорт',
  'Отдам бесплатно',
  'Обмен',
];

const categoriesMarkup = categoriesList(arrayFromBack);

refs.inputButtonPcTablet.forEach(button =>
  button.addEventListener('click', findGoods),
);

refs.inputSearch.addEventListener('click', findGoods);

const catContainer = refs.sectionCategories.querySelector('.container');
refs.categories.insertAdjacentHTML('beforeend', categoriesMarkup);

refs.categories.addEventListener('click', activeCategory);
refs.categoriesMobile.addEventListener('click', activeCategory);
refs.categoriesTablet.addEventListener('click', activeCategory);

refs.clearBlock.addEventListener('click', clearActiveCategory);
refs.clearBlockMobile.addEventListener('click', clearActiveCategory);

refs.mobileFiltersBtn.addEventListener('click', showMobileFilters);
refs.mobileBurger.addEventListener('click', showMobileMenu);
refs.mobileSearch.addEventListener('click', showMobileInput);

refs.cross.addEventListener('click', closeMobileMenu);
// refs.inputCross.addEventListener('click', cl);

refs.tabletFiltersBtn.addEventListener('click', showTabletFilters);

function activeCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    clearActiveCategory();
    if (e.target.classList.contains('active-category')) {
      return;
    }
    e.target.classList.add('active-category');
    eachCategory(e);
  }
}

export function clearActiveCategory() {
  if (document.querySelector('.active-category')) {
    let activeCategoryATM = document.querySelector('.active-category');
    activeCategoryATM.classList.remove('active-category');
    closeCategory();
  }
}

function showMobileFilters() {
  if (refs.categoriesMobile.innerHTML === '') {
    refs.categoriesMobile.innerHTML = categoriesMarkup;
  } else {
    refs.categoriesMobile.innerHTML = '';
    closeCategory();
  }
}

function showMobileMenu() {
  window.scrollTo(0, 0);
  refs.body.style.overflow = 'hidden';
  refs.mobileMenuClosed.classList.add('mobile-menu-opened');
}

function closeMobileMenu() {
  refs.body.style.overflow = 'unset';
  refs.mobileMenuClosed.classList.remove('mobile-menu-opened');
}

function showMobileInput() {
  refs.mobileInput.classList.add('mobile-input');
  refs.inputSearch.style.display = 'unset';
  refs.inputCross.style.display = 'unset';
  refs.inputCross.addEventListener('click', closeMobileInput);
}

function closeMobileInput() {
  refs.mobileInput.classList.remove('mobile-input');
  refs.inputSearch.style.display = 'none';
  refs.inputCross.style.display = 'none';
  refs.inputCross.removeEventListener('click', closeMobileInput);
  closeCategory();
}

function showTabletFilters() {
  if (refs.categoriesTablet.innerHTML === '') {
    refs.categoriesTablet.style.display = 'flex';
    refs.categoriesTablet.innerHTML = categoriesMarkup;
  } else {
    refs.categoriesTablet.innerHTML = '';
    refs.categoriesTablet.style.display = 'none';
    closeCategory();
  }
}

function findGoods() {
  catContainer.classList.add('hide');
  refs.sectionAds.classList.add('hide');
  refs.wholeCategory.classList.remove('hide');
  refs.loadMore.classList.add('hide');
  refs.wholeCategory.innerHTML = categoryTemplate();
  const itemList = document.querySelector('.things-list');
  itemList.classList.add('category-line');
  refs.closeCategory.classList.remove('hide');
  refs.wholeCategory.classList.add('container');

  if (refs.tabletInput.value !== '') {
    api.searchGoods(refs.tabletInput.value).then(data => {
      itemList.innerHTML = categoryItemTemplate(data);
      refs.wholeCategory.classList.add('all-category-show');
      refs.closeCategory.classList.add('close-category-show');
    });
    return;
  }

  if (refs.PCInput.value !== '') {
    api.searchGoods(refs.PCInput.value).then(data => {
      itemList.innerHTML = categoryItemTemplate(data);
      refs.wholeCategory.classList.add('all-category-show');
      refs.closeCategory.classList.add('close-category-show');
    });
    return;
  }

  if (refs.mobileInput.value !== '') {
    api.searchGoods(refs.mobileInput.value).then(data => {
      itemList.innerHTML = categoryItemTemplate(data);
      refs.wholeCategory.classList.add('all-category-show');
      refs.closeCategory.classList.add('close-category-show');
    });
    return;
  }
}

// function closeCategoryTwo() {
//   refs.wholeCategory.innerHTML = '';
//   closeCategory.classList.add('hide');
//   refs.wholeCategory.classList.add('hide');
//   refs.sectionAds.classList.remove('hide');
//   catContainer.classList.remove('hide');
//   refs.loadMore.classList.remove('hide');
//   refs.wholeCategory.classList.remove('all-category-show');
//   refs.closeCategory.classList.remove('close-category-show');
//   clearActiveCategory();
// }

window.addEventListener(
  'resize',
  throttle(() => {
    refs.categoriesTablet.style.display = 'none';
  }, 1000),
);

////////////////// SWIPE LOGIC BELOW ////////////////////////

const touchStart = throttle(handleTouchStart, 500);
const touchMove = throttle(handleTouchMove, 500);

if (window.matchMedia('(max-width: 767px)').matches) {
  document.addEventListener('touchstart', touchStart);
  document.addEventListener('touchmove', touchMove);
}

window.addEventListener(
  'resize',
  debounce(() => {
    document.removeEventListener('touchstart', touchStart);
    document.removeEventListener('touchmove', touchMove);

    if (window.matchMedia('(max-width: 767px)').matches) {
      document.addEventListener('touchstart', touchStart);
      document.addEventListener('touchmove', touchMove);
    }
  }, 500),
);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      closeMobileMenu();
    } else {
      return;
    }
  } else {
    if (yDiff > 0) {
      return;
    } else {
      return;
    }
  }
  xDown = null;
  yDown = null;
}
