import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Counter({ number }) {
  let text = 'Aucune tâche en cours';

  if (number === 1) {
    text = 'Une tâche en cours';
  }
  else if (number > 1) {
    text = `${number} tâches en cours`;
  }

  return (
    <p className="counter">{text}</p>
  );
}

Counter.propTypes = {
  number: PropTypes.number.isRequired,
};
