import React, { useContext } from 'react';
import escape from 'escape-html';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ onCardDelete, onCardLike, onCardClick, card }) {
  const { _id: userId } = useContext(CurrentUserContext);
  const { link, name, likes, owner } = card;
  const belongsToUser = owner === userId;
  const isLiked = card.likes.some((user) => user._id === userId);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        className={`button element__delete-button ${
          !belongsToUser && 'element__delete-button_hidden'
        }`}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__image"
        alt={escape(name)}
        src={link}
        onClick={handleClick}
      />
      <div className="element__info">
        <p className="element__title">{escape(name)}</p>
        <button
          onClick={handleLikeClick}
          className={`button element__like-button ${
            isLiked && 'element__like-button_active'
          }`}
        ></button>
        <p className="element__likes-num">{likes.length}</p>
      </div>
    </li>
  );
}

export default Card;
