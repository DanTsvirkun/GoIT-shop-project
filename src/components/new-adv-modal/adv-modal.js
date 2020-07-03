import {api} from '../services/api'
import { modalBackDrop } from '../modal-window/logic-modal.js';
import '../modal-window/styles.css';
import './adv-styles.css';

const refs = {  
  button: document.querySelectorAll('.modal-btn'),
};

refs.button.forEach(item => item.addEventListener('click', createModal));

const markupModal = `

  <div class="adv-modal">

    <button type="button" class="adv-modal__close-btn" data-close="true"></button>

    <h2 class="adv-modal__form--title">
      Создать объявление
    </h2>

    <form class="adv-modal__form" name="advForm">
      <div>
        <div class="input-wrapper">
          <p class="adv-modal__product-name-title">Название товара</p>
          <input type="text" name="productName" class="adv-modal__product-name input" data-source="name"
            autocomplete="off" minlength="6" maxlength="60" placeholder="Название товара" required>
        </div>

        <div class="input-wrapper">
          <p class="adv-modal__product-photos-title">Фото</p>
          <ul class="adv-modal__product-photos">
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="1" data-active="true" id="fp1">
              <label class="input-label choose-this" for="fp1"><img src="" class="input-label__img input-label__img--1"
                  width="75" height="58" alt=""></label>
            </li>
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="2" data-active="" id="fp2">
              <label class="input-label" for="fp2"><img src="" class="input-label__img input-label__img--2" width="75"
                  height="58" alt=""></label>
            </li>
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="3" data-active="" id="fp3">
              <label class="input-label" for="fp3"><img src="" class="input-label__img input-label__img--3" width="75"
                  height="58" alt=""></label>
            </li>
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="4" data-active="" id="fp4">
              <label class="input-label" for="fp4"><img src="" class="input-label__img input-label__img--4" width="75"
                  height="58" alt=""></label>
            </li>
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="5" data-active="" id="fp5">
              <label class="input-label" for="fp5"><img src="" class="input-label__img input-label__img--5" width="75"
                  height="58" alt=""></label>
            </li>
            <li class="adv-modal__product-photos-item">
              <input class="photo-input" data-id="6" data-active="" id="fp6">
              <label class="input-label" for="fp6"><img src="" class="input-label__img input-label__img--6" width="75"
                  height="58" alt=""></label>
            </li>
          </ul>
        </div>

        <div class="input-wrapper">
          <p class="adv-modal__product-description-title">Описание</p>
          <textarea name="productDescription" data-source="description" class="adv-modal__product-description input"
          maxlength="1000" placeholder="Описание товара"></textarea>
        </div>

        <div class="input-wrapper">
          <p class="adv-modal__product-select-title">Категория</p>
          <div class="select">
            <select name="productCategory" class="adv-modal__product-select input" id="">
              <option value="category" class="select-option select-option-hiden" selected disabled>Категория</option>
              <option value="property" class="select-option">Недвижимость</option>
              <option value="transport" class="select-option">Транспорт</option>
              <option value="work" class="select-option">Работа</option>
              <option value="electronics" class="select-option">Электроника</option>
              <option value="business-and-services" class="select-option">Бизнес и услуги</option>
              <option value="recreation-and-sports" class="select-option">Отдых и спорт</option>
              <option value="for-free" class="select-option">Отдам бесплатно</option>
              <option value="exchange" class="select-option">Обмен</option>
            </select>
          </div>
        </div>

        <div class="input-wrapper input-wrapper__price">
          <p class="adv-modal__product-price-title">Цена</p>
          <input type="number" name="productPrice" data-source="price" class="adv-modal__product-price input"
            autocomplete="off" maxlength="16" placeholder="0.00 грн">
        </div>
        
      </div>
      <button type="submit" class="add-product-btn" data-close="">Добавить</button>

    </form>
  </div>

  `;

let imgLoaderArea;
let advForm;
let productImage;
let createData;
let category;

