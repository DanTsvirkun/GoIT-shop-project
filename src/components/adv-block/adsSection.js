import '../adv-block/ads-css/adsSection.css';
import './ads-css/arround-block.css';
import Siema from 'siema';
import adsTemplateSM from '../adv-block/templates/block__list/adsTemplateSM.hbs';
import adsTemplateMD from '../adv-block/templates//block__list/adsTemplateMD.hbs';
import adsTemplateArround from './templates/arround-block__list/arround-block__list.hbs';
import { api } from '../services/api';

// =========================================================
const blockList = document.querySelector('.block__list');
const arroundBlockList = document.querySelector('.arround-block__list');
const horizontalBlock = document.querySelector('.horizontal-block');
// =========================================================

// =========================================================
if (window.matchMedia('(max-width: 767px)').matches) {
  api
    .getAdvertisement()
    .then(data => data.map(item => adsTemplateSM(item)))
    .then(item => {
      blockList.innerHTML = item;
      const mySiema = new Siema({
        selector: blockList,
        loop: true,
        duration: 1000,
      });
      setInterval(() => {
        mySiema.next();
      }, 3500);
    });
}
// =========================================================
else if (
  window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
) {
  api.getAdvertisement().then(data => {
    blockList.innerHTML = data.map(item => adsTemplateMD(item));
    const mySiema = new Siema({
      selector: blockList,
      loop: true,
      duration: 1000,
    });
    setInterval(() => {
      mySiema.next();
    }, 3500);
    arroundBlockList.innerHTML = data
      .map(item => adsTemplateArround(item))
      .slice(0, 2)
      .join('');
  });
}
// =========================================================
else if (window.matchMedia('(min-width: 1280px)').matches) {
  api.getAdvertisement().then(data => {
    blockList.innerHTML = data.map(item => adsTemplateMD(item));
    const mySiema = new Siema({
      selector: blockList,
      loop: true,
      duration: 1000,
    });
    setInterval(() => {
      mySiema.next();
    }, 3500);
    arroundBlockList.innerHTML = data
      .map(item => adsTemplateArround(item))
      .slice(0, 2)
      .join('');

    horizontalBlock.innerHTML = data
      .map(item => adsTemplateArround(item))
      .slice(3, 6)
      .join('');
  });
}
