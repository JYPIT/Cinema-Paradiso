import axios from "axios";
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
  width: 500px;
  height: 200px;
  border-radius: 15px;
  background-color: teal;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginInput = styled.input`
  border-radius: 15px;
  margin-bottom: 10px;
  width: 300px;
  height: 30px;
  text-align: center;
`;

function Login() {
  return (
    <Wrapper>
      <Title>Login</Title>
      <LoginBox>
        <LoginForm action="">
          <LoginInput type="text" placeholder="ID" />
          <LoginInput type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </LoginForm>
      </LoginBox>
    </Wrapper>
  );
}

export default Login;
