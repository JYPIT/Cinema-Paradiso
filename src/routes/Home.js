import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getMovies } from "../api";
import { Sliders } from "../components/Sliders";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 200vh;
`;
const Loader = styled.div`
  height: 30vh;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 48px;
`;
const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const sliderTitle = {
  nowPlaying: "상영중인 영화",
  popular: "인기있는 영화",
  upComing: "개봉 예정",
};

function Home() {
  const { data, isLoading } = useQuery(["movies"], () => getMovies());
  const BannerId = Math.floor(
    Math.random() * data?.playing_movie.results?.length
  );
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner
            bgphoto={makeImagePath(
              data?.playing_movie.results[BannerId].backdrop_path || ""
            )}
          >
            <Title>{data?.playing_movie.results[BannerId].title}</Title>
            <Overview>
              {data?.playing_movie.results[BannerId].overview}
            </Overview>
          </Banner>
          <Sliders
            data={data?.playing_movie}
            sliderTitle={sliderTitle.nowPlaying}
          />
          <Sliders
            data={data?.popular_movie}
            sliderTitle={sliderTitle.popular}
          />
          <Sliders
            data={data?.upComing_movie}
            sliderTitle={sliderTitle.upComing}
          />
        </Wrapper>
      )}
    </div>
  );
}

export default React.memo(Home);
