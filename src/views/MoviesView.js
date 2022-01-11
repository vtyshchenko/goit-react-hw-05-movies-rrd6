import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByKeyword } from '../services/api-service';
import useDebounce from '../helpers/myDebounce';

import FilmPagination from '../components/FilmPagination';
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
  const [page, setPage] = useState(1);
  const [isFetchDone, setIsFetchDone] = useState(false);
  const [pageTotal, setPageTotal] = useState(null);

  const locate = useLocation();

  const debouncedSearch = useDebounce(searchText, 500);
  const handleChange = event => {
    setSearchText(event.target.value);
    setsearchParams({ query: event.target.value });
    !event.target.value && setMovies(null);
    setPage(1);
    setIsFetchDone(false);
  };

  useEffect(() => {
    const text = searchParams.get('query') || '';
    text && setSearchText(text);
    const pageNumber = searchParams.get('page') || '1';
    setPage(Number(pageNumber));
  }, []);

  const getMovies = pageNumber => {
    setPage(Number(pageNumber));
    return fetchMoviesByKeyword(searchText, pageNumber).then(response => {
      setMovies(response.results);
      setPageTotal(response.total_pages);
      setIsFetchDone(true);
    });
  };

  useEffect(() => {
    searchText && debouncedSearch && getMovies(page);
  }, [debouncedSearch]);

  useEffect(() => {
    searchText && getMovies(page);
  }, [page]);

  return (
    <>
      <label>
        Find movies
        <input
          className={isFetchDone ? stylesFind.findDone : stylesFind.find}
          type="text"
          name="query"
          value={searchText}
          placeholder="Search movies"
          onChange={handleChange}
        />
      </label>

      {movies && movies.length > 0 ? (
        <>
          <Suspense fallback={<h1>LOADING...</h1>}>
            <MoviesList movies={movies} locate={locate} />

            <FilmPagination
              pageTotal={pageTotal}
              page={page}
              setPage={setPage}
            />
          </Suspense>
        </>
      ) : (
        searchText && <h2>Nothing found on query "{searchText}"</h2>
      )}
    </>
  );
}
