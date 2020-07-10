import '../adv-block/ads-css/adsSection.css';
import './ads-css/arround-block.css';
import Siema from 'siema';
import adsTemplate from '../adv-block/templates/block__list/adsTemplate.hbs';
import adsTemplateArround from './templates/arround-block__list/arround-block__list.hbs';
import throttle from 'lodash.throttle';
// =====================images==============================
import airPods from '../../assets/images/advertisement-OLXProject/air_pods_pro-min.png';
import appleWatch from '../../assets/images/advertisement-OLXProject/apple_watch-min.png';
import dzinsy from '../../assets/images/advertisement-OLXProject/dzinsy-min.png';
import ganteli from '../../assets/images/advertisement-OLXProject/ganteli-min.png';
import gear from '../../assets/images/advertisement-OLXProject/gear-min.png';
import hot from '../../assets/images/advertisement-OLXProject/hot-min.png';
import fen from '../../assets/images/advertisement-OLXProject/hotpng.com-min.png';
import iphone from '../../assets/images/advertisement-OLXProject/iphoneX-min.png';
import JBL from '../../assets/images/advertisement-OLXProject/JBL-min.png';
import playstation from '../../assets/images/advertisement-OLXProject/playstation-4-min.png';
import shkaf from '../../assets/images/advertisement-OLXProject/shkaf-min.png';
import water from '../../assets/images/advertisement-OLXProject/water-min.png';
// =========================================================
const blockList = document.querySelector('.block__list');
const arroundBlockList = document.querySelector('.arround-block__list');
const horizontalBlock = document.querySelector('.horizontal-block');
// =========================================================
const newItem = [
  { image: airPods, name: 'AirPods Pro', price: 8000 },
  { image: appleWatch, name: 'Apple Watch', price: 12000 },
  { image: dzinsy, name: 'Джинсы Lee', price: 1999 },
  { image: ganteli, name: 'Гантели 2кг', price: 500 },
  { image: gear, name: 'Continental', price: 10000 },
  { image: hot, name: 'Tefal', price: 1299 },
];
// =========================================================
const arroundItem = [
  { image: fen, name: 'Фен Philips', price: 999 },
  { image: iphone, name: 'IphoneX', price: 15999 },
  { image: JBL, name: 'Колонка JBL', price: 5799 },
  { image: playstation, name: 'Playstation', price: 8999 },
  { image: shkaf, name: 'Шкаф Купе', price: 3599 },
  { image: water, name: 'Умувальник', price: 1199 },
];
// =========================================================
window.addEventListener('resize', throttle(changeSize, 500));
function changeSize() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    console.log(newItem);
    blockList.innerHTML = newItem.map(item => adsTemplate(item));
    const mySiema = new Siema({
      draggable: false,
      selector: blockList,
      loop: true,
      duration: 1000,
    });
    setInterval(() => {
      mySiema.next();
    }, 3500);
    arroundBlockList.innerHTML = '';
    horizontalBlock.innerHTML = '';
    // blockList.classList.add('block__list-show');
    // arroundBlockList.classList.add('arround-block__list-show');
    // horizontalBlock.classList.add('horizontal-block-show');
  } else if (
    window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
  ) {
    blockList.innerHTML = newItem.map(item => adsTemplate(item));
    const mySiema = new Siema({
      draggable: false,
      selector: blockList,
      loop: true,
      duration: 1000,
    });
    setInterval(() => {
      mySiema.next();
    }, 3500);
    arroundBlockList.innerHTML = arroundItem
      .map(item => adsTemplateArround(item))
      .slice(0, 2)
      .join('');
    horizontalBlock.innerHTML = '';
    // blockList.classList.add('block__list-show');
    // arroundBlockList.classList.add('arround-block__list-show');
    // horizontalBlock.classList.add('horizontal-block-show');
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    blockList.innerHTML = newItem.map(item => adsTemplate(item));
    const mySiema = new Siema({
      draggable: false,
      selector: blockList,
      loop: true,
      duration: 1000,
    });
    setInterval(() => {
      mySiema.next();
    }, 3500);
    arroundBlockList.innerHTML = arroundItem
      .map(item => adsTemplateArround(item))
      .slice(0, 2)
      .join('');

    horizontalBlock.innerHTML = arroundItem
      .map(item => adsTemplateArround(item))
      .slice(3, 6)
      .join('');
    // blockList.classList.add('block__list-show');
    // arroundBlockList.classList.add('arround-block__list-show');
    // horizontalBlock.classList.add('horizontal-block-show');
  }
}
// =========================================================
changeSize();
// =========================================================
