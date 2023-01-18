import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "7ce4e16883f03f551929f70193140234";

export async function getMovies() {
  const movies = {};
  const playingMovie = await axios.get(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  );
  movies.playing_movie = playingMovie.data;

  const popularMovie = await axios.get(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  );
  movies.popular_movie = popularMovie.data;

  const upComingMovie = await axios.get(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  );
  movies.upComing_movie = upComingMovie.data;

  return movies;
}

// export async function getTV(type) {
//   return (
//     await fetch(`${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ko-KR`)
//   ).json();
// }

export function getSearch(keyword) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
