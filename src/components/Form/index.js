import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Form extends React.Component {
  // on crée une référence (une sorte d'id), qu'on passe à un élément React
  inputRef = React.createRef();

  // quand on veut intéragir avec le DOM, il faut passer par les méthode de lifecycle
  componentDidMount() {
    // exécuté au 1e rendu du composant
    this.inputRef.current.focus();
  }

  handleOnSubmit = (event) => {
    const { onSubmitForm } = this.props;

    event.preventDefault();
    onSubmitForm();
  };

  handleOnChange = (event) => {
    const { onChangeInputValue } = this.props;

    onChangeInputValue(event.target.value);
  };

  render() {
    const { inputValue } = this.props;

    return (
      // je veux qu'à chaque soumission du formulaire
      // j'exécute un handler
      <form className="form" onSubmit={this.handleOnSubmit}>
        <input
          ref={this.inputRef}
          type="text"
          className="form-item"
          placeholder="Ajouter une tâche"
          value={inputValue}
          onChange={this.handleOnChange}
          // autoFocus
        />
      </form>
    );
  }
}

Form.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
};
