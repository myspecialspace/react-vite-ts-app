import { Component, SyntheticEvent, createRef } from 'react';
import { Character } from '../../types/character';
import styles from './CharacterForm.module.scss';
import { FormControlName, FormErrors } from './types';
import { fillDefault, getFormErrors, getFormValue, HOUSE_OPTIONS, SPECIES_OPTIONS } from './utils';
import Card from '../Card/Card';

interface State {
  characters: Character[];
  errors: FormErrors;
  saved: boolean;
}

class CharacterForm extends Component<object, State> {
  formRef = createRef<HTMLFormElement>();

  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      errors: null!,
      saved: false,
    };
  }

  formSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    this.setState({ saved: false });

    const formValue = await getFormValue(this.formRef.current!);
    const formErrors = getFormErrors(formValue);
    this.setState({ errors: formErrors });

    const hasOneError = Object.values(formErrors).some((errors) => errors.length > 0);

    if (!hasOneError) {
      const character = fillDefault(formValue);
      this.setState((prevState) => ({
        characters: [...prevState.characters, character],
        saved: true,
      }));

      this.formRef.current?.reset();

      setTimeout(() => {
        this.setState({ saved: false });
      }, 5000);
    }
  };

  render(): JSX.Element {
    const getControlError = (name: FormControlName): JSX.Element => {
      const errors = this.state.errors?.[name];
      if (!errors?.length) {
        return null!;
      }

      return (
        <div className={styles.error}>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      );
    };

    return (
      <div className={styles.root}>
        <div className={styles.formWrap}>
          {this.state.saved && <div className={styles.saved}>Изменения сохранены</div>}
          <form className={styles.form} onSubmit={this.formSubmit} ref={this.formRef}>
            <input type="text" name="name" placeholder="Character full name" />
            {getControlError('name')}
            <input type="date" name="dateOfBirth" placeholder="Date Of Birth" />
            {getControlError('dateOfBirth')}
            <div className={styles.gender}>
              <label>
                Male
                <input type="radio" name="gender" value="male" />
              </label>

              <label htmlFor="gender-female">Female</label>
              <input type="radio" name="gender" value="female" id="gender-female" />
            </div>
            {getControlError('gender')}

            <select role="combobox" name="species" defaultValue="">
              <option value="" disabled>
                Species
              </option>
              {SPECIES_OPTIONS.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            {getControlError('species')}

            <select name="house" defaultValue="">
              <option value="" disabled>
                House
              </option>
              {HOUSE_OPTIONS.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
            {getControlError('house')}
            <label>
              <input type="checkbox" name="wizard" />
              Wizard
            </label>
            {getControlError('wizard')}
            <input type="file" name="image" />
            {getControlError('image')}
            <button type="submit">Submit</button>
          </form>
        </div>

        <ul className={styles.cards}>
          {this.props.characters.map((character) => (
            <li className={styles.card} key={character.id}>
              <Card data={character} className="card" />
            </li>
          ))}
      </ul>
      </div>
    );
  }
}

export default CharacterForm;
