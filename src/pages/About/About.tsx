import styles from './About.module.scss';

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <div className={styles.about__title}>
        <h2>GET CLOSER TO THE MAGIC</h2>
        <p>
          Hogwarts School of Witchcraft and Wizardry is a school of magic for students aged eleven
          to eighteen.
        </p>
      </div>
    </div>
  );
}
