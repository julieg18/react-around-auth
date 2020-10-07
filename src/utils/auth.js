class Auth {
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

const auth = new Auth({
  baseUrl: 'https://register.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
