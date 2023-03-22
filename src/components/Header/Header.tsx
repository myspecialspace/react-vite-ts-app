import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={props.className}>
      <Logo />
      <div className={styles.header__wrapper}>
        <NavLink to="/" className={styles.link}>
          MAIN
        </NavLink>
        <NavLink to="/form" className={styles.link}>
          FORM
        </NavLink>
        <NavLink to="/about" className={styles.link}>
          ABOUT
        </NavLink>
      </div>
    </div>
  );
}
