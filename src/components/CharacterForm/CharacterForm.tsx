import { SubmitHandler, useForm } from 'react-hook-form';
import { SyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { characterModalSelectors, formSelectors } from '../../store/selectors';
import { characterModalActions } from '../../store/slices/character-modal';
import { formActions } from '../../store/slices/form';
import CardList from '../CardList/CardList';
import Modal from '../Modal/Modal';
import CharacterModal from '../CharacterModal/CharacterModal';
import styles from './CharacterForm.module.scss';
import { FormControlName, FormValue } from './types';
import { getBase64Image, HOUSE_OPTIONS, SPECIES_OPTIONS } from './utils';
import * as validators from './validators';

export default function CharacterForm(): JSX.Element {
  const { characters, saved, formValue } = useSelector(formSelectors.self);
  const characterModal = useSelector(characterModalSelectors.character);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue, formState, watch } = useForm<FormValue>({
    defaultValues: formValue,
  });

  useEffect(() => {
    register('image', {
      validate: {
        required: validators.required,
      },
    });
  }, [register]);

  useEffect(() => {
    const sub = watch((value) => {
      dispatch(formActions.setValue(value as FormValue));
    });

    return () => sub.unsubscribe();
  }, [watch, dispatch]);

  const formSubmit: SubmitHandler<FormValue> = async () => {
    const hasErrors = Object.values(formState.errors).length;

    if (!hasErrors) {
      dispatch(formActions.submit());
      reset();
    }
  };

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        dispatch(formActions.setSaved(false));
      }, 5000);
    }
  }, [saved, dispatch]);

  const getControlError = (name: FormControlName): JSX.Element => {
    const formError = formState.errors?.[name];
    if (!formError) {
      return null!;
    }

    return (
      <div className={styles.error}>
        <div key={formError.message}>{formError.message}</div>
      </div>
    );
  };

  const onFileChange = async (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const url = file ? await getBase64Image(file) : '';
    setValue('image', url);
  };

  return (
    <div className={styles.root}>
      <div className={styles.formWrap}>
        {saved && <div className={styles.saved}>Changes saved</div>}
        <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
          <input
            {...register('name', {
              validate: {
                required: validators.required,
                minLength: validators.minLength(5),
              },
            })}
            type="text"
            placeholder="Character full name"
          />
          {getControlError('name')}
          <input
            {...register('born', {
              validate: {
                required: validators.required,
                date: validators.date,
              },
            })}
            type="date"
            placeholder="Born"
          />
          {getControlError('born')}
          <div className={styles.gender}>
            <label>
              Male
              <input
                {...register('gender', {
                  validate: {
                    required: validators.required,
                  },
                })}
                value="male"
                type="radio"
              />
            </label>

            <label>
              Female
              <input
                {...register('gender', {
                  validate: {
                    required: validators.required,
                  },
                })}
                value="female"
                type="radio"
              />
            </label>
          </div>
          {getControlError('gender')}

          <select
            {...register('species', {
              validate: {
                required: validators.required,
              },
            })}
            role="combobox"
          >
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

          <select
            {...register('house', {
              validate: {
                required: validators.required,
              },
            })}
          >
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
            {...register('animagus', {
              validate: {
                required: validators.required,
              },
            })}
            type="text"
            placeholder="Animagus"
          />
          {getControlError('animagus')}
          <input type="file" onChange={onFileChange} />
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
