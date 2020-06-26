
import './adv-styles.css'

const refs = {
  button: document.querySelector('.modal-btn'),  
  allModal: document.querySelector('.adv-modal-main'),
}

// console.log(refs.allModal)

refs.button.addEventListener('click', showModal);
refs.allModal.addEventListener('click', closeModall)

const markupModal = () => {
  return `
  
  <div class="adv-modal__overlay" data-close="true">
 <div class="adv-modal">

   <button type="button" class="adv-modal__close-btn" data-close="true"></button>

     <h2 class="adv-modal__form--title">
       Создать объявление
     </h2>
         
   <form class="adv-modal__form" name="advForm">

     <p class="adv-modal__product-name-title">Название товара</p>
     <input type="text" name="productName" class="adv-modal__product-name input" id=""
      data-source="name" placeholder="  Название товара">

     <ul class="adv-modal__product-photos">
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="1" data-active="true" name="" id="fp1">
         <label class="input-label choose-this" for="fp1"><img src="" class="input-label__img input-label__img--1" width="75" height="58" alt=""></label>
       </li>
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="2" data-active="" name="" id="fp2">
         <label class="input-label" for="fp2"><img src="" class="input-label__img input-label__img--2" width="75" height="58" alt=""></label>
       </li>
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="3" data-active="" name="" id="fp3">
         <label class="input-label" for="fp3"><img src="" class="input-label__img input-label__img--3" width="75" height="58" alt=""></label>
       </li>
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="4" data-active="" name="" id="fp4">
         <label class="input-label" for="fp4"><img src="" class="input-label__img input-label__img--4" width="75" height="58" alt=""></label>
       </li>
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="5" data-active="" name="" id="fp5">
         <label class="input-label" for="fp5"><img src="" class="input-label__img input-label__img--5" width="75" height="58" alt=""></label>
       </li>
       <li class="adv-modal__product-photos-item">
         <input class="photo-input" data-id="6" data-active="" name="" id="fp6">
         <label class="input-label" for="fp6"><img src="" class="input-label__img input-label__img--6" width="75" height="58" alt=""></label>
       </li>
     </ul>

     <p class="adv-modal__product-description-title">Описание</p>
     <textarea name="productDescription" data-source="description" class="adv-modal__product-description input" id="" cols="30" rows="10"
       placeholder="  Описание товара"></textarea>
     
     <p class="adv-modal__product-select-title">Категория</p>
     <select name="productCategory" class="adv-modal__product-select input" id="">
       <option value="category" class="select-option" selected>Категория</option>
       <option value="property" class="select-option">Недвижимость</option>
       <option value="transport" class="select-option">Транспорт</option>
       <option value="work" class="select-option">Работа</option>
       <option value="electronics" class="select-option">Электроника</option>
       <option value="business-and-services" class="select-option">Бизнес и услуги</option>
       <option value="recreation-and-sports" class="select-option">Отдых и спорт</option>
       <option value="for-free" class="select-option">Отдам бесплатно</option>
       <option value="exchange" class="select-option">Обмен</option>
     </select>

     <p class="adv-modal__product-price-title">Цена</p>
     <input type="text" name="productPrice" data-source="price" class="adv-modal__product-price input" id="" placeholder="  0.00 грн">

     <p class="adv-modal__product-telephone-number-title">Телефон</p>
     <input type="tel" name="productPhone" data-source="phone" class="adv-modal__product-telephone-number input" id=""
       placeholder="  +38 (0--) --- -- --">

     <button type="submit" class="add-product-btn" data-close="">Добавить</button>

   </form>
 </div>
</div>

  `
}

const addMarkupModal = markupModal();

let  imgLoaderArea;
let advForm;
let productImage;
let createData;
let category;

function showModal(){
  refs.allModal.insertAdjacentHTML("beforeend", addMarkupModal);
  imgLoaderArea = document.querySelector('.adv-modal__product-photos');
  imgLoaderArea.addEventListener('change', previewImg);  
   
  advForm = document.forms.advForm;
  advForm.addEventListener('change', saveData);
  advForm.addEventListener('submit', loadImages);
  imgLoaderArea.addEventListener('click', chooseImgBlock)
}

function saveData(event){

  const productName = event.currentTarget.elements.productName;
  const productDescription = event.currentTarget.elements.productDescription;
  const productPrice = event.currentTarget.elements.productPrice;
  const productPhone = event.currentTarget.elements.productPhone;
  const productCategory = event.currentTarget.elements.productCategory;  

  createData = {
   name: productName.value,
   image: [],
   category: productCategory.value,
   description: productDescription.value,
   price: productPrice.value,
   phone: productPhone.value,
 }
}

function chooseImgBlock(event){ 
  if(event.target === event.currentTarget){
    return ;
  }
  if(!event.target.dataset.active){
    return;  
  }  
 
  const imgTarget = event.target;
  imgTarget.nextElementSibling.classList.remove('choose-this');
  let imgId = Number(event.target.dataset.id);  
  imgTarget.setAttribute("type", "file");
  imgId += 1;  

  if(imgId > 6){
    return;
  }  

  const nextImg = document.querySelector(`[data-id="${imgId}"]`);
  nextImg.dataset.active = true;
  nextImg.nextElementSibling.classList.add('choose-this');
  console.log(nextImg);
}

function loadImages(event){
  event.preventDefault();
  let allImg = event.currentTarget.querySelectorAll('img');
  allImg = Array.from(allImg);
  
  const allImgArr = allImg.filter(item => {  
  const src = item.dataset.img;
  return src;
    
  }).map(item => item.src);  
  createData.image = allImgArr;  
  
  console.log('createData: ', createData);
  advForm.reset();
}

function closeModall(event){  
  if(event.target.dataset.close){    
    refs.allModal.innerHTML = '';

  }
}

function previewImg (event){
  if(event.target === event.currentTarget){
    return;
  }
  if(event.target.dataset.id){
    const file = event.target.files[0];

    const inputID = event.target.dataset.id;  
    const img = document.querySelector(`.input-label__img--${inputID}`);  
    const reader = new FileReader();
    
    reader.onloadend = () => {
      img.src = reader.result;
      productImage = reader.result;
      img.setAttribute('data-img', productImage);   
    }
  
    if(file){
      reader.readAsDataURL(file);
    } else {
      img.src = "";
    }
  }  
}

























