import styles from './Form.module.scss';
import CharacterForm from '../../components/CharacterForm/CharacterForm';

export default function FormPage(): JSX.Element {
  return (
    <div className={styles.form}>
      <div className={styles.form__title}>
        <p>Create your own character</p>
      </div>
      <div className={styles.form__create}>
        <CharacterForm />
      </div>
    </div>
  );
}
