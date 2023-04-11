import styles from './Footer.module.scss';

interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div className={props.className}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__item}>
          <a
            href="https://github.com/myspecialspace"
            target="_blank"
            className={styles.github}
            rel="noreferrer"
          >
            {' '}
          </a>
        </div>
        <div className={styles.footer__item}>&copy;2023</div>
        <div className={styles.footer__item}>
          <a
            href="https://rs.school/react/"
            target="_blank"
            className={styles.rsschool}
            rel="noreferrer"
          >
            {' '}
          </a>
        </div>
      </div>
    </div>
  );
}
