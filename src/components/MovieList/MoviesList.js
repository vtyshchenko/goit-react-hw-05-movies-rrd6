import { lazy } from 'react';

import styles from './MoviesList.module.scss';

const MovieInfo = lazy(() =>
  import('./MovieInfo/MovieInfo.js' /* webpackChunkName: "movie-info" */),
);

export default function MoviesList({ movies, locate, url }) {
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
