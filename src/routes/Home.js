import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 300vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

// Slider
const Slider = styled.div`
  position: relative;
  margin: 0px 10px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  gap: 10px;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: whitesmoke;
  height: 400px;
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
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const PopMovie = styled(motion.div)`
  position: fixed;
  background-color: ${(props) => props.theme.black.lighter};
  width: 40vw;
  height: 50vh;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const PopMovieCover = styled(motion.div)`
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
`;
const PopMovieTitle = styled.h3`
  text-align: center;
  font-size: 36px;
`;
const PopMovieOverview = styled.p`
  padding: 20px 40px;
  font-size: 18px;
`;

const rowVariants = {
  hidden: { x: window.outerWidth - 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth + 5 },
};

const BannerId = Math.floor(Math.random() * 20);
const offset = 6;

function Home() {
  const Navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = data.results.length;
      const maxIndex = Math.ceil(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId) => {
    Navigate(`/movies/${movieId}`);
  };
  const onOverlayClicked = () => {
    Navigate("/");
  };

  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id + "" === movieMatch.params.movieId);

  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data.results[BannerId].backdrop_path || "")}
          >
            <Title>{data.results[BannerId].title}</Title>
            <Overview>{data.results[BannerId].overview}</Overview>
          </Banner>
          <Slider>
            <h1 style={{ fontSize: "30px" }}>Now Playing</h1>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: "1" }}
              >
                {data.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.poster_path || "", "w500")}
                      whileHover={{ scale: 1.3 }}
                      onClick={() => onBoxClicked(movie.id)}
                    />
                  ))}
              </Row>
            </AnimatePresence>
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
                      ></PopMovieCover>
                      <PopMovieTitle>{clickedMovie.title}</PopMovieTitle>
                      <PopMovieOverview>
                        {clickedMovie.overview}
                      </PopMovieOverview>
                    </>
                  )}
                </PopMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </div>
  );
}

export default Home;
