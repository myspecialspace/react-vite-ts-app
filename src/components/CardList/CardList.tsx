import { Component } from 'react';
import { Character } from '../../types/character';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

interface Props {
  characters: Character[];
}

export default class CardList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <ul className={styles.cards}>
        {this.props.characters.map((character) => (
          <li className={styles.card} key={character.id}>
            <Card data={character} className="card" />
          </li>
        ))}
      </ul>
    );
  }
}
