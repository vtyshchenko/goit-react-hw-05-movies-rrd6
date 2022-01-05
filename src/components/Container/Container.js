import PropTypes from 'prop-types';
import styles from './Container.module.scss';

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
