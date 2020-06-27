import '../css/header-main.css';
import refs from './refs.js';
import authBlock from '../templates/auth-block.hbs';
import categoriesList from '../templates/categories.hbs';
import throttle from 'lodash.throttle';

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
refs.categoriesMobile.addEventListener('click', activeCategory);

refs.clearBlock.addEventListener('click', clearActiveCategory);
refs.clearBlockMobile.addEventListener('click', clearActiveCategory);

refs.mobileFiltersBtn.addEventListener('click', showMobileFilters);

refs.mobileBurger.addEventListener('click', showMobileMenu);
refs.cross.addEventListener('click', closeMobileMenu);

function activeCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    clearActiveCategory();
    if (e.target.classList.contains('active-category')) {
      return;
    }
    e.target.classList.add('active-category');
  }
}

function clearActiveCategory() {
  if (document.querySelector('.active-category')) {
    let activeCategoryATM = document.querySelector('.active-category');
    activeCategoryATM.classList.remove('active-category');
  }
}

function showMobileFilters() {
  if (refs.categoriesMobile.innerHTML === '') {
    refs.categoriesMobile.innerHTML = categoriesMarkup;
  } else {
    refs.categoriesMobile.innerHTML = '';
  }
}

function showMobileMenu() {
  refs.mobileMenuClosed.classList.add('mobile-menu-opened');
}

function closeMobileMenu() {
  refs.mobileMenuClosed.classList.remove('mobile-menu-opened');
}

if (window.matchMedia('(max-width: 767px)').matches) {
  document.addEventListener(
    'touchstart',
    throttle(handleTouchStart, 500),
    false,
  );
  document.addEventListener('touchmove', throttle(handleTouchMove, 500), false);
}

window.addEventListener(
  'resize',
  throttle(() => {
    console.log('resize!!');
    document.removeEventListener(
      'touchstart',
      throttle(handleTouchStart, 500),
      false,
    );
    document.removeEventListener(
      'touchmove',
      throttle(handleTouchMove, 500),
      false,
    );

    if (window.matchMedia('(max-width: 767px)').matches) {
      document.addEventListener(
        'touchstart',
        throttle(handleTouchStart, 500),
        false,
      );
      document.addEventListener(
        'touchmove',
        throttle(handleTouchMove, 500),
        false,
      );
    }
  }, 500),
);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  console.log('AAAAAAA', evt);
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  console.log('AAAAAAA', evt);
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      closeMobileMenu();
    } else {
      showMobileMenu();
    }
  } else {
    if (yDiff > 0) {
      return;
    } else {
      return;
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}