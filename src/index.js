import Api from './Api.js';
import Cardlist from './Cardlist.js';
import FormValidator from './formValidator.js';
import Popup from './popup.js';
import UserInfo from './userInfo.js';
import Card from './card.js';
import  './pages/index.css';


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
     }
  ];
 

const formAddCard = document.forms.new;
const formProfil = document.forms.user; // formProfile
const inputUs = formProfil.elements.name;
const inputLi = formProfil.elements.link;
const logo = document.querySelector('.logo');
// Можно лучше: использовать или удалить неиспользуемую переменную
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const placesList = document.querySelector('.places-list');

const cards = [];
const popup = document.querySelector('.popup');
const popupImg = document.querySelector('.popup__close');
const popupImgEdit = document.querySelector('.popup-edit__close');
const popupEdit = document.querySelector('.popup-edit');
const popupButton = document.querySelector('.user-info__button_add');
const popupButtonEdit = document.querySelector('.user-info__button_edit');
const placeCardImage = document.querySelector('.place-card__image'); // Можно лучше: использовать или удалить неиспользуемую переменную
const imagePopup = document.querySelector('.popup-image');
const imageContent = document.querySelector('.popup-image__content');
const closeImageButton = document.querySelector('.popup__close-image');
const popupFormAdd = document.querySelector('.popup__form'); // Можно лучше: использовать или удалить неиспользуемую переменную
const postBtn = document.querySelector('.popup__button');
const serverUrl = NODE_ENV === 'development' ? 'http://nomoreparties.co' : 'https://nomoreparties.co';
const api = new Api({
    url:serverUrl ,
    token:'039c48d9-9447-48a5-823a-6960817e2381'}
    );



/*
	Можно лучше: запрос карточек делается в классе Cardlist
	Получается этот запрос не нужен
*/
api.getCards();


//-------------------


//создание экземпляра класса Cardlist
const cardList = new Cardlist(placesList, renderCard, api);

//вызов метода отрисовки карточек
cardList.render();


//----------------------
const newCardFormPopup = new Popup(popup, "popup_is-opened", popupImg, );

// Открыть попап добавления карточки
popupButton.addEventListener("click", (event) => {
	sendFormAdd.errorReset();

	formAddCard.reset();
	newCardFormPopup.open();
});

const newCardFormEditPopup = new Popup(popupEdit, "popup-edit_is-opened", popupImgEdit);


// Открыть попап добавления карточки
popupButtonEdit.addEventListener("click", (event) => {
	// Лучше перенести вызов errorReset сюда
	formProfil.reset();
	newCardFormEditPopup.open();

});

const newCardImagePopup = new Popup(imagePopup, "popup-image_is-opened", closeImageButton);

// Открыть попап добавления карточки
function imageAdd(event) {
	imageContent.style = event.target.getAttribute('style');
	event.stopPropagation();
	newCardImagePopup.open();
}


const userInfo = new UserInfo(userName, userJob, logo);
api.getProfile()
	.then((res) => {
		userInfo.updateUserServer(res.name, res.about, res.avatar);
		console.log(res);
	})
	.catch(err => console.log(err));


//----------------------------------------

function formSubmitCallback() {
	api.patchProfile(inputUs, inputLi)
		.then((res) => {
			userInfo.updateUser(res.inputUs, res.inputLi);
			newCardFormEditPopup.close();
			console.log(res);
		})
		.catch(err => console.log(err));
}


formProfil.addEventListener("submit", (evt) => {
	evt.preventDefault();
	formSubmitCallback(evt);
});


function addNewCard(event) {
	event.preventDefault();
	const titleCard = formAddCard.elements.name;
	const linkImage = formAddCard.elements.link;
	const cardAdd = new Card(titleCard.value, linkImage.value, imageAdd);
	const cardElement = cardAdd.marcinCard();
	cardList.addCard(cardElement);
	cardAdd.setEventListeners();
}

formAddCard.addEventListener("submit", (evt) => {
	addNewCard(evt);
	formAddCard.reset();
	newCardFormPopup.close();

});

function renderCard(name, link) {
	const card = new Card(name, link, imageAdd);
	const cardElement = card.marcinCard();
	card.setEventListeners();
	return cardElement;
}


//СБРОС ОШИБОК ВАЛИДАЦИИ


const sendFormAdd = new FormValidator(formAddCard);
sendFormAdd.setEventListeners();
sendFormAdd.errorReset();
const sendFormProfil = new FormValidator(formProfil); //sendFormProfile
sendFormProfil.setEventListeners();

/*
	Хорошая работа, класс Api создан и запросы выполняются, но есть несколько замечаний
	которые нужно исправить:

	+- передавать в конструктор Api только базовый адрес сервера  и не создавать 
	его экземпляр для каждого запроса

	+- не хардкодить ключ авторизации в каждом методе Api

	+- если запрос завершился с ошибкой, должен быть возвращен отклоненный промис

	+- попап так же нужно закрывать только если сервер ответил подтверждением
*/

/*
  Работа принята, но есть несколько мест над которыми стоит поработать:
  - в классе Api метод  _getResponseData используется неверно
  в этом методе уже есть проверка ответа, не нужно делать её ещё раз

  - в main.js вызывается лишний запрос api.getCards()
  
  - удалите лишние папки "Новая папка" из проекта

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после получения с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserData(),
      api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/