const listForValidation = ({
    formPopup: '.popup__form',
    formSection: '.popup__fieldset',
    inputPopup: '.popup__input',
    inputPopupErrorLine: 'popup__input_type-error',
    spanPopupActive: 'popup__input-error_active',
    buttonPopup: '.popup__button',
    buttonPopupInactive: 'popup__button_inactive',
});


const showInputError = (formPopup, inputPopup, errorMessage, config) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.add(config.inputPopupErrorLine);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.spanPopupActive);
};


const hideInputError = (formPopup, inputPopup, config) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.remove(config.inputPopupErrorLine);
    errorElement.textContent = '';
    errorElement.classList.remove(config.spanPopupActive);
};


const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.buttonPopupInactive);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(config.buttonPopupInactive);
        buttonElement.removeAttribute('disabled');
    }
};


const checkInputValidity = (formPopup, inputPopup, config) => {
    if (!inputPopup.validity.valid) {
        showInputError(formPopup, inputPopup, inputPopup.validationMessage, config);
    } else {
        hideInputError(formPopup, inputPopup, config);
    }
};


const setEventListeners = (formPopup, config) => {
    const inputList = Array.from(formPopup.querySelectorAll(config.inputPopup));
    const buttonElement = formPopup.querySelector(config.buttonPopup);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputPopup) => {
        inputPopup.addEventListener('input', function () {
            checkInputValidity(formPopup, inputPopup, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputPopup) => {
        return !inputPopup.validity.valid;
    })
};


const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formPopup));
    formList.forEach((formPopup) => {
        formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const sectionList = Array.from(formPopup.querySelectorAll(config.formSection));
        sectionList.forEach((section) => {
            setEventListeners(section, config);
        });
    });
};
enableValidation(listForValidation);