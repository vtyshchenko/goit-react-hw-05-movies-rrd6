import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Link,
  useRouteMatch,
  Route,
  useLocation,
} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import {
  fetchMovieById,
  fetchMovieByIdCredits,
  fetchMovieByIdReviews,
} from '../services/api-service';

import styles from './views.module.scss';

const CastView = lazy(() =>
  import('./CastView.js' /* webpackChunkName: "cast-view" */),
);
const ReviewsView = lazy(() =>
  import('./ReviewsView.js' /* webpackChunkName: "review-view" */),
);

export default function MovieDetailsView() {
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState(null);
  const [review, setReview] = useState(null);
  const params = useParams();
  const locate = useLocation();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMovieById(params.movieId).then(setMovie);
    fetchMovieByIdCredits(params.movieId).then(setCasts);
    fetchMovieByIdReviews(params.movieId).then(setReview);
  }, []);

  let genres =
    movie && movie.length > 0
      ? movie.genres.map(curr => curr.name).join(', ')
      : 'unknown';
  let companies =
    movie && movie.length > 0
      ? movie.production_companies.map(curr => curr.name).join(', ')
      : 'unknown';

  const fromLink = `${locate?.state?.from?.pathname ?? '/'}${
    locate?.state?.from?.search ?? ''
  }`;

  return movie ? (
    <>
      <Link className={styles.goBack} to={fromLink}>
        &larr; go back
      </Link>
      <div className={styles.movieInfo}>
        <img
          className={styles.moviePoster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          min-width={'300px'}
          height={'400px'}
        ></img>
        <div className={styles.movieData}>
          <h1 className={styles.title}>{movie.original_title}</h1>
          <h2>Overview</h2>
          <p className={styles.movieText}>{movie.overview}</p>
          <h2>Genres</h2>
          <p className={styles.movieText}>{genres}</p>
          <h2>Popularity</h2>
          <p className={styles.movieText}>{movie.popularity}</p>
          <h2>Vote (average / count)</h2>
          <p className={styles.movieText}>
            {movie.vote_average} / {movie.vote_count}
          </p>
          <h2>Release date</h2>
          <p className={styles.movieText}>{movie.release_date}</p>
          <h2>Production companies</h2>
          <p className={styles.movieText}>{companies}</p>
        </div>
      </div>
      <div className={styles.addInfo}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: locate?.state?.from ?? '/' },
              }}
              className={styles.link}
              // activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${url}/review`,
                state: { from: locate?.state?.from ?? '/' },
              }}
              className={styles.link}
              // activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <Route path={`${path}/cast`}>
          {casts && casts.cast && <CastView casts={casts.cast} />}
        </Route>
        <Route path={`${path}/review`}>
          {review && <ReviewsView review={review.results} />}
        </Route>
      </Suspense>
    </>
  ) : (
    <p>No films found on id {params.movieId}</p>
  );
}
