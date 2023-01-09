import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Title = styled.h2``;

function Movie({ id, title, posterPath }) {
  return (
    <div>
      <div>
        <div>
          <Title>
            <Link to={`/movie/${id}`}>{title}</Link>
          </Title>
          <img src={POSTER_BASE_URL + posterPath} alt={title} />
        </div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
};
export default Movie;
