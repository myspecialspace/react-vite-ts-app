import classnames from 'classnames';
import { Character } from '../../types/character';
import styles from './Card.module.scss';
import nophoto from '../../assets/img/nophoto.png';

interface Props {
  data: Character;
  className: string;
  onClick?: () => unknown;
}

function Card({ data, className, onClick }: Props): JSX.Element {
  const attrs = data.attributes;

  const fields = [
    {
      label: 'Date of birth',
      value: attrs.born,
    },
    {
      label: 'Gender',
      value: attrs.gender,
    },
    {
      label: 'Species',
      value: attrs.species,
    },
    {
      label: 'House',
      value: attrs.house,
    },
    {
      label: 'Animagus',
      value: attrs.animagus ? 'yes' : 'no',
    },
    {
      label: 'Blood status',
      value: attrs.blood_status,
    },
    {
      label: 'Eye colour',
      value: attrs.eye_color,
    },

    {
      label: 'Alias names',
      value: attrs.alias_names?.join(', '),
    },

    {
      label: 'Wands',
      value: attrs.wands?.join(', '),
      classNames: styles.separator,
    },

    {
      label: 'Patronus',
      value: attrs.patronus,
      classNames: styles.separator,
    },
    {
      label: 'Nationality',
      value: attrs.nationality,
    },
  ];

  return (
    <div className={classnames(styles.root, className)} onClick={onClick}>
      <img
        src={attrs.image || nophoto}
        alt={attrs.name || ''}
        loading="lazy"
        className={classnames(styles.img)}
      />
      <h2 className={styles.name}>{attrs.name}</h2>
      <div className={styles.info}>
        {fields.map((field) => (
          <div className={classnames(styles.field, field.classNames)} key={field.label}>
            <div className={styles.label}>{field.label}: </div>
            <div className={classnames(styles.value)}>{field.value || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Card.defaultProps = {
  onClick: () => {},
};

export default Card;
