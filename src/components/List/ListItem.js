import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function ListItem({ id, label, done, onChangeCheckbox }) {
  const classnames = done ? 'list-item list-item--done' : 'list-item';

  const handleOnChange = () => {
    onChangeCheckbox(id);
  };

  return (
    <li>
      <label className={classnames}>
        <input
          type="checkbox"
          checked={done}
          onChange={handleOnChange}
        />
        {label}
      </label>
    </li>
  );
}

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  onChangeCheckbox: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  done: false,
};
