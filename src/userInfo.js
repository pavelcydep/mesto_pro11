export default class UserInfo {
	constructor(nameContainer,jobContainer,logoContainer) {
		this.nameContainer = nameContainer;
	this.logoContainer = logoContainer;
this.jobContainer = jobContainer;
    
	}


	updateUserInfo(inputOne, inputTwo) { // Можно лучше: дать более семантичные имена переменным
		this.nameContainer.textContent = inputOne.value;
		this.jobContainer.textContent = inputTwo.value;

	}
	updateUserServer(name,about,avatar) { 
   
    this.nameContainer.textContent = name;
		this.jobContainer.textContent = about;
      this.logoContainer.style.backgroundimage = 'url(${avatar})';
  }
    
	updateUser(name,about) { 
   
  
    this.nameContainer.textContent = name;
		this.jobContainer.textContent = about;
      
	}

	

}