import '../adv-block/adsSection.css';
import adsTemplate from '../adv-block/adsTemplate.hbs';
// =========================================================
const blockList = document.querySelector('.block__list');
blockList.insertAdjacentHTML('beforeend', adsTemplate());
