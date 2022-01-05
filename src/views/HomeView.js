import HomePage from '../components/HomePage';

import styles from './views.module.scss';

export default function HomeView() {
  return (
    <>
      <h1 className={styles.title}>Tranding today</h1>
      <HomePage />
    </>
  );
}
