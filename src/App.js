import { Routes, Route } from 'react-router-dom';

import { React, lazy, Suspense } from 'react';

import './App.scss';

import Header from './components/Header';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);
// const MoviesView = lazy(() =>
//   import('./views/MoviesView.js' /* webpackChunkName: "movies-view" */),
// );
// const MovieDatailsView = lazy(() =>
//   import(
//     './views/MovieDatailsView.js' /* webpackChunkName: "movie-detail-view" */
//   ),
// );
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.js' /* webpackChunkName: "not-found-view" */),
);

export default function App() {
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1>LOADING...</h1>
          </>
        }
      >
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomeView />} />
            {/* <Route path="/movies" element={<MoviesView />} /> */}
            {/* <Route path="/movies/:movieId/*" element={<MovieDatailsView />} /> */}
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
