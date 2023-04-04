import { Character } from '../../types/character';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

interface Props {
  characters: Character[];
  onClick?: (character: Character) => unknown;
}

function CardList({ onClick, characters }: Props): JSX.Element {
  return (
    <ul className={styles.cards}>
      {characters.map((character) => (
        <li className={styles.card} key={character.id}>
          <Card data={character} className="card" onClick={() => onClick?.(character)} />
        </li>
      ))}
    </ul>
  );
}

CardList.defaultProps = {
  onClick: () => {},
};

export default CardList;
