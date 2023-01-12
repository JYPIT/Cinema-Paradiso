import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 30px;
`;
const JoinBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
  border-radius: 15px;
  background-color: teal;
`;
const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const JoinInput = styled.input`
  border-radius: 8px;
  margin-bottom: 10px;
  width: 300px;
  height: 30px;
  text-align: center;
`;

function Join() {
  return (
    <Wrapper>
      <Title>JOIN</Title>
      <JoinBox>
        <JoinForm action="">
          <JoinInput type="email" placeholder="Email" required />
          <JoinInput type="text" placeholder="Nickname" required />
          <JoinInput type="password" placeholder="Password" required />
          <JoinInput type="password" placeholder="Confirm Password" required />
          <button type="submit">Join</button>
        </JoinForm>
      </JoinBox>
    </Wrapper>
  );
}

export default Join;
