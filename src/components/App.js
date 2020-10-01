import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const useMountEffect = (func) => useEffect(func, []);

  useMountEffect(() => {
    api.getUser().then((user) => {
      setCurrentUser(user);
    });

    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  });

  function handleEscPopupClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    window.addEventListener('keyup', handleEscPopupClose);
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    window.addEventListener('keyup', handleEscPopupClose);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    window.addEventListener('keyup', handleEscPopupClose);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    window.removeEventListener('keyup', handleEscPopupClose);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardLike(card) {
    const cardWasLiked = !card.likes.some((c) => c._id === currentUser._id);

    api.editCardLikes({ cardWasLiked, cardId: card._id }).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete() {
    return api.deleteCard(selectedCard._id).then(() => {
      const newCards = cards.filter((c) => c._id !== selectedCard._id);
      setCards(newCards);
      closeAllPopups();
    });
  }

  function handleUpdateUser(newUserInfo) {
    return api.editUserInfo(newUserInfo).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    return api.editUserAvatar(avatar).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    });
  }

  function handleCreatePlace(place) {
    return api.addCard(place).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
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
        {!isUserLoggedIn && (
          <>
            <Route path="/signup">
              <div className="">SIGN UP HERE</div>
            </Route>
            <Route path="/signin">
              <div className="">SIGN IN HERE</div>
            </Route>
          </>
        )}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
