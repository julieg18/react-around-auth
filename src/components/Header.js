import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isUserLoggedIn, email, onSignOut }) {
  const [areNavItemsOpen, setAreNavItemsOpen] = useState(false);
  const location = useLocation();

  function handleMenuBtnClick(e) {
    setAreNavItemsOpen(!areNavItemsOpen);
  }

  return (
    <header
      className={`header ${
        areNavItemsOpen && isUserLoggedIn && 'header__nav-items-opened'
      }`}
    >
      <div className="logo logo_place_header"></div>
      {isUserLoggedIn ? (
        <>
          <ul
            className={`header__nav-items ${
              areNavItemsOpen && 'header__nav-items_opened'
            }`}
          >
            <li className="header__nav-item">
              <p className="header__user-email">{email}</p>
            </li>
            <li className="header__nav-item">
              <button
                onClick={onSignOut}
                className="header__logout-btn hover-animation"
              >
                Log out
              </button>
            </li>
          </ul>
          <button
            onClick={handleMenuBtnClick}
            className={`hover-animation header__nav-items-btn header__nav-items-btn_image_${
              areNavItemsOpen ? 'exit' : 'menu'
            }`}
          ></button>
        </>
      ) : (
        <Link
          className="header__link hover-animation"
          to={location.pathname === '/signin' ? '/signup' : '/signin'}
        >
          {location.pathname === '/signin' ? 'Sign up' : 'Log in'}
        </Link>
      )}
    </header>
  );
}

export default Header;
