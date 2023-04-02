import styles from './Form.module.scss';
import Character from '../../components/CharacterForm/CharacterForm';

export default function FormPage() {
  return (
    <div className={styles.form}>
      <div className={styles.form__title}>
        <p>Create your own character</p>
      </div>
      <div className={styles.form__create}>
        <Character />
      </div>
    </div>
  );
}
