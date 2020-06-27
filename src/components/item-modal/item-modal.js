import itemModalCardTablet from './item-modal-tablet.hbs';
import './item-modal.css';
import Siema from 'siema';
const cat = document.querySelector('.categories');
cat.insertAdjacentHTML('beforeend', itemModalCardTablet());
localStorage.setItem(
  'user',
  JSON.stringify({
    email: 'Alxe@asdlasd.com',
    token: 'asdasgkk4444',
    favorites: ['ggjjkkj4j4214124mdmfg', 'ifi124u12uo2428fhj', '129412094jsf'],
  }),
);
const productId = document.querySelector('.item_modal--item-code').textContent;
// localStorage.getItem('user').favourites.includes(productId) = true
//   ? heartBtn.classList.add('icon-fav--active')
//   : heartBtn.classList.remove('icon-fav--active');
/////////////////////////////////
// const heartBtn = document.querySelector('.icon-fav');
// heartBtn.addEventListener('click', addToFavourites);
// function addToFavourites(e) {
//   const productId = document.querySelector('.item_modal--item-code')
//     .textContent;
//   setFavorites(productId) {
//     const user = JSON.parse(localStorage.getItem('user'))
//     localStorage.setItem('user', JSON.stringify({
//       ...user,
//       favorites: [...user.favorites, productId]
//     }))
//   },
//   getFavorites(productId) {
//     const favorites = JSON.parse(localStorage.getItem('user')).favorites
//     console.log(favorites);
//     return favorites.includes(productId)
//   }
// const favorites = JSON.parse(localStorage.getItem('user')).favorites;
// const productId = document.querySelector('.item_modal--item-code')
//   .textContent;
// let elemIndex = favorites.indexOf(productId);
// if (favorites.includes(productId))
//   heartBtn.classList.remove('icon-fav--active');
// favorites.splice(index, elemIndex);
// localStorage.setItem('favorites', JSON.stringify(favorites));
// }

//siema-slider-mobile
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
    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
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
  if (event.target.classList.contains('sm-photo--style')) {
    let allLiImg = document.querySelectorAll('.slider_image-min');
    for (let i = 0; i < allLiImg.length; i++) {
      allLiImg[i].classList.remove('slider_image-min--active');
    }
    document.getElementById('bg-photo--style').src = event.target.src;
    event.target.parentElement.classList.add('slider_image-min--active');
  }
};
////
// const refsItMob = {
//   itemCode: document.querySelector('.item_modal--item-code').textContent,
//   itemName: document.querySelector('.item_modal--header').textContent,
//   itemPrice: document.querySelector('.item_modal--item-pricevalue').textContent,
// };

// console.log(refsItMob.itemName);
// console.log(refsItMob.itemCode);
// console.log(refsItMob.itemPrice);
// let array = [];
// localStorage.setItem('name', JSONstringify(array));

///////////////////////////////////
// localStorage.setItem('names', JSON.stringify(dataLsItem));
// let favorites = JSON.parse(localStorage.getItem(dataLsItem));
// favorites.forEach(function (favorite) {
//   document.getElementById(favorite).className = 'fav';
// });
// document.querySelector('.icon-fav').addEventListener('click', function (e) {
//   let id = e.target.id,
//     item = e.target,
//     index = favorites.indexOf(id);
//   if (!id) return;
//   if (index == -1) {
//     favorites.push(id);
//     item.className = 'fav';
//   } else {
//     favorites.splice(index, 1);
//     item.className = '';
//   }
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// });
