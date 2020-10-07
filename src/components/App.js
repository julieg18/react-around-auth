import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api, authenticationApi } from '../utils/api';

function App() {
  const history = useHistory();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);

  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    api
      .getUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });

    if (localStorage.getItem('jwt')) {
      checkUserValidity();
    }
  });

  function checkUserValidity() {
    return authenticationApi
      .checkUserValidity()
      .then(({ data: { email } }) => {
        setEmail(email);
        setIsUserLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

  function handleEscPopupClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function setEscPopupCloseEventListener() {
    window.addEventListener('keyup', handleEscPopupClose);
  }

  function handleEditAvatarClick() {
    setEscPopupCloseEventListener();
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEscPopupCloseEventListener();
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEscPopupCloseEventListener();
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setEscPopupCloseEventListener();
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setEscPopupCloseEventListener();
    setIsDeleteCardPopupOpen(true);
  }

  function openErrorTooltip() {
    setEscPopupCloseEventListener();
    setIsErrorTooltipOpen(true);
  }

  function openSuccessTooltip() {
    setEscPopupCloseEventListener();
    setIsSuccessTooltipOpen(true);
  }

  function closeAllPopups() {
    window.removeEventListener('keyup', handleEscPopupClose);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsErrorTooltipOpen(false);
    setIsSuccessTooltipOpen(false);
  }

  function handleUserLogin(userInfo) {
    return authenticationApi
      .loginUser(userInfo)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        return checkUserValidity();
      })
      .catch((err) => {
        console.log(err);
        openErrorTooltip();
        return Promise.reject();
      });
  }

  function handleUserRegister(userInfo) {
    return authenticationApi
      .registerUser(userInfo)
      .then((data) => {
        if (data) {
          return handleUserLogin(userInfo);
        }
        return Promise.reject();
      })
      .then(() => {
        openSuccessTooltip();
      })
      .catch((err) => {
        console.log(err);
        openErrorTooltip();
        return Promise.reject();
      });
  }

  function handleUserSignout() {
    localStorage.removeItem('jwt');
    setIsUserLoggedIn(false);
  }

  function handleCardLike(card) {
    const cardWasLiked = !card.likes.some((c) => c._id === currentUser._id);

    api
      .editCardLikes({ cardWasLiked, cardId: card._id })
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    return api
      .deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== selectedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(newUserInfo) {
    return api
      .editUserInfo(newUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    return api
      .editUserAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCreatePlace(place) {
    return api
      .addCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSignOut={handleUserSignout}
        isUserLoggedIn={isUserLoggedIn}
        email={email}
      />
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          component={Main}
          isUserLoggedIn={isUserLoggedIn}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onDeleteCard={handleDeleteCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
        <Route path="/signup">
          <Register onRegister={handleUserRegister} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleUserLogin} />
        </Route>
        <Route>
          <Redirect to={isUserLoggedIn ? '/' : '/signin'} />
        </Route>
      </Switch>
      {isUserLoggedIn && <Footer />}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarProfilePopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCreatePlace={handleCreatePlace}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />

      <InfoTooltip
        onClose={closeAllPopups}
        type="success"
        isOpen={isSuccessTooltipOpen}
      />

      <InfoTooltip
        onClose={closeAllPopups}
        type="error"
        isOpen={isErrorTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
