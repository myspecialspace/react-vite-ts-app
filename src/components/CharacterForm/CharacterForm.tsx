import { SyntheticEvent, useState, useRef } from 'react';
import { Character } from '../../types/character';
import CardList from '../CardList/CardList';
import styles from './CharacterForm.module.scss';
import { FormControlName, FormErrors } from './types';
import { fillDefault, getFormErrors, getFormValue, HOUSE_OPTIONS, SPECIES_OPTIONS } from './utils';

export default function CharacterForm(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [errors, setErrors] = useState<FormErrors>(null!);
  const [saved, setSaved] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setSaved(false);
    const formValue = await getFormValue(formRef.current!);
    const formErrors = getFormErrors(formValue);
    setErrors(formErrors);

    const hasOneError = Object.values(formErrors).some((formError) => formError.length > 0);

    if (!hasOneError) {
      const character = fillDefault(formValue);
      setCharacters([...characters, character]);
      setSaved(true);

      formRef.current?.reset();

      setTimeout(() => {
        setSaved(false);
      }, 5000);
    }
  };

  const getControlError = (name: FormControlName): JSX.Element => {
    const formError = errors?.[name];
    if (!formError?.length) {
      return null!;
    }

    return (
      <div className={styles.error}>
        {formError.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.formWrap}>
        {saved && <div className={styles.saved}>Изменения сохранены</div>}
        <form className={styles.form} onSubmit={formSubmit} ref={formRef}>
          <input type="text" name="name" placeholder="Character full name" />
          {getControlError('name')}
          <input type="date" name="born" placeholder="Born" />
          {getControlError('born')}
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
          <input type="text" name="animagus" placeholder="Animagus" />
          {getControlError('animagus')}
          <input type="file" name="image" />
          {getControlError('image')}
          <button type="submit">Submit</button>
        </form>
      </div>

      <CardList characters={characters} />
    </div>
  );
}
