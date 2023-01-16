import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath, makeRatings } from "../utils";

// Slider
const Slider = styled(motion.div)`
  position: relative;
  height: 300px;
  margin: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderTitle = styled.h1`
  display: flex;
  position: relative;
  font-size: 30px;
  margin: 0 20px;
`;
const SliderBtn = styled.div`
  position: absolute;
  right: ${(props) => (props.isRight ? 0 : null)};
  left: ${(props) => (props.isRight ? null : 0)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  height: 350px;
  width: 40px;
  cursor: pointer;
  svg {
    width: 40px;
    height: 40px;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  gap: 10px;
  width: 100%;
`;

const rightRowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const leftRowVariants = {
  hidden: { x: -window.outerWidth - 5 },
  visible: { x: 0 },
  exit: { x: window.outerWidth + 5 },
};

const Box = styled(motion.div)`
  background-color: whitesmoke;
  height: 300px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

// Pop Movie
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const PopMovie = styled(motion.div)`
  position: fixed;
  background-color: ${(props) => props.theme.black.lighter};
  width: 500px;
  height: 800px;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const PopMovieCover = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
`;
const PopMovieTitle = styled.h3`
  position: absolute;
  top: 250px;
  font-size: 36px;
`;
const PopMovieOverview = styled.p`
  padding: 20px 40px;
  font-size: 18px;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const offset = 6;

const genres = [
  {
    id: 28,
    name: "액션",
  },
  {
    id: 12,
    name: "모험",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 14,
    name: "판타지",
  },
  {
    id: 36,
    name: "역사",
  },
  {
    id: 27,
    name: "공포",
  },
  {
    id: 10402,
    name: "음악",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10749,
    name: "로맨스",
  },
  {
    id: 878,
    name: "SF",
  },
  {
    id: 10770,
    name: "TV 영화",
  },
  {
    id: 53,
    name: "스릴러",
  },
  {
    id: 10752,
    name: "전쟁",
  },
  {
    id: 37,
    name: "서부",
  },
];

function Sliders(movies) {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const moveRightIndex = async () => {
    if (movies.data) {
      if (leaving) return;
      await setIsLeft(false);
      toggleLeaving();
      const totalMovie = movies.data.results.length;
      const maxIndex = Math.ceil(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const moveLeftIndex = async () => {
    if (movies.data) {
      if (leaving) return;
      await setIsLeft(true);
      toggleLeaving();
      const totalMovie = movies.data.results.length;
      const maxIndex = Math.ceil(totalMovie / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const clickedMovie =
    movieMatch?.params.movieId &&
    movies.data?.results.find(
      (movie) => movie.id + "" === movieMatch.params.movieId
    );
  const onBoxClicked = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClicked = () => {
    navigate("/");
  };
  //console.log(movies.data.results);

  return (
    <>
      <SliderTitle>Now Playing</SliderTitle>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={index}
            variants={isLeft ? leftRowVariants : rightRowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: "1" }}
          >
            {movies.data.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  layoutId={movie.id + ""}
                  bgphoto={makeImagePath(movie.poster_path || "", "w500")}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => onBoxClicked(movie.id)}
                />
              ))}
          </Row>
        </AnimatePresence>
        <SliderBtn onClick={moveRightIndex} isRight={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            fill="currentColor"
          >
            <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z" />
          </svg>
        </SliderBtn>
        <SliderBtn onClick={moveLeftIndex} isRight={false}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            fill="currentColor"
          >
            <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
          </svg>
        </SliderBtn>
      </Slider>

      <AnimatePresence>
        {movieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></Overlay>
            <PopMovie layoutId={movieMatch.params.movieId}>
              {clickedMovie && (
                <>
                  <PopMovieCover
                    bgphoto={makeImagePath(
                      clickedMovie.backdrop_path || "",
                      "w500"
                    )}
                  >
                    <PopMovieTitle>{clickedMovie.title}</PopMovieTitle>
                  </PopMovieCover>
                  <PopMovieOverview>
                    {clickedMovie.release_date.split("-").slice(0, 1)}
                  </PopMovieOverview>
                  <PopMovieOverview>
                    {makeRatings(clickedMovie.vote_average)}
                    {clickedMovie.vote_average / 2}
                  </PopMovieOverview>
                  <PopMovieOverview>
                    장르:{" "}
                    {clickedMovie.genre_ids.map((genreId) =>
                      genres.map((genre) =>
                        genreId === genre.id ? (
                          <span key={genre.id}>{genre.name}, </span>
                        ) : null
                      )
                    )}
                  </PopMovieOverview>
                  <PopMovieOverview>{clickedMovie.overview}</PopMovieOverview>
                </>
              )}
            </PopMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
export default Sliders;
