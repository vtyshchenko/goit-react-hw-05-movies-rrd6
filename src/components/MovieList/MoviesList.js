import { lazy } from 'react';
import PropTypes from 'prop-types';

import styles from './MoviesList.module.scss';

const MovieInfo = lazy(() =>
  import('./MovieInfo/MovieInfo.js' /* webpackChunkName: "movie-info" */),
);

export default function MoviesList({ movies, locate, url = null }) {
  return (
    <>
      <ul className={styles.moviesList}>
        {movies.map(item => (
          <MovieInfo
            key={item.id.toString()}
            item={item}
            locate={locate}
            url={url}
          />
        ))}
      </ul>
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  locate: PropTypes.object,
  url: PropTypes.string,
};
