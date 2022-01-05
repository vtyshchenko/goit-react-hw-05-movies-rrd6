import { getLanguage } from '../helpers/api-data';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7cb7f2a84f35ebc2678afebafcd2cb5f';

// ========== Popular films
export function fetchMoviePopular(page) {
  const LANG = getLanguage();
  return fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}&language=${LANG}`,
  ).then(response => {
    return response.json();
  });
}

// ========== Search by keyword
export function fetchMoviesByKeyword(query, page = null) {
  const LANG = getLanguage();
  if (!page) {
    page = 1;
  }
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${LANG}&page=${page}&include_adult=false`,
  ).then(response => response.json());
}

// ========== Film id
export function fetchMovieById(movie_id) {
  const LANG = getLanguage();
  return fetch(
    `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=${LANG}`,
  ).then(response => response.json());
}

// ========== Film actors
export function fetchMovieByIdCredits(movie_id) {
  const LANG = getLanguage();
  return fetch(
    `${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}&language=${LANG}`,
  ).then(response => response.json());
}

// ========== Film reviews
export function fetchMovieByIdReviews(movie_id, page) {
  const LANG = getLanguage();
  if (!page) {
    page = 1;
  }
  return fetch(
    `${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}&page=${page}&language=${LANG}`,
  ).then(response => response.json());
}

// ========== Genres
export function fetchMovieGenres() {
  const LANG = getLanguage();

  return fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`,
  )
    .then(response => response.json())
    .catch(console.log);
}

export const themoviedb = {
  user: 'mamay.ukr',
  password: 'mamay.ukr',
  email: 'mamay.ukr.1977@gmail.com',
  keyV3Auth: '7cb7f2a84f35ebc2678afebafcd2cb5f',
  keyV4Auth:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2I3ZjJhODRmMzVlYmMyNjc4YWZlYmFmY2QyY2I1ZiIsInN1YiI6IjYxODZlMGM1YzVjMWVmMDAyYzI3NWE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgpe2ZFsuuwD752NaRWkXNGvN6Y_7zSj-ucISFoCXyM',
};
