import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link to="/" className={styles.logo__link}>
        <div className={styles.logo__img} />
      </Link>
    </div>
  );
}
