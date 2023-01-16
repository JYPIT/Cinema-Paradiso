import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, userDB } from "../atom";
import { useState } from "react";

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
  display: flex;
  flex-direction: column;
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
  margin-bottom: 30px;
`;

const LoginInput = styled.input`
  border-radius: 15px;
  margin-bottom: 10px;
  width: 300px;
  height: 30px;
  text-align: center;
`;

function Login() {
  const user = useRecoilValue(userDB);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onValid = (data) => {
    //TODO: MYSQL 연동
    // axios
    //   .post("/Login", data)
    //   .then((res) => {
    //     alert(res.data.msg);
    //     console.log(res);
    //     if (res.data?.result === 1) {
    //       setIsLogin(true);
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (data.id !== user.id) {
      console.log("아아디가 존재하지 않습니다.");
    } else {
      if (data.password !== user.password) {
        console.log("비밀번호가 다릅니다.");
      } else {
        alert(`안녕하세요. ${data.id}님`);
        setId(data.id);
        setPassword(data.password);
        navigate("/");
      }
    }
  };

  const clickLogout = () => {};
  return (
    <Wrapper>
      <Title>Login</Title>
      <LoginBox>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginInput
            {...register("id", { required: "ID를 입력해주세요." })}
            type="text"
            placeholder="ID"
          />
          <span>{errors?.id?.message}</span>
          <LoginInput
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: { value: 3, message: "비밀번호는 3자리 이상입니다." },
            })}
            type="password"
            placeholder="Password"
          />
          <span>{errors?.password?.message}</span>
          <button type="submit">로그인</button>
        </LoginForm>
        <Link to={"/Join"} style={{ textAlign: "center" }}>
          계정이 없으신가요?
          <br />
          지금 계정 생성하기 →
        </Link>
      </LoginBox>
    </Wrapper>
  );
}

export default Login;
