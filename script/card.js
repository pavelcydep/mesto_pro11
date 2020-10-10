class Card {
	constructor(name, link, imageAdd) {
		this.name = name;
		this.link = link;
		this.imageAdd = imageAdd;
	}

	//создание dom-элемента карточки
	marcinCard() { // Можно лучше: дать более семантичное название методу, например, createCard

		const placeCard = document.createElement('div');
		placeCard.classList.add('place-card');

		const cardImage = document.createElement('div');
		placeCard.appendChild(cardImage);
		cardImage.classList.add('place-card__image');
		cardImage.setAttribute('style', `background-image:url(${this.link})`);


		const buttonDelete = document.createElement('button');
		cardImage.appendChild(buttonDelete);
		buttonDelete.classList.add('place-card__delete-icon');

		const cardDescription = document.createElement('div');
		placeCard.appendChild(cardDescription);
		cardDescription.classList.add('place-card__description');

		const cardName = document.createElement('h3');
		cardDescription.appendChild(cardName);
		cardName.classList.add('place-card__name');
		cardName.textContent = this.name;

		const buttonLike = document.createElement('button');
		cardDescription.appendChild(buttonLike);
		buttonLike.classList.add('place-card__like-icon');

		this.cardElement = placeCard;

		return placeCard;
	}

	//вешаем обработчики лайка и удаления карточки на кнопки
	setEventListeners() {
		this
			.cardElement
			.querySelector('.place-card__like-icon')
			.addEventListener('click', this.like);

		this
			.cardElement
			.querySelector('.place-card__delete-icon')
			.addEventListener('click', this.remove.bind(this));

		this.cardElement.addEventListener("click", this.imageAdd);
	}

	like(event) {
		event.stopPropagation();
		event.target.classList.toggle('place-card__like-icon_liked');
	}


	remove(event) {
		event.stopPropagation();
		this.cardElement.remove();
	}
}
