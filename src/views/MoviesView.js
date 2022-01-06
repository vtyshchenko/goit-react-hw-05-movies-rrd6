import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByKeyword } from '../services/api-service';
import useDebounce from '../helpers/myDebounce';

import stylesFind from './views.module.scss';

const MoviesList = lazy(() =>
  import(
    '../components/MovieList/MoviesList.js' /* webpackChunkName: "movie-list" */
  ),
);

export default function MoviesView() {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchParams, setsearchParams] = useSearchParams();
  const [page, setPage] = useState(null);

  const locate = useLocation();

  const debouncedSearch = useDebounce(searchText, 500);
  const handleChange = event => {
    setSearchText(event.target.value);
    setsearchParams({ query: event.target.value });
  };

  useEffect(() => {
    const text = searchParams.get('query') || '';
    text && setSearchText(text);
  }, []);

  const getMovies = pageNumber => {
    return fetchMoviesByKeyword(searchText, pageNumber).then(response => {
      setMovies(response.results);
    });
  };

  useEffect(() => {
    searchText && debouncedSearch && getMovies(1);
  }, [debouncedSearch]);

  useEffect(() => {
    searchText && getMovies(page);
  }, [page]);

  return (
    <>
      <label>
        Find movies
        <input
          className={stylesFind.find}
          type="text"
          name="query"
          value={searchText}
          placeholder="Search movies"
          onChange={handleChange}
        />
      </label>

      {movies && (
        <>
          <Suspense fallback={<h1>LOADING...</h1>}>
            <MoviesList movies={movies} locate={locate} />
          </Suspense>
        </>
      )}
    </>
  );
}
