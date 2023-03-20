import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Main.module.scss';

export default function MainPage() {
  return (
    <div className={styles.root}>
      <SearchBar />
    </div>
  );
}