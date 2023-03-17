import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.page__title}>
        <h1>404</h1>
        <h2>Oh dear. Are you lost?</h2>
      </div>
      <div className={styles.page__more}>
        <Link to='/'>Back To Main</Link>
        <Link to='/about'>
          <span>About Us</span>
        </Link>
      </div>
    </div>
  );
}
