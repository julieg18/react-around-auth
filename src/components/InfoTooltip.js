import React from 'react';
import Popup from './Popup';
import successImage from '../images/check-symbol.svg';
import errorImage from '../images/x-symbol.svg';

function InfoTooltip({ onClose, isOpen, type }) {
  let imgSrc;
  let imgAlt = '';
  let message = '';
  switch (type) {
    case 'success':
      imgSrc = successImage;
      imgAlt = 'a black checkmark';
      message = 'Success! You have now been registered.';
      break;
    default:
      imgSrc = errorImage;
      imgAlt = 'a red x';
      message = 'Oops, something went wrong! Please try again.';
  }
  return (
    <Popup onClose={onClose} isOpen={isOpen} content="info-tooltip">
      <div className="info-tooltip">
        <img src={imgSrc} alt={imgAlt} className="info-tooltip__img" />
        <p className="info-tooltip__message">{message}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
