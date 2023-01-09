import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { getMovies } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 300vh;
`;

const Loader = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 50px;
`;

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 36px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: whitesmoke;
  height: 400px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
`;

const rowVariants = {
  hidden: { x: window.outerWidth - 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth + 5 },
};

const BannerId = Math.floor(Math.random() * 20);
const offset = 6;
function Home() {
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
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data.results[BannerId].backdrop_path || "")}
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
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </Wrapper>
      )}
    </div>
  );
}

export default Home;
