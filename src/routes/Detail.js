import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovies } from "../api";

function Detail() {
  const movieId = useParams();
  console.log(movieId);
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  return (
    <div>
      <ul>
        {data.results.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
