import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getMovies } from "../api";
import Sliders from "../components/Sliders";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 300vh;
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

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  const BannerId = Math.floor(Math.random() * data?.results?.length);
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner
            bgphoto={makeImagePath(data.results[BannerId].backdrop_path || "")}
          >
            <Title>{data.results[BannerId].title}</Title>
            <Overview>{data.results[BannerId].overview}</Overview>
          </Banner>
          <Sliders data={data} />
          {/* <Sliders data={data} /> */}
        </Wrapper>
      )}
    </div>
  );
}

export default React.memo(Home);
