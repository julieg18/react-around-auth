import React, { useContext } from 'react';
import escape from 'escape-html';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatarImage from '../images/avatar-image.jpg';

function Main({
  cards,
  onCardLike,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDeleteCard,
}) {
  const { avatar, about, name } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={escape(avatar) || avatarImage}
            alt="avatar"
            className="profile__avatar-img"
          />
          <button
            className="profile__change-avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <p className="profile__name">{escape(name)}</p>
          <button
            className="button profile__button profile__button_type_edit"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{escape(about)}</p>
        </div>
        <button
          className="button profile__button profile__button_type_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              onCardDelete={onDeleteCard}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
