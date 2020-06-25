import '../adv-block/ads-css/adsSection.css';
import './ads-css/arround-block.css';
import Siema from 'siema';
import adsTemplateSM from '../adv-block/templates/block__list/adsTemplateSM.hbs';
import adsTemplateMD from '../adv-block/templates//block__list/adsTemplateMD.hbs';
import adsTemplateArround from './templates/arround-block__list/arround-block__list.hbs';
import adsTemplateArroundLG from './templates/arround-block__list/arround-block__list-LG.hbs';
// =========================================================
const blockList = document.querySelector('.block__list');
const arroundBlockList = document.querySelector('.arround-block__list');
// =========================================================

if (window.matchMedia('(max-width: 767px)').matches) {
  // const object = data.hits.map(item => adsTemplateSM(item)).join('');
  // blockList.insertAdjacentHTML('beforeend', object);
  blockList.insertAdjacentHTML('beforeend', adsTemplateSM());
  const mySiema = new Siema({
    selector: blockList,
    loop: true,
    duration: 1000,
  });
  setInterval(() => {
    mySiema.next();
  }, 3500);
} else if (
  window.matchMedia('(min-width: 768px)' && '(max-width: 1279px)').matches
) {
  blockList.insertAdjacentHTML('beforeend', adsTemplateMD());
  const mySiema = new Siema({
    selector: blockList,
    loop: true,
    duration: 1000,
  });
  setInterval(() => {
    mySiema.next();
  }, 3500);
  arroundBlockList.insertAdjacentHTML('beforeend', adsTemplateArround());
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  blockList.insertAdjacentHTML('beforeend', adsTemplateMD());
  const mySiema = new Siema({
    selector: blockList,
    loop: true,
    duration: 1000,
  });
  setInterval(() => {
    mySiema.next();
  }, 3500);
  arroundBlockList.innerHTML = adsTemplateArroundLG();
}