function createModal() {
  const closeModal = modalBackDrop(markupModal);
  const closeBtn = document.querySelector('.adv-modal__close-btn');
  closeBtn.addEventListener('click', closeModal);
  imgLoaderArea = document.querySelector('.adv-modal__product-photos');  

  advForm = document.forms.advForm;
  advForm.addEventListener('change', saveData);
  advForm.addEventListener('submit', submitForm);

  imgLoaderArea.addEventListener('click', chooseImgBlock);
  imgLoaderArea.addEventListener('change', previewImg);
}

function saveData(event){ 
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const productName = event.currentTarget.elements.productName;
  const productDescription = event.currentTarget.elements.productDescription;
  const productPrice = event.currentTarget.elements.productPrice;  
  const productCategory = event.currentTarget.elements.productCategory; 

  createData = {
   author: userInfo.userId,
   name: productName.value,
   mainImg: '',
   image: [],
   category: productCategory.value === 'category'? '' : productCategory.value,
   description: productDescription.value,
   price: productPrice.value,  
 }

  const productPriceWrap = document.querySelector('.input-wrapper__price');  

 event.target.value === 'for-free' ? productPriceWrap.classList.add('hide-price') : productPriceWrap.classList.remove('hide-price');
 event.target.value === 'for-free' ? productPriceWrap.classList.remove('input-wrapper') : productPriceWrap.classList.add('input-wrapper'); 
}  

//==================================
function chooseImgBlock(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  if (!event.target.dataset.active) {
    return;
  }
  
  const imgTarget = event.target;
  imgTarget.setAttribute('type', 'file'); 
}
//====================================
function submitForm(event){
  event.preventDefault();
  if (createData.category === '') {
    return;
  }

  let allImg = event.currentTarget.querySelectorAll('img');
  allImg = Array.from(allImg);
  
  const allImgArr = allImg.filter(item => {  
  const src = item.dataset.img;
  return src;
    
  }).map(item => item.src);
 
  createData.image = allImgArr;
  createData.mainImg = allImgArr[0];

  function clearImages (arr){   
    arr.map(item =>     
      item.src = ""     
    )     
  }

  let allLabelArr = document.querySelectorAll('.input-label');
  allLabelArr = Array.from(allLabelArr);

  function returnMarkToStart(arr){
    arr.filter(item => 
      item.classList.contains("choose-this")
    ).map(item => item.classList.remove('choose-this'));
    allLabelArr[0].classList.add('choose-this')
  }

  let allPhotoInputs = document.querySelectorAll('.photo-input');
  allPhotoInputs = Array.from(allPhotoInputs);

  function removeInputFile(arr){
    arr.filter(item => item.attributes.type)
    .map(item => item.removeAttribute('type'));

    arr.filter(item => item.dataset.active)
    .map(item => item.dataset.active = "");
    arr[0].dataset.active = true;
  }    
  
  //===============================================
  api.postAdv(createData.category, createData)
  .then(data => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const idAdv = data.name; 
    console.log(idAdv);  
    localStorage.setItem(
      'user-info',
      JSON.stringify({
        ...user,
        adv: [...user.adv, idAdv],
      }),
    );
  })
  //===============================================

  advForm.reset();
  clearImages(allImg);
  returnMarkToStart(allLabelArr);
  removeInputFile(allPhotoInputs);
  
  console.log(createData)
}
//=================================
function previewImg (event){
 
  if(event.target === event.currentTarget){
    return;
  }
 
  changeImgBlock(event);
  
  if (event.target.dataset.id) {
    const file = event.target.files[0];

    const inputID = event.target.dataset.id;
    const img = document.querySelector(`.input-label__img--${inputID}`);
    const reader = new FileReader();    
   
    reader.onloadend = () => {     
      img.src = reader.result;
      productImage = reader.result;
      img.setAttribute('data-img', productImage);
    };

    if (file) {
      reader.readAsDataURL(file);      
    } else {
      img.src = '';
    }      
  }   
}

//======================

function changeImgBlock (event){ 
  const imgTarget = event.target;
  imgTarget.nextElementSibling.classList.remove('choose-this');
  let imgId = Number(event.target.dataset.id);
  
  imgId += 1;   
  
  if (imgId > 6) {
    return;
  }

  const nextImg = document.querySelector(`[data-id="${imgId}"]`);
  nextImg.dataset.active = true; 
  nextImg.nextElementSibling.classList.add('choose-this'); 
}