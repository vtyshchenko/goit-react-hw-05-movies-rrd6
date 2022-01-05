import { useState, useEffect, lazy, Suspense } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMoviesByKeyword } from '../services/api-service';
import useDebounce from '../helpers/myDebounce';

import Button from '../components/Button';
import stylesFind from './views.module.scss';

const MoviesList = lazy(() =>
  import(
    '../components/MovieList/MoviesList.js' /* webpackChunkName: "movie-list" */
  ),
);

export default function MoviesView() {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { url } = useRouteMatch();
  const history = useHistory();
  const locate = useLocation();

  const debouncedSearch = useDebounce(searchText, 500);
  const handleChange = event => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const text = new URLSearchParams(locate.search).get('query');
    text && setSearchText(text);
  }, []);

  useEffect(() => {
    debouncedSearch &&
      fetchMoviesByKeyword(searchText, 1).then(response => {
        setMovies(response.results);
        setTotal(response.total_pages);
        history.push({ ...locate, search: `query=${searchText}` });
      });
  }, [debouncedSearch]);

  useEffect(() => {
    searchText &&
      fetchMoviesByKeyword(searchText, page).then(response => {
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
            <MoviesList movies={movies} locate={locate} url={url} />
          </Suspense>
          {page < total && (
            <Button
              onClick={() => {
                setPage(status => status + 1);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
