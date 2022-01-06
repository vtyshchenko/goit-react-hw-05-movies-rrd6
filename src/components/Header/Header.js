import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import styles from './Header.module.scss';

import Container from '../Container';

export default function Header() {
  return (
    <>
      <Container>
        <header className={styles.header}>
          <Navigation />
        </header>

        <Outlet />
      </Container>
    </>
  );
}
