import itemModalCardTablet from './item-modal-tablet.hbs';
import './item-modal.css';
import Siema from 'siema';
import { api } from '../services/api';
import debounce from 'lodash.debounce';
import axios from 'axios';
////////////////////
const API_URL = 'https://api-project-575025675995.firebaseio.com';
const addUserFavourite = (userId, advId) => {
  return axios.patch(`${API_URL}/user/${userId}/favourite.json`, {
    [advId]: 'key',
  });
};
const deleteUserFavourite = (userId, advId) => {
  return axios.delete(`${API_URL}/user/${userId}/favourite/${advId}.json`);
};
/////////////
// const cat = document.querySelector('.categories');
// cat.insertAdjacentHTML('beforeend', itemModalCardTablet());
///////////////////////////////////
// localStorage.setItem(
//   'user-info',
//   JSON.stringify({
//     email: 'Alxe@asdlasd.com',
//     token: 'asdasgkk4444',
//     id: '-MAvXcnLmqyQoMBhlFy2',
//     favorites: [
//       'ggjjkkj4j4214124mdmfg',
//       'ifi124u12uo2428fhj',
//       '129412094jsf',
//       '-MAqWL79loN9BjHqSvK0',
//     ],
//   }),
// );
let idItem = null;
let heart = null;
export const funcX = data => {
  const cat = document.querySelector('.categories');
  // cat.insertAdjacentHTML('beforeend', itemModalCardTablet(data));
  cat.innerHTML = itemModalCardTablet(data);
  funcY();
  idItem = data.id;
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
};
///userId+ItemId =>>>addUserFavourite(userId, advId)
function heartAttack(e) {
  if (api.getFavorites(idItem)) {
    heart.classList.remove('icon-fav--active');
    const user = JSON.parse(localStorage.getItem('user-info'));
    const arrayFav = user.favorites;
    // console.log(arrayFav);
    const searchItem = arrayFav.filter(data => data !== idItem);
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...searchItem],
      }),
    );
    deleteUserFavourite('-MAvXcnLmqyQoMBhlFy2', idItem).then(console.log);

    console.log('searchItem');
    console.log('del');
  } else if (!api.getFavorites(idItem)) {
    heart.classList.add('icon-fav--active');

    // setFavorites(idItem) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    //   function(id)
    // // запрос на сервер конкретного юзера если он есть, но влюбом случае записываем id  в локал сторейдж
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...user.favorites, idItem],
      }),
    );

    addUserFavourite('-MAvXcnLmqyQoMBhlFy2', idItem);
    console.log('add');
    // api.setFavorites(idItem);
  }
}

function funcY() {
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
  //   document.body.onclick = function (event) {
  //     event = event || window.event;
  //     if (event.target.classList.contains('sm-photo--style')) {
  //       let allLiImg = document.querySelectorAll('.slider_image-min');
  //       for (let i = 0; i < allLiImg.length; i++) {
  //         allLiImg[i].classList.remove('slider_image-min--active');
  //       }
  //       document.getElementById('bg-photo--style').src = event.target.src;
  //       event.target.parentElement.classList.add('slider_image-min--active');
  //     }
  //   };
  // }
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
