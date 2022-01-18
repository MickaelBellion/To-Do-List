import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

import './style.scss';

export default function List({ tasks, changeTaskStatus }) {
  // on va partir du tableau d'objet "tasks" pour générer un tableau d'éléments JSX
  const taskList = tasks.map((task) => (
    <ListItem
      key={task.id}
      {...task}
      onChangeCheckbox={changeTaskStatus}
      // label={task.label}
      // done={task.done}
    />
  ));

  return (
    <ul className="list">
      {taskList}
    </ul>
  );
}

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
};
