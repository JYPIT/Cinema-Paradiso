const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "7ce4e16883f03f551929f70193140234";

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
