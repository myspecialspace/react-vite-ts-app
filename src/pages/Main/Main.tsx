import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Main.module.scss';
import characters from '../../helpers/data/potter.json';
import CardList from '../../components/CardList/CardList';

export default function MainPage(): JSX.Element {
  return (
    <div className={styles.root}>
      <SearchBar className="search" />

      <CardList characters={characters} />
    </div>
  );
}
