import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

function Profile() {
  return (
    <Wrapper>
      <h1>Hello User:)</h1>
    </Wrapper>
  );
}

export default Profile;
