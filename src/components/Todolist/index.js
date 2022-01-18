import React from 'react';
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import List from 'src/components/List';

import tasksData from 'src/data/tasks';

import './style.scss';

export default class Todolist extends React.PureComponent {
  state = {
    tasks: tasksData,
    newTaskLabel: '',
  }

  // fonction en charge d'ajouter un élément au tableau de tâche du state
  addTask = () => {
    const { tasks, newTaskLabel } = this.state;

    // une première solution pourrait être l'utilisation de uuid
    // une deuxième solution possible : le timestamp => Date.now()

    // on récupère les ids des tâches dans un nouveau tableau
    const idList = tasks.map((task) => task.id);
    const maxId = Math.max(...idList);

    const newTask = {
      id: maxId + 1,
      label: newTaskLabel,
      done: false,
    };

    // INTERDIT
    // this.state.tasks.push(newTask);

    // en déclaratif on utilise toujours des nouvelles références
    // donc on ne doit pas modifier un tableau ou un objet du state
    // on en crée un nouveau
    // tasks.push(newTask); => INTERDIT

    // création d'une nouvelle référence de tableau
    // déversement des éléments de "tasks" dans "newTasks"
    const newTasks = [...tasks];

    // on travaille avec la nouvelle réf
    newTasks.push(newTask);

    // on injecte toujours une nouvelle dans le state
    this.setState({
      tasks: newTasks,
      newTaskLabel: '',
    });

    // en une passe
    // this.setState({
    //   tasks: [
    //     ...tasks,
    //     {
    //       id: maxId + 1,
    //       label: newTaskLabel,
    //       done: false,
    //     },
    //   ],
    //   newTaskLabel: '',
    // });
  }

  // fonction en charge de modifier la valeur newTaskLabel du state
  setNewTaskLabel = (value) => {
    this.setState({
      newTaskLabel: value,
    });
  }

  // fonction en charge de modifier la propriété "done" d'une tâche
  toggleTaskDone = (taskId) => {
    const { tasks } = this.state;

    const newTasks = tasks.map((task) => {
      // si l'e=élément courant a le même id que le paramètre
      // on viendra changer la valeur de la propriété "done"
      if (task.id === taskId) {
        // attention il faut bien travailler avec des nouvelles références !
        // task.done = !task.done; => INTERDIT

        // on retourne un nouvel objet
        // avant le return de la fonction
        // ce nouvel objet prend les propriété de l'élément courant
        // et on vient modifier la propriété "done"
        return {
          ...task,
          done: !task.done,
        };
      }
      // par défaut on retourne la tâche dans le nouveau tableau
      return task;
    });

    this.setState({
      tasks: newTasks,
    });
  }

  render() {
    const { tasks, newTaskLabel } = this.state;

    const undoneTasks = tasks.filter((task) => {
      const isUndone = task.done === false;
      // retourne-moi les éléments dans le nouveau, qui ont la propriété "done"
      // avec la valeur false
      return isUndone;
    });
    // version condensée
    // const undoneTasks = tasks.filter(({ done }) => !done);

    const doneTasks = tasks.filter((task) => {
      const isDone = task.done === true;
      return isDone;
    });

    const orderedTasks = [...undoneTasks, ...doneTasks];

    // pour le tri on peut aussi utiliser la méthode sort de Array
    // on renvoie un chiffre 1, 0 ou -1 pour ordonner les 2 éléments
    // du tableau qui sont comparés (a et b)
    // on peut faire des opérations avec les booléens
    // false - true = -1 => a aura un index plus petit que b
    // true - true = 0 => ne change rien
    // true - false = 1 => b aura un index plus petit que a
    // const orderedTasks = tasks.sort((a, b) => a.done - b.done);

    return (
      <div className="todolist">
        <Form
          onSubmitForm={this.addTask}
          inputValue={newTaskLabel}
          onChangeInputValue={this.setNewTaskLabel}
        />
        <Counter number={undoneTasks.length} />
        <List
          tasks={orderedTasks}
          changeTaskStatus={this.toggleTaskDone}
        />
      </div>
    );
  }
}
