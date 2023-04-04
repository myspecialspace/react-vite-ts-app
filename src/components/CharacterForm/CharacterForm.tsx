import { SyntheticEvent, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { characterModalSelectors, formSelectors } from '../../store/selectors';
import { characterModalActions } from '../../store/slices/character-modal';
import { formActions } from '../../store/slices/form';
import CardList from '../CardList/CardList';
import Modal from '../Modal/Modal';
import CharacterModal from '../CharacterModal/CharacterModal';
import styles from './CharacterForm.module.scss';
import { FormControlName } from './types';
import { getFormValue, HOUSE_OPTIONS, SPECIES_OPTIONS } from './utils';

export default function CharacterForm(): JSX.Element {
  const { characters, errors, saved, formValue } = useSelector(formSelectors.self);
  const characterModal = useSelector(characterModalSelectors.character);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const formSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const nextFormValue = await getFormValue(formRef.current!);
    dispatch(formActions.submit(nextFormValue));
  };

  useEffect(() => {
    if (saved) {
      formRef.current?.reset();
      setTimeout(() => {
        dispatch(formActions.setSaved(false));
      }, 5000);
    }
  }, [saved, dispatch]);

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
          <input
            type="text"
            name="name"
            placeholder="Character full name"
            defaultValue={formValue.name}
          />
          {getControlError('name')}
          <input type="date" name="born" placeholder="Born" defaultValue={formValue.born} />
          {getControlError('born')}
          <div className={styles.gender}>
            <label>
              Male
              <input
                type="radio"
                name="gender"
                value="male"
                defaultChecked={formValue.gender === 'male'}
              />
            </label>

            <label>
              Female
              <input
                type="radio"
                name="gender"
                value="female"
                defaultChecked={formValue.gender === 'female'}
              />
            </label>
          </div>
          {getControlError('gender')}

          <select role="combobox" name="species" defaultValue={formValue.species || ''}>
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

          <select name="house" defaultValue={formValue.house || ''}>
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
          <input
            type="text"
            name="animagus"
            placeholder="Animagus"
            defaultValue={formValue.animagus}
          />
          {getControlError('animagus')}
          <input type="file" name="image" />
          {getControlError('image')}
          <button type="submit">Submit</button>
        </form>
      </div>

      <CardList
        characters={characters}
        onClick={(character) => dispatch(characterModalActions.set(character))}
      />

      <Modal isOpen={!!characterModal} onClose={() => dispatch(characterModalActions.reset())}>
        <CharacterModal character={characterModal!} />
      </Modal>
    </div>
  );
}
