import { Character } from '../../types/character';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

interface Props {
  characters: Character[];
}

export default function CardList(props: Props): JSX.Element {
  return (
    <ul className={styles.cards}>
      {props.characters.map((character) => (
        <li className={styles.card} key={character.id}>
          <Card data={character} className="card" />
        </li>
      ))}
    </ul>
  );
}
