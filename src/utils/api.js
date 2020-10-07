class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Err: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserInfo),
    }).then(this._checkServerResponse);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkServerResponse);
  }

  addCard(newCardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCardInfo),
    }).then(this._checkServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  editCardLikes({ cardWasLiked, cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: cardWasLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  registerUser(userInfo) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then(this._checkServerResponse);
  }

  loginUser(userInfo) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then(this._checkServerResponse);
  }

  checkUserValidity() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkServerResponse);
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-1',
  headers: {
    authorization: 'b5addf89-e4e2-4334-ba86-da0986124fda',
    'Content-Type': 'application/json',
  },
});

const authenticationApi = new Api({
  baseUrl: 'https://register.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, authenticationApi };
