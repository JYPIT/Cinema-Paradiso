import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 300vh;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  margin-top: 100px;
`;

const Box = styled(motion.div)`
  background-color: whitesmoke;
  height: 400px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  cursor: pointer;
  background-image: url(${(props) => props.bgphoto});
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery(["search", keyword], () =>
    getSearch(keyword || "")
  );
  return (
    <div>
      {isLoading ? (
        <h1 sytle={{ fontSize: "50px" }}>Loading...</h1>
      ) : (
        <Wrapper>
          <Row>
            {data.results.map((searchResult) =>
              searchResult.poster_path === null ? (
                ""
              ) : (
                <Box
                  key={searchResult.id}
                  bgphoto={makeImagePath(
                    searchResult.poster_path || "",
                    "w500"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                ></Box>
              )
            )}
          </Row>
        </Wrapper>
      )}
    </div>
  );
}

export default Search;
