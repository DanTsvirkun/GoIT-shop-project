import Siema from 'siema';
export function funcSlider() {
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
