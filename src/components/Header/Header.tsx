import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={props.className}>
      <div className={styles.header__wrapper}>
        <NavLink to="/" className={styles.link}>
          MAIN
        </NavLink>
        <Logo />
        <NavLink to="/about" className={styles.link}>
          ABOUT
        </NavLink>
        <NavLink to="/form" className={styles.link}>
          FORM
        </NavLink>
      </div>
    </div>
  );
}
