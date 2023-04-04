import { Character } from '../../types/character';
import styles from './CharacterModal.module.scss';
import nophoto from '../../assets/img/nophoto.png';
import keys from '../../helpers/keys';

interface Props {
  character: Character;
}

export default function CharacterModal({ character }: Props): JSX.Element {
  const attrs = character.attributes;

  const fields = keys(attrs)
    .filter((key) => key !== 'image')
    .map((key) => {
      const withSpaces = key.replaceAll('_', ' ');
      const label = (withSpaces.at(0)?.toUpperCase() || '') + withSpaces.slice(1);

      const rawValue: string | string[] = attrs[key] || '-';
      const value = Array.isArray(rawValue) ? rawValue.join(', ') : rawValue;

      return {
        label,
        value,
      };
    });

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <img className={styles.img} src={attrs.image || nophoto} alt="" />
      </div>
      <div className={styles.right}>
        <h2 className={styles.name}>{attrs.name}</h2>

        {fields.map((field) => (
          <div key={field.label} className={styles.field}>
            <div className={styles.label}>{field.label}: </div>
            <div className={styles.value}>{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
