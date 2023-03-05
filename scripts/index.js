// Попапы по id
const edit = document.querySelector('#edit');
const add = document.querySelector('#add');
const popupImage = document.querySelector('#popup-image');

// Основной класс попапов
const popup = document.querySelectorAll('.popup');

// Форма и поля формы редактирования профиля
const formEdit = document.querySelector('#form-edit');
const nameInput = document.querySelector('.popup__input_key_name');
const jobInput = document.querySelector('.popup__input_key_about-me');

// Значок редактирования профиля
const profileEdit = document.querySelector('.profile__edit');

// Информация о пользователе
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

// Форма и поля формы добавления новой карточки
const formAdd = document.querySelector('#form-add');
const nameCard = document.querySelector('.popup__input_denomination');
const imageCard = document.querySelector('.popup__input_link-to-image');

//Переменные для клавиши добавления карточки
const addInput = document.querySelector('.profile__add');

// Переменные для карточек
const elements = document.querySelector('.elements');
const template = document.querySelector('#template');

// Переменные попапа увеличение изображения
const popupImagePicture = document.querySelector('.popup__picture');
const popupImageText = document.querySelector('.popup__figcaption');

// Общая функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Крестик закрытия попапов
const closePopupButtons = document.querySelectorAll('.popup__close');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closePopupButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

// Открытие попапа редактирования профиля
function openPopupEdit() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAboutMe.textContent;
    openPopup(edit);
}

profileEdit.addEventListener('click', openPopupEdit);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function saveEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    closePopup(edit);

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', saveEdit);

// Массив с ссылками и названиями для карточек
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
    }
];

// Добавление элементов массива в карточки
const addElementCard = (cards) => {
    const newElementCard = template.content.cloneNode(true);
    const newTitle = newElementCard.querySelector('.element__landscape'); // Добавили название
    const newImage = newElementCard.querySelector('.element__image'); // Добавили картинку
    newTitle.textContent = cards.name;
    newImage.src = cards.link;

    // Ставим лайк карточке
    const cardLike = newElementCard.querySelector('.element__like');
    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('element__like_active');
    });

    const deleteCard = newElementCard.querySelector('.element__basket');
    const cardButtonDelete = (evt) => {
        evt.target.closest('.element').remove();
    }

    deleteCard.addEventListener('click', cardButtonDelete);
    cardLike.addEventListener('click', cardLike);

    newImage.addEventListener('click', () => {
        popupImagePicture.src = cards.link;
        popupImagePicture.alt = cards.name;
        popupImageText.textContent = cards.name;
        openPopupImage();
    });

    return newElementCard;
};

// Добавление карточки
const renderElementCard = (wrap, cards) => {
    wrap.prepend(addElementCard(cards));
};

// Вставика элементов массива в карточку
initialCards.forEach((cards) => {
    renderElementCard(elements, cards);
});

formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cards = { name: nameCard.value, link: imageCard.value };

    renderElementCard(elements, cards);
    closePopup(add);
    evt.target.reset();
});

// Открываем попав увеличенной фотографии и добавляем картинку и название    
function openPopupImage() {
    openPopup(popupImage);
}

// Открытие попапа добавления картинки
function openPopupAdd(evt) {
    evt.preventDefault();
    openPopup(add);
}

addInput.addEventListener('click', openPopupAdd);

// Здесь не могу разобраться
function saveAdd(cards) {
    nameCard.textContent = cards.name;
    imageCard.src = cards.link;
    imageCard.alt = cards.name;
    closePopup(add);
}

formAdd.addEventListener('submit', saveAdd);