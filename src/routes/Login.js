import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 30px;
`;

const LoginBox = styled.div`
  display: inherit;
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 30vh;
  border-radius: 15px;
  background-color: teal;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled.input`
  font-size: 50px;
  border-radius: 15px;
  margin-bottom: 30px;
`;

function Login() {
  return (
    <Wrapper>
      <Title>Login</Title>
      <LoginBox>
        <LoginForm action="">
          <LoginInput type="text" placeholder="ID" />
          <LoginInput type="text" placeholder="Password" />
        </LoginForm>
      </LoginBox>
    </Wrapper>
  );
}

export default Login;
