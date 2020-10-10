class FormValidator {
	constructor(formV) {
		this.formV = formV;
		this.setEventListeners = this.setEventListeners.bind(this);
	}

	checkInputValidity(inputElement, errorMessageElement) {
		if (inputElement.value.length === 0) {
			errorMessageElement.textContent = 'Это обязательное поле';
			return false;
		} else if (inputElement.value.length < 2 || inputElement.value.length > 30) {
			errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
			return false;
		} else if (inputElement.type === 'url') {
			errorMessageElement.textContent = 'Здесь должна быть ссылка';
			return false;
		} else {
			errorMessageElement.textContent = '';
			return true;
		}
	}

	setSubmitButtonState(valid) {
		/**
		 * Можно лучше:
		 * Перенести поиск кнопки в конструктор, чтобы не искать ее каждый раз заново
		 */
		const button = this.formV.querySelector('button');
		if (!valid) {
			button.setAttribute('disabled', true);
			button.classList.remove('popup__button_valid');

		}
		if (valid) {
			/**
			 * Можно лучше:
			 * removeAttribute имеет один параметр:
			 * button.removeAttribute('disabled');
			 */
			button.removeAttribute('disabled', true);
			button.classList.add('popup__button_valid');
		}
	}
	isFieldValid(input) {
		const errorElem = input.parentNode.querySelector(`#${input.id}-error`); // Лучше использовать this.formV вместо parentNode
		const valid = this.checkInputValidity(input, errorElem);


		return valid;
	}
	setEventListeners() {
		/**
		 * Можно лучше:
		 * Перенести поиск inputs в конструктор, чтобы не искать ее каждый раз заново
		 */
		const inputs = [...this.formV.querySelectorAll('input')];

		this.formV.addEventListener('input', (event) => {
			const inputForValidation = event.target;
			this.isFieldValid(inputForValidation);
			if (inputs.every((input) => input.validity.valid)) {
				this.setSubmitButtonState(true);
			} else {
				this.setSubmitButtonState(false);
			}
		});
	}
	errorReset() {
		const errorMessages = this.formV.querySelectorAll(".error");
		errorMessages.forEach((elem) => {
			elem.textContent = "";
		});
	}
}