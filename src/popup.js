export default class Popup {
	constructor(element, openClassName, closeElement) {
		this.element = element;
		this.openClassName = openClassName;
		/**
		 * Можно лучше:
		 * this.element.querySelector('.popup__close').addEventListener("click", () => this.close());
		 * Тогда не придется искать крестик самостоятельно для каждого попапа.
		 */
		closeElement.addEventListener("click", () => this.close());
	}

	open() {
		this.element.classList.add(this.openClassName);
	}

	close() {
		this.element.classList.remove(this.openClassName);
	}
}


