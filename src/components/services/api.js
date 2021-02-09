import axios from 'axios';
import Siema from 'siema';
import throttle from 'lodash.throttle';
import data from './data';
import catPop from '../section-categories/categories-templates/category-item.hbs';
import catMain from '../section-categories/categories-templates/category-main-mini.hbs';
import { ready } from '../loader/loader';
import { showItemModal } from '../item-modal/item-modal-open';

const apiKey = 'AIzaSyB2FKz-w072z63RmuE_hI2iUziWeqou_3E';
const mainUrl = 'https://st-bc-e5b14.firebaseio.com';
const mainUrlNew = 'https://callboard-backend-en.goit.global';

export const nameAllCategories = [
  'electronics',
  'property',
  'transport',
  'work',
  'businessAndServices',
  'recreationAndSport',
  'free',
  'trade',
];
const requestedArray = [];
// Название категорий:
// 'property' --- Недвижимость,
// 'transport' --- Транспорт,
// 'work' --- работа,
// 'electronics' --- Электроника,
// 'businessAndServices' --- Бизнес и услуги,
// 'recreationAndSport' --- Отдых и спорт,
// 'free' --- Отдам бесплатно,
// 'trade' --- Обмен
// 'advertisement --- Реклама

export const api = {
  getCategory(category) {
    if (data[category]) {
      // if (data[category].length > 0) {
      //   return new Promise(resolve => {
      //     resolve(data[category]);
      //   });
      // }
      return axios
        .get(`${mainUrlNew}/call/specific/${category}`)
        .then(res => {
          const result = this.transformCategory(res.data);
          if (!requestedArray.includes(category)) {
            requestedArray.push(category);
          }

          data.allCategories = [...data.allCategories, ...result];
          data[category] = [...result];

          const ids = [];

          for (let i = 0; i < data.allCategories.length; i++) {
            if (ids.includes(data.allCategories[i].id)) {
              continue;
            }
            ids.push(data.allCategories[i].id);
          }

          data.allCategories = ids.map(id =>
            data.allCategories.find(adv => adv.id === id),
          );
          return result;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return new Promise((res, rej) => {
        rej('not category');
      });
    }
  },

  getAdvertisement() {
    if (data.advertisement) {
      if (data.advertisement.length > 0) {
        return new Promise(resolve => {
          resolve(data.advertisement);
        });
      }
      return axios
        .get(`${mainUrlNew}/call/ads`)
        .then(res => {
          const result = this.transformCategory(res.data);
          const randomArray = this.shuffleGoods(result);
          data.advertisement = [...randomArray];
          return randomArray;
        })
        .catch(err => {});
    } else {
      return new Promise((res, rej) => {
        rej('not category');
      });
    }
  },

  searchGoods(searchWord) {
    if (searchWord) {
      if (
        data.allCategories.length > 0 &&
        requestedArray.length === nameAllCategories.length
      ) {
        return new Promise(resolve => {
          resolve(this.filterWords(searchWord));
        });
      }
      return new Promise(res => {
        res('res');
      })
        .then(res => {
          if (requestedArray.length < nameAllCategories.length) {
            return this.addCategory().then(arr => {
              const allCategories = arr.map(item => {
                return this.getCategory(item);
              });
              return Promise.all(allCategories).then(array => {
                const result = this.filterWords(searchWord);

                if (!result.length) {
                  document.querySelector('.category-info').innerHTML =
                    '<p style="color:blue;text-align:center;>Товаров не найдено</p>';
                }

                return result;
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return new Promise((res, rej) => {
        rej('not valid request');
      });
    }
  },
  transformCategory(arr) {
    const data = arr.map(item => {
      const mainImg = item.imageUrls[0];
      let category = item.category;
      if (category === 'business and services') {
        category = 'businessAndServices';
      }
      if (category === 'recreation and sport') {
        category = 'recreationAndSport';
      }
      return {
        name: item.title,
        author: item.userId,
        mainImg,
        images: item.imageUrls,
        category,
        price: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
        description: item.description,
        phone: item.phone,
        id: item._id,
      };
    });
    return data;
  },
  transformAllCategories(values) {
    const allObjects = Object.values(values);
    const arrayObjects = allObjects.flatMap(item => {
      const transform = this.transformCategory(item);
      return transform;
    });
    const randomArray = this.shuffleGoods(arrayObjects);
    data.allCategories = [...randomArray];

    return randomArray;
  },
  filterWords(searchWord) {
    searchWord.toLowerCase();
    const filteredArray = data.allCategories.filter(item => {
      return item.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    return filteredArray;
  },
  searchId(id) {
    if (id) {
      return new Promise((res, rej) => {
        const objId = data.allCategories.find(item => item.id === id);
        res(objId);
      });
    } else {
      return new Promise((res, rej) => {
        rej('there is not such id');
      });
    }
  },
  getUserInfo() {},
  postAdv(category, obj, images) {
    if (obj.category === 'businessAndServices') {
      obj.category = 'business and services';
    }
    if (obj.category === 'recreationAndSport') {
      obj.category = 'recreation and sport';
    }
    return axios({
      method: 'POST',
      url: `${mainUrlNew}/call/`,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user-info')).token,
      },
      data: obj,
    })
      .then(res => {
        const user = JSON.parse(localStorage.getItem('user-info'));
        const objII = {};
        for (const key of obj.keys()) {
          objII[key] = obj.get(key);
        }
        const userId = user.userId;
        const userToken = user.token;
        objII.mainImg = images[0];
        objII.id = res.data.id;
        objII.name = objII.title;
        if (objII.category === 'free') {
          objII.price = 0;
        }
        data.allCategories = [
          ...data.allCategories,
          {
            name: objII.name,
            description: objII.description,
            author: JSON.parse(localStorage.getItem('user-info')).userId,
            category: objII.category,
            price: objII.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
            images: images,
            mainImg: objII.mainImg,
            id: objII.id,
          },
        ];
        data[category] = [
          ...data[category],
          {
            name: objII.title,
            description: objII.description,
            author: objII.userId,
            category: objII.category,
            price: objII.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
            images: images,
            mainImg: images[0],
            id: res.data.id,
          },
        ];
        if (document.querySelector(`.${objII.category}-wrapper`)) {
          test(objII.category);
        }
        return res.data;
      })
      .catch(err => console.log(err));
  },

  getAllGoods() {
    if (
      data.allCategories.length > 0 &&
      requestedArray.length === nameAllCategories.length
    ) {
      return new Promise(resolve => {
        resolve(data.allCategories);
      });
    }
    return new Promise(res => {
      res('res');
    })
      .then(res => {
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              return data.allCategories;
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  addCategory() {
    let array = [];
    for (let i = 0; i < nameAllCategories.length; i++) {
      if (!requestedArray.includes(nameAllCategories[i])) {
        array.push(nameAllCategories[i]);
      }
    }
    return new Promise(res => res(array));
  },

  shuffleGoods(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  removeFavorites(array) {
    const user = JSON.parse(localStorage.getItem('user-info')).id;
  },
  setFavorites(id) {
    const user = JSON.parse(localStorage.getItem('user-info'));
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        favorites: [...user.favorites, id],
      }),
    );
  },
  getFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem('user-info')).favorites;
    return favorites.includes(id);
  },
  filterMyAccount(favArr) {
    if (
      data.allCategories.length > 0 &&
      requestedArray.length === nameAllCategories.length
    ) {
      return new Promise(resolve => {
        const arrFavAdv = this.filterFavAdv(favArr);
        resolve(arrFavAdv);
      });
    }
    return new Promise(res => {
      res('res');
    })
      .then(res => {
        if (requestedArray.length < nameAllCategories.length) {
          return this.addCategory().then(arr => {
            const allCategories = arr.map(item => {
              return this.getCategory(item);
            });
            return Promise.all(allCategories).then(array => {
              const arrFavAdv = this.filterFavAdv(favArr);
              return arrFavAdv;
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  filterFavAdv(favArr) {
    const favorites = data.allCategories.filter(item =>
      favArr.includes(item.id),
    );
    return favorites;
  },
  deleteAdv(category, id) {
    return axios({
      method: 'DELETE',
      url: `${mainUrlNew}/call/${id}`,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user-info')).token,
      },
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  },
};

function test(word) {
  const blockList = document.querySelector('.block__list');
  const arroundBlockList = document.querySelector('.arround-block__list');
  const horizontalBlock = document.querySelector('.horizontal-block');
  const categories = document.querySelector('.categories .container');
  const btnLoadMore = document.querySelector('.load-more');
  const nameAllCategories = [
    'electronics',
    'property',
    'transport',
    'work',
    'businessAndServices',
    'recreationAndSport',
    'free',
    'trade',
  ];
  const dataII = data.allCategories.filter(adv => adv.category === word);
  if (document.querySelector('.loader-wrapper')) {
    ready();
    blockList.classList.add('block__list-show');
    arroundBlockList.classList.add('arround-block__list-show');
    horizontalBlock.classList.add('horizontal-block-show');
  }
  switch (word) {
    case 'property':
      dataII[0].nameCategory = 'Property';
      dataII[0].descriptionCategory = 'Wide variety of flats and houses';
      break;
    case 'transport':
      dataII[0].nameCategory = 'Transport';
      dataII[0].descriptionCategory =
        'In this section, you can find any vehicle of your choice';
      break;
    case 'work':
      dataII[0].nameCategory = 'Work';
      dataII[0].descriptionCategory =
        'If you are looking for a job then come to us. More than 500 vacancies every day';
      break;
    case 'electronics':
      dataII[0].nameCategory = 'Electronics';
      dataII[0].descriptionCategory =
        "Any electronics from children's toys to refrigerators";
      break;
    case 'businessAndServices':
      dataII[0].nameCategory = 'Business and services';
      dataII[0].descriptionCategory =
        'Need help promoting small business? Hurry up, come exactly to us';
      break;
    case 'recreationAndSport':
      dataII[0].nameCategory = 'Recreation and sport';
      dataII[0].descriptionCategory =
        'Looking for a place to hide from the hustle and bustle and everyday life. We will show you the place you dreamed of';
      break;
    case 'free':
      dataII[0].nameCategory = 'Free';
      dataII[0].descriptionCategory =
        "Take me away. I'm going to be taken soon!";
      break;
    case 'trade':
      dataII[0].nameCategory = 'Trade';
      dataII[0].descriptionCategory =
        'You want a new thing, but there is no money. Who seeks will always find';
      break;
    default:
      break;
  }
  let category = dataII[0].category;
  if (document.querySelector(`.${word}-wrapper`)) {
    document.querySelector(`.${word}-wrapper`).innerHTML = catMain(dataII[0]);
  }
  let list = document.querySelector(`.${category}-list`);
  if (list) {
    list.insertAdjacentHTML('beforeend', catPop(dataII));
    const slidePrev = document.querySelector(
      `.${category}-wrapper .slide-prev`,
    );
    const slideNext = document.querySelector(
      `.${category}-wrapper .slide-next`,
    );

    if (window.matchMedia('(max-width: 767px)').matches) {
      const mySiema = new Siema({
        selector: list,
        loop: true,
        duration: 100,
        perPage: 1,
        easing: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
      });
      window.addEventListener(
        'resize',
        throttle(() => {
          if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiema.perPage = 2;
            mySiema.loop = false;
            mySiema.config.perPage = 2;
            mySiema.config.loop = false;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiema.perPage = 4;
            mySiema.loop = false;
            mySiema.config.perPage = 4;
            mySiema.config.loop = false;
          } else if (window.matchMedia('(max-width: 767px)').matches) {
            mySiema.perPage = 1;
            mySiema.loop = true;
            mySiema.config.perPage = 1;
            mySiema.config.loop = true;
          }
        }, 300),
      );
    } else if (
      window.matchMedia('(min-width: 768px)').matches &&
      window.matchMedia('(max-width: 1279px)').matches
    ) {
      const mySiemaTablet = new Siema({
        selector: list,
        duration: 200,
        perPage: 2,
      });
      slidePrev.addEventListener('click', () => mySiemaTablet.prev());
      slideNext.addEventListener('click', () => mySiemaTablet.next());
      window.addEventListener(
        'resize',
        throttle(() => {
          if (window.matchMedia('(max-width: 767px)').matches) {
            mySiemaTablet.perPage = 1;
            mySiemaTablet.loop = true;
            mySiemaTablet.config.perPage = 1;
            mySiemaTablet.config.loop = true;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiemaTablet.perPage = 4;
            mySiemaTablet.loop = false;
            mySiemaTablet.config.perPage = 4;
            mySiemaTablet.config.loop = false;
          } else if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiemaTablet.perPage = 2;
            mySiemaTablet.loop = false;
            mySiemaTablet.config.perPage = 2;
            mySiemaTablet.config.loop = false;
          }
        }, 300),
      );
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
      const mySiemaPC = new Siema({
        selector: list,
        duration: 200,
        perPage: 4,
      });
      slidePrev.addEventListener('click', () => mySiemaPC.prev());
      slideNext.addEventListener('click', () => mySiemaPC.next());
      window.addEventListener(
        'resize',
        throttle(() => {
          if (window.matchMedia('(max-width: 767px)').matches) {
            mySiemaPC.perPage = 1;
            mySiemaPC.loop = true;
            mySiemaPC.config.perPage = 1;
            mySiemaPC.config.loop = true;
          } else if (
            window.matchMedia('(min-width: 768px)').matches &&
            window.matchMedia('(max-width: 1279px)').matches
          ) {
            mySiemaPC.perPage = 2;
            mySiemaPC.loop = false;
            mySiemaPC.config.perPage = 2;
            mySiemaPC.config.loop = false;
          } else if (window.matchMedia('(min-width: 1280px)').matches) {
            mySiemaPC.perPage = 4;
            mySiemaPC.loop = false;
            mySiemaPC.config.perPage = 4;
            mySiemaPC.config.loop = false;
          }
        }, 300),
      );
    }
    const ulX = document.querySelector(`.${word}-list`);
    showItemModal(ulX);
  }
}
