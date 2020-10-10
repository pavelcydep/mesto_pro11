class Cardlist { // CardList
	constructor(container,renderCard,api) {
		this.container = container;
		this.renderCard = renderCard;
		this.api = api;
		// Можно лучше: удалить initialCards, так как он не используется
	}

	//"приписка" карточки к контейнеру placesList
	addCard(cardElement) {
		this.container.appendChild(cardElement);
	}

	//отрисовка карточек на странице
	
	
		render() {
			this.api.getCards().then((res)=>{
				res.forEach(item => {
				this.addCard(this.renderCard(item.name, item.link))
			});
		});
		}
     
		
		

			//вызов методов поставить like и удалить карточку
			

		
		
    }                        
		

				
				
			
		         
	 

			
			
		
	
