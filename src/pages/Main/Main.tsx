import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Main.module.scss';
import characters from '../../helpers/data/potter.json';
import Card from '../../components/Card/Card';

export default function MainPage() {
  return (
    <div className={styles.root}>
      <SearchBar className="search" />

      <ul className={styles.cards}>
        {characters.map((character) => (
          <li className={styles.card} key={character.id}>
            <Card data={character} className="card" />
          </li>
        ))}
      </ul>
    </div>
  );
}
