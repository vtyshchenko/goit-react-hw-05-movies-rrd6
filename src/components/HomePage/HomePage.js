import { useState, useEffect, lazy, Suspense } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviePopular } from '../../services/api-service';
import FilmPagination from '../FilmPagination';

const MoviesList = lazy(() =>
  import('../MovieList/MoviesList.js' /* webpackChunkName: "movie-list" */),
);

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [searchParams, setsearchParams] = useSearchParams();
  const url = '/movies';
  const locate = useLocation();

  useEffect(() => {
    const pageNumber = searchParams.get('page') || '1';
    setPage(Number(pageNumber));
    fetchMoviePopular(pageNumber).then(response => {
      setPage(response.page);
      setMovies(response.results);
      setPageTotal(response.total_pages);
    });
  }, []);

  useEffect(() => {
    fetchMoviePopular(page).then(response => setMovies(response.results));
  }, [page]);

  return movies ? (
    <>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <MoviesList movies={movies} url={`${url}`} locate={locate} />
        <FilmPagination pageTotal={pageTotal} page={page} setPage={setPage} />
      </Suspense>
    </>
  ) : (
    <p>No films</p>
  );
}

export default HomePage;
