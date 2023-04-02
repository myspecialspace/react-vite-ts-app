import classnames from 'classnames';
import { Character } from '../../types/character';
import styles from './Card.module.scss';
import { getHogwartsRole } from '../../helpers/hogwarts-role';

interface Props {
  data: Character;
  className: string;
}

export default function Card({ data, className }: Props): JSX.Element {
  const fields = [
    {
      label: 'Years old',
      value: data.yearOfBirth ? new Date().getFullYear() - data.yearOfBirth : null,
    },
    {
      label: 'Date of birth',
      value: data.dateOfBirth,
    },
    {
      label: 'Gender',
      value: data.gender,
    },
    {
      label: 'Species',
      value: data.species,
    },
    {
      label: 'House',
      value: data.house,
    },
    {
      label: 'Wizard',
      value: data.wizard ? 'yes' : 'no',
    },
    {
      label: 'Ancestry',
      value: data.ancestry,
    },
    {
      label: 'Eye colour',
      value: data.eyeColour,
      valueClassNames: styles.eyeColour,
      valueStyle: { backgroundColor: data.eyeColour },
    },

    {
      label: 'Alternate names',
      value: data.alternate_names.join(', '),
    },

    {
      label: 'Wand wood',
      value: data.wand.wood,
      classNames: styles.separator,
    },
    {
      label: 'Wand core',
      value: data.wand.core,
    },
    {
      label: 'Wand length',
      value: data.wand.length,
    },

    {
      label: 'Patronus',
      value: data.patronus,
      classNames: styles.separator,
    },
    {
      label: 'Hogwarts role',
      value: getHogwartsRole(data),
    },
    {
      label: 'Actor',
      value: data.actor,
    },
  ];

  return (
    <div className={classnames(styles.root, className)}>
      <img
        src={data.image}
        alt={data.name}
        loading="lazy"
        className={classnames(styles.img, { [styles.blackWhite]: !data.alive })}
      />
      <h2 className={styles.name}>{data.name}</h2>
      <div className={styles.info}>
        {fields.map((field) => (
          <div className={classnames(styles.field, field.classNames)} key={field.label}>
            <div className={styles.label}>{field.label}: </div>
            <div
              className={classnames(styles.value, field.valueClassNames)}
              style={field.valueStyle}
            >
              {field.value || '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
