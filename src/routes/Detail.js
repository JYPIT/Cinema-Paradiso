import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  font-size: 100px;
  background-color: red;
`;
function Detail() {
  return (
    <Wrapper>
      <h1>Hello Detail</h1>
    </Wrapper>
  );
}

export default Detail;
