import { useState, useEffect, lazy, Suspense } from 'react';

import { fetchMoviePopular } from '../../services/api-service';

import Button from '../Button';

const MoviesList = lazy(() =>
  import('../MovieList/MoviesList.js' /* webpackChunkName: "movie-list" */),
);

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const url = '';

  useEffect(() => {
    fetchMoviePopular(page).then(response => {
      setPage(response.page);
      setMovies(response.results);
      setTotal(response.total_pages);
    });
  }, []);

  useEffect(() => {
    fetchMoviePopular(page).then(response => {
      let movieList = [];

      movieList =
        movies && movies.length > 0
          ? [...movies, ...response.results]
          : [...response.results];

      setMovies(movieList);

      page > 1 &&
        window.scrollBy({
          top: document.documentElement.clientHeight,
          behavior: 'smooth',
        });
    });
  }, [page]);

  return movies ? (
    <>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <MoviesList movies={movies} url={`${url}movies`} />
      </Suspense>
      {page < total && (
        <Button
          onClick={() => {
            setPage(status => status + 1);
          }}
        />
      )}
    </>
  ) : (
    <p>No films</p>
  );
}

export default HomePage;
