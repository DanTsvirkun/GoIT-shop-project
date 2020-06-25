import itemModalCard from './item-modal.hbs';
import itemModalCardTablet from './item-modal-tablet.hbs';
import './item-modal.css';
import Siema from 'siema';
//temporary
const cat = document.querySelector('.categories');

// if (window.matchMedia('(max-width: 767px)').matches) {
//   cat.innerHTML = itemModalCard();
cat.insertAdjacentHTML('beforeend', itemModalCard());
// }
// if (window.matchMedia('(min-width: 768px)').matches) {
//   cat.innerHTML = itemModalCardTablet();
cat.insertAdjacentHTML('beforeend', itemModalCardTablet());
// }

//add to favourites
const heartBtn = document.querySelector('.icon-fav');
// console.log(heartBtn);
heartBtn.addEventListener('click', addToFavourites);

function addToFavourites(e) {
  heartBtn.classList.toggle('icon-fav--active');
  console.log('11');
}

//siema
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

//modal-tablet
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

//heart click amination
