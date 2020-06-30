import itemModalCardTablet from './item-modal-tablet.hbs';
import './item-modal.css';
import Siema from 'siema';
import { api } from '../services/api';
import { addUserFavourite } from '../services/user-api';
import { deleteUserFavourite } from '../services/user-api';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { modalBackDrop } from '../modal-window/logic-modal.js';

let idItem = null;
let heart = null;
const favBlock = document.querySelector('.item_modal--button-fav');
console.log(favBlock);

export const funcMarkup = data => {
  const closeModal = modalBackDrop(itemModalCardTablet(data));
  const closeBtn = document.querySelector('.icon-cross');
  closeBtn.addEventListener('click', closeModal);
  funcSlider();
  idItem = data.id;
  // (!localStorage.getItem('user-info')) ? favBlock.classList.add('item_modal--button-fav-disactive') : "незнайомець";
  if (!localStorage.getItem('user-info')) {
    localStorage.setItem(
      'user-info',
      JSON.stringify({ basket: [], favorites: [] }),
    );
  }
  heart = document.querySelector('.icon-fav');
  api.getFavorites(idItem)
    ? heart.classList.add('icon-fav--active')
    : heart.classList.remove('icon-fav--active');
  heart.addEventListener('click', debounce(heartAttack, 300));
  const showSellerBtn = document.querySelector(
    '.item_modal--tablet--button-buy',
  );
  const showHideBlock = document.querySelector('.item_modal-seller');
  showSellerBtn.addEventListener('click', changeClassSeller);
  function changeClassSeller(e) {
    if (!showHideBlock.classList.contains('item_modal-seller-active')) {
      showHideBlock.classList.add('item_modal-seller-active');
      showSellerBtn.textContent = 'Скрыть';
      showSellerBtn.classList.add('item_modal--tablet--button-buy-active');
    } else if (showHideBlock.classList.contains('item_modal-seller-active')) {
      showHideBlock.classList.remove('item_modal-seller-active');
      showSellerBtn.textContent = 'Информация о продавце';
      showSellerBtn.classList.remove('item_modal--tablet--button-buy-active');
    }
  }
};

function heartAttack(e) {
  if (api.getFavorites(idItem)) {
    heart.classList.remove('icon-fav--active');
    const user = JSON.parse(localStorage.getItem('user-info'));
    console.log(user);
    const arrayFav = user.favorites;
    const userID = user.userId;
    const userToken = user.token;
    const searchItem = arrayFav.filter(data => data !== idItem);
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...searchItem],
      }),
    );

    deleteUserFavourite(userID, idItem, userToken).then(console.log);

    console.log('searchItem');
    console.log('del');
  } else if (!api.getFavorites(idItem)) {
    heart.classList.add('icon-fav--active');

    // setFavorites(idItem) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const userID = user.userId;
    const userToken = user.token;
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...user.favorites, idItem],
      }),
    );

    addUserFavourite(userID, idItem, userToken);
    console.log('add');
  }
}
//slider-Siema
function funcSlider() {
  class SiemaWithDots extends Siema {
    addDots() {
      this.dots = document.createElement('div');
      this.dots.classList.add('dots');

      for (let i = 0; i < this.innerElements.length; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dots__item');

        dot.addEventListener('click', () => {
          this.goTo(i);
        });
        this.dots.appendChild(dot);
      }
      this.selector.parentNode.insertBefore(
        this.dots,
        this.selector.nextSibling,
      );
    }

    updateDots() {
      for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
        const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
        this.dots
          .querySelectorAll('button')
          [i].classList[addOrRemove]('dots__item--active');
      }
    }
  }

  const mySiemaWithDots = new SiemaWithDots({
    onInit: function () {
      this.addDots();
      this.updateDots();
    },

    onChange: function () {
      this.updateDots();
    },
  });

  //slider-tablet-desktop
  document.body.onclick = function (event) {
    event = event || window.event;
    let allLiImg = document.querySelectorAll('.slider_image-min');
    for (let i = allLiImg.length - 1; i > 0; i--) {
      allLiImg[i].classList.remove('slider_image-min--active');
    }
    if (event.target.classList.contains('sm-photo--style')) {
      for (let i = 0; i < allLiImg.length; i++) {
        allLiImg[i].classList.remove('slider_image-min--active');
      }
      document.getElementById('bg-photo--style').src = event.target.src;
      event.target.parentElement.classList.add('slider_image-min--active');
    }
  };
}
