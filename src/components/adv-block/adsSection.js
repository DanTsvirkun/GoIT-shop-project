import '../adv-block/ads-css/adsSection.css';
import './ads-css/arround-block.css';
import Siema from 'siema';
import adsTemplateSM from '../adv-block/templates/block__list/adsTemplateSM.hbs';
import adsTemplateMD from '../adv-block/templates//block__list/adsTemplateMD.hbs';
// import adsTemplateLG from '../adv-block/templates//block__list/adsTemplateLG.hbs';
import adsTemplateArround from './templates/arround-block__list/arround-block__list.hbs';
// =========================================================
const blockList = document.querySelector('.block__list');
const arroundBlockList = document.querySelector('.arround-block__list');
// =========================================================

function createAdsMarckup(data) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    blockList.insertAdjacentHTML('beforeend', adsTemplateSM());
    new Siema({ selector: blockList, loop: true });
  } else if (
    window.matchMedia('(min-width: 768px)' && '(max-width: 1200px)').matches
  ) {
    blockList.insertAdjacentHTML('beforeend', adsTemplateMD());
    new Siema({ selector: blockList, loop: true });
    arroundBlockList.insertAdjacentHTML('beforeend', adsTemplateArround());
  }
}

createAdsMarckup();
