import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const isActiveLink = ({ isActive }) =>
  isActive ? styles.activeLink : styles.link;

export default function Navigation() {
  return (
    <nav>
      <NavLink end to="/" className={isActiveLink}>
        Home
      </NavLink>

      <NavLink end to="/movies" className={isActiveLink}>
        Movies
      </NavLink>
    </nav>
  );
}
