import './categories-styles/category.css';
import './categories-styles/more-info.css';
import Siema from 'siema';
import catMain from './categories-templates/category-main.hbs';
import catPop from './categories-templates/category-item.hbs';
import { api } from '../services/api';
// import { showItemModal } from '../item-modal/item-modal-open';
// ========================================
const categories = document.querySelector('.categories .container');
const btnLoadMore = document.querySelector('.load-more');
let counterStartIdx = 0;
let counterEndIdx = 4;
const nameAllCategories = [
  'electronics',
  'property',
  'transport',
  'work',
  'business-and-services',
  'recreation-and-sports',
  'for-free',
  'exchange',
];
async function fnSwitch(startIdx, endIdx) {
  await nameAllCategories.slice(startIdx, endIdx).forEach(word => {
    if (counterStartIdx !== nameAllCategories.length - 1) {
      counterStartIdx += 1;
    }
    if (!(counterStartIdx % 3)) {
      counterEndIdx += 2;
    }
    return test(word);
  });
}
function test(word) {
  return api.getCategory(word).then(data => {
    switch (word) {
      case 'property':
        data[0].nameCategory = 'property';
        data[0].descriptionCategory = 'eeerererer';
        break;
      case 'transport':
        data[0].nameCategory = 'transport';
        data[0].descriptionCategory = 'ttttyyyyyyy';
        break;
      case 'work':
        data[0].nameCategory = 'work';
        data[0].descriptionCategory = 'ggdsgdsgsdgsdgdsgsdg';
        break;
      case 'electronics':
        data[0].nameCategory = 'electronics';
        data[0].descriptionCategory = 'gagasgasgasga';
        break;
      case 'business-and-services':
        data[0].nameCategory = 'business-and-services';
        data[0].descriptionCategory = 'gagasgasgasga';
        break;
      case 'recreation-and-sports':
        data[0].nameCategory = 'recreation-and-sports';
        data[0].descriptionCategory = 'gagasgasgasga';
        break;
      case 'for-free':
        data[0].nameCategory = 'for-free';
        data[0].descriptionCategory = 'gagasgasgasga';
        break;
      case 'exchange':
        data[0].nameCategory = 'exchange';
        data[0].descriptionCategory = 'gagasgasgasga';
        break;
      default:
        break;
    }
    let category = data[0].category;
    categories.insertAdjacentHTML('beforeend', catMain(data[0]));
    let list = document.querySelector(`.${category}-list`);
    list.insertAdjacentHTML('beforeend', catPop(data));
    const slidePrev = document.querySelector(
      `.${category}-wrapper .slide-prev`,
    );
    const slideNext = document.querySelector(
      `.${category}-wrapper .slide-next`,
    );
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
    const ulX = document.querySelector(`.${word}`);
    // showItemModal(ulX);
    btnLoadMore.classList.remove('hide');
    btnLoadMore.addEventListener('click', showMoreCategories);
    if (counterStartIdx === nameAllCategories.length - 1) {
      btnLoadMore.classList.add('hide');
    }
  });
}
fnSwitch(counterStartIdx, counterEndIdx);
function showMoreCategories(e) {
  if (counterStartIdx === nameAllCategories.length - 1) {
    return;
  }
  fnSwitch(counterStartIdx, counterEndIdx);
}

window.addEventListener('resize', () => {
  console.log(111);
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
});

// ==============================================
// import './categories-styles/category.css';
// import './categories-styles/more-info.css';
// import Siema from 'siema';
// import main from './categories-templates/category-main.hbs';
// import item from './categories-templates/category-item.hbs';
// // ========================================
// const categories = document.querySelector('.categories');
// const container = categories.querySelector('.container');
// // =================static=======================
// container.insertAdjacentHTML('beforeend', main());
// const list = document.querySelector('.things-list');
// list.insertAdjacentHTML('beforeend', item());
// // ========================================
// const slidePrev = document.querySelector('.slide-prev');
// const slideNext = document.querySelector('.slide-next');
// // ========================================
// if (window.matchMedia('(max-width: 767px)').matches) {
//   const mySiema = new Siema({
//     selector: list,
//     loop: true,
//     duration: 1000,
//   });
//   setInterval(() => {
//     mySiema.next();
//   }, 4000);
// } else if (
//   window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
// ) {
//   const mySiema = new Siema({
//     selector: list,
//     duration: 200,
//     perPage: 2,
//   });
//   slidePrev.addEventListener('click', () => mySiema.prev());
//   slideNext.addEventListener('click', () => mySiema.next());
// } else if (window.matchMedia('(min-width: 1280px)').matches) {
//   const mySiema = new Siema({
//     selector: list,
//     duration: 200,
//     perPage: 4,
//   });
//   slidePrev.addEventListener('click', () => mySiema.prev());
//   slideNext.addEventListener('click', () => mySiema.next());
// }
// =========================================
