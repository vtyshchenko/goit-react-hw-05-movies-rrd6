import PropTypes from 'prop-types';

import styles from './views.module.scss';

export default function CastView({ casts }) {
  return casts.length > 0 ? (
    <ul className={styles.castList}>
      {casts.map(item => {
        return (
          <li key={item.name} className={styles.castInfo}>
            <img
              className={styles.itemPoster}
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.name}
              width={'100px'}
            ></img>
            <div className={styles.castsData}>
              <p className={styles.castsText}>
                <span className={styles.isBold}>name: </span>
                {item.name}
              </p>
              <p className={styles.castsText}>
                <span className={styles.isBold}>gender: </span>
                {item.gender === 2 ? 'man' : 'wooman'}
              </p>
              <p className={styles.castsText}>
                <span className={styles.isBold}>popularity: </span>
                {item.popularity}
              </p>
              <p className={styles.castsText}>
                <span className={styles.isBold}>character: </span>
                {item.character}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className={styles.reviewList}>We don't have any casts</p>
  );
}

CastView.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      character: PropTypes.string,
      popularity: PropTypes.number,
      gender: PropTypes.number,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ),
};
