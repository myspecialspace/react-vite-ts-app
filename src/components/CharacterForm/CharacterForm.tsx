/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { Character } from '../../types/character';
import CardList from '../CardList/CardList';
import styles from './CharacterForm.module.scss';
import { FormControlName, FormErrors, FormValue } from './types';
import {
  fillDefault,
  getBase64Image,
  getFormErrors,
  getFormValue,
  HOUSE_OPTIONS,
  SPECIES_OPTIONS,
} from './utils';
import * as validators from './validators';

export default function CharacterForm(): JSX.Element {
  // const [characters, setCharacters] = useState<Character[]>([]);
  // const [errors, setErrors] = useState<FormErrors>(null!);
  // const [saved, setSaved] = useState<boolean>(false);
  // const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, setValue } = useForm<FormValue>;
  useEffect(() => {
    register('image', {
      validate: {
        required: validators.required,
      },
    });
  }, [register]);

  useEffect(() => {
    const sub = watch((value) => {
     setValue(value as FormValue));
    });


  const formSubmit: SubmitHandler<FormValue> = async () => {
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
            {...register('dateOfBirth', {
              validate: {
                required: validators.required,
                date: validators.date,
              },
            })}
            type="date"
            placeholder="dateOfBirth"
          />
          {getControlError('dateOfBirth')}

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
                id="gender-female"
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
            name="species"
            defaultValue=""
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
            name="house"
            defaultValue=""
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
          <label>
            <input
              {...register('wizard', {
                validate: {
                  required: validators.required,
                },
              })}
              type="checkbox"
              name="wizard"
            />
            Wizard
          </label>
          {getControlError('wizard')}
          <input type="file" name="image" onChange={onFileChange} />
          {getControlError('image')}
          <button type="submit">Submit</button>
        </form>
      </div>

      <CardList characters={characters} />
    </div>
  );
}
