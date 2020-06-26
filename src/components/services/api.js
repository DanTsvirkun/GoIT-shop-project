import axios from 'axios'
import data from './data'

const apiKey = 'AIzaSyCmN93oWbbIjStR6IIQAEvdec9qcNLRA_E'

// Название категорий:  
// realEstate --- Недвижимость,
// transport --- Транспорт,
// jobs --- работа,
// tech --- Электроника,
// business --- Бизнес и услуги,
// activities --- Отдых и спорт,
// forFree --- Отдам бесплатно,
// barter --- Обмен

export const api = {
  // Запрос для категорий. Нужно передать название категории как аргумент. 
  getCategory(category) {
    if (data[category]) {
      if (data[category].length > 0) {
        return new Promise((resolve) => {
          resolve(data[category])
        })
      }
      return axios.get(`https://project-88172.firebaseio.com/olx/categories/${category}.json`).then((res) => {

        const result = this.transformCategory(res.data)
        data[category] = [...result]
        return result
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return new Promise((res, rej) => {
        rej('not category')
      })
    }
  },

  // Поиск всех категорий. Метод нужен для поиска одного или нескольких товаров.
  // ----! Принимает значение инпута.
  searchGoods(searchWord) {
    if (searchWord) {
      if (data.allCategories.length > 0) {
        return new Promise((resolve) => {
          resolve(this.filterWords(searchWord))
        })
      }
      return axios.get('https://project-88172.firebaseio.com/olx/categories.json').then((res) => {
        this.transformAllCategories(res.data)
        const result = this.filterWords(searchWord)
        return result
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return new Promise((res, rej) => {
        rej('not valid request')
      })
    }
  },
  transformCategory(keys) {
    const data = Object.keys(keys).map(id => {
      return {
        id,
        ...keys[id]
      }
    })
    return data
  },
  transformAllCategories(values) {
    const allObjects = Object.values(values)
    const arrayObjects = allObjects.flatMap(item => {
      const transform = this.transformCategory(item)
      return transform
    })
    const randomArray = this.shuffleGoods(arrayObjects)
    data.allCategories = [...randomArray]

    return randomArray

  },
  filterWords(searchWord) {
    searchWord.toLowerCase()
    const filteredArray = data.allCategories.filter((item) => {
      return item.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    return filteredArray
  },
  // Метод для поиска по  id  ----! принимает id как аргумент
  //   searchId(id) {
  //     const res = data.allCategories.find((item) =>
  //       item.id === id
  //     )
  //   },
  searchId(id) {
    if (id) {
      return new Promise((res, rej) => {
        const objId = data.allCategories.find((item) =>
          item.id === id
        )
        res(objId)
      })
    } else {
      return new Promise((res, rej) => {
        rej('there is not such id')
      })
    }
  },
  // Метод для отправки объявления ----! Принимает два аргумента (название категории, объект)
  postAdv(category, obj) {
    return axios.post(`https://project-88172.firebaseio.com/olx/categories/${category}.json`, obj).then((res) => {
      data.allCategories = [...data.allCategories, {
        ...obj,
        id: res.data.name
      }]
      data[category] = [...data[category], {
        ...obj,
        id: res.data.name
      }]
      return res.data
    }).catch((err) => console.log(err))
  },
  //    Метод для получение всех товаров. Все товары приходят радномно при вызове метода. 
  // Метод нужен для рекламы или популярных товаров.
  //  Например можно брать первые первые 6 для популярных товаров и
  // при каждой загрузке страницы они будут разные.
  getAllGoods() {
    if (data.allCategories.length > 0) {
      return new Promise((resolve) => {
        resolve(data.allCategories)
      })
    }
    return axios.get('https://project-88172.firebaseio.com/olx/categories.json').then((res) => {
      const arrayObjects = this.transformAllCategories(res.data)

      return arrayObjects
    }).catch((err) => console.log(err))
  },
  shuffleGoods(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  setFavorites(id) {
    const user = JSON.parse(localStorage.getItem('user-info'))
    //   function(id)
    // запрос на сервер конкретного юзера если он есть, но влюбом случае записываем id  в локал сторейдж
    localStorage.setItem('user-info', JSON.stringify({
      ...user,
      favorites: [...user.favorites, id]
    }))
  },
  getFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem('user')).favorites
    return favorites.includes(id)
  }
}
// api.getAllGoods()


localStorage.setItem('user-info', JSON.stringify({
  email: 'Alxe@asdlasd.com',
  token: 'asdasgkk4444',
  favorites: ['ggjjkkj4j4214124mdmfg', 'ifi124u12uo2428fhj', '129412094jsf']
}))
// api.setFavorites('fkkgkgakkgakgakg')

console.log(api.getFavorites("lkglgklkl"));
