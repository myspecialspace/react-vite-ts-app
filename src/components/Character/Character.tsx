import classnames from 'classnames';
import { Component } from 'react';
import styles from './Character.module.scss';

interface Props {
  className: string;
}

interface State {
  fullName: string;
  yearsOld: string;
  dateOfBirth: string;
  gender: string;
  species: string;
  house: string;
  wizard: boolean;
  selectedFile: null;
}

export default class Character extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fullName: '',
      yearsOld: '',
      dateOfBirth: '',
      gender: '',
      species: '',
      house: '',
      wizard: false,
      selectedFile: null,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  validateFullName = () => {
    if (this.state.fullName.length < 7) {
      alert("Your full name can't be less than 7 letters");
    }
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
    console.log(event.target.files[0]);
  };

  formSubmit = () => {};

  render(): JSX.Element {
    const { fullName, yearsOld, dateOfBirth, gender, species, house, wizard, selectedFile } =
      this.state;
    return (
      <div className={classnames(styles.character, this.props.className)}>
        <input
          type="text"
          name="fullName"
          placeholder="Character full name"
          value={fullName}
          onChange={this.handleChange}
          onBlur={this.validateFullName}
        />
        <input
          type="text"
          name="yearsOld"
          placeholder="Years old"
          value={yearsOld}
          onChange={this.handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date Of Birth"
          value={dateOfBirth}
          onChange={this.handleChange}
        />
        <div className={styles.gender}>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={this.handleChange}
            checked={gender === 'male'}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={this.handleChange}
            checked={gender === 'female'}
          />
          Female
        </div>
        <select name="species" value={species} onChange={this.handleChange}>
          <option value="" disabled>
            Species
          </option>
          <option value="1">human</option>
          <option value="2">werewolf</option>
          <option value="3">ghost</option>
          <option value="4">dragon</option>
          <option value="5">centaur</option>
          <option value="6">goblin</option>
          <option value="7">house-elf</option>
          <option value="8">hippogriff</option>
          <option value="9">half-giant</option>
          <option value="10">giant</option>
          <option value="11">vampire</option>
        </select>
        <select name="house" value={house} onChange={this.handleChange}>
          <option value="" disabled>
            House
          </option>
          <option value="1">Gryffindor</option>
          <option value="2">Slytherin</option>
          <option value="3">Hufflepuff</option>
          <option value="4">Ravenclaw</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="wizard"
            checked={wizard}
            onChange={this.handleCheckboxChange}
          />
          Wizard
        </label>
        <input type="file" name="selectedFile" onChange={this.fileSelectedHandler} />
        <button type="submit" onClick={this.formSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
