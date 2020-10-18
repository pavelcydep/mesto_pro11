export default class Api {
	constructor(config) {
		this.url = config.url;
		this.token = config.token;
	}

	getCards() {
		return fetch(`${this.url}/cohort12/cards`, {
				method: 'GET',
				headers: {
					authorization: this.token
				}
			})
			/*
			  Можно лучше: _getResponseData используется неверно 
			  Должно быть так:

			  return fetch(`${this.url}/cohort12/cards`, {
					method: 'GET',
					headers: {
						authorization: this.token
					}
				})
				.then(this._getResponseData)

			*/
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				this._getResponseData(res);
			})
	}

	getProfile() {
		return fetch(`${this.url}/cohort12/users/me`, {
				method: 'GET',
				headers: {
					authorization: this.token
				}
			})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				this._getResponseData(res);
			})
	}
	patchProfile(name, about) {
		return fetch(`${this.url}/cohort12/users/me`, {
				method: 'PATCH',
				headers: {
					authorization: this.token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name.value,
					about: about.value
				})
			})
			.then((res) => {
				if (res.ok) {
					return res.json()
				}

				this._getResponseData(res);
			})

	}
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
}