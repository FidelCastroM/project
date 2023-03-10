const listForValidation = ({
    formPopup: '.popup__form',
    formSection: '.popup__section',
    inputPopup: '.popup__input',
    spanPopup: '.popup__input-error',
    inputPopupErrorLine: 'popup__input_type-error',
    spanPopupActive: 'popup__input-error_active',
    buttonPopup: '.popup__button',
    buttonPopupInactive: 'popup__button_inactive'
});

const showError = (formPopup, inputPopup, errorMessage) => {
    const formError = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classlist.add(inputPopupErrorLine);
    formError.textContent = errorMessage;
    formError.classlist.add(spanPopupActive);
};

const hideError = (inputPopup) => {
    inputPopup.classlist.remove(inputPopupErrorLine);
};

const checkInputValidity = () => {
    if (!inputPopup.validity.valid) {
        showError(inputPopup, inputPopup.validationMessage);
    } else {
        hideError(inputPopup);
    }
};

formPopup.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

inputPopup.addEventListener('inputPopup', function () {
    checkInputValidity();
});