import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

import styles from './Layout.module.scss';
import Header from '../Header/Header';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <div className={styles.router}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}
