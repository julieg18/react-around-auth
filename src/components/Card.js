import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ onCardDelete, onCardLike, onCardClick, card }) {
  const { _id: userId } = useContext(CurrentUserContext);
  const {
    link,
    name,
    likes,
    owner: { _id: cardOwnerId },
  } = card;
  const belongsToUser = cardOwnerId === userId;
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
        alt={name}
        src={link}
        onClick={handleClick}
      />
      <div className="element__info">
        <p className="element__title">{name}</p>
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
