import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDB } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 30px;
`;
const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border-radius: 15px;
  background-color: teal;
`;
const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const JoinInput = styled.input`
  border-radius: 8px;
  margin-bottom: 10px;
  width: 300px;
  height: 30px;
  text-align: center;
`;

function Join() {
  const user = useRecoilValue(userDB);
  const setUser = useSetRecoilState(userDB);
  const {
    register,
    handleSubmit,
    formState: { errors }, // error를 보여주는 formState
    setError, //특정한 error를 발생시키는 trigger
  } = useForm();
  const navigate = useNavigate();
  // 유효성 검사
  const onValid = (data) => {
    if (data.password !== data.password2) {
      setError("password2", { message: "비밀번호가 일치하지 않습니다." });
      return 0;
    }
    //TODO: MYSQL JOIN 부분
    // axios
    //   .post("/Join", data)
    //   .then((res) => {
    //     if (res.data.result === 0) {
    //       alert(res.data.msg);
    //       return 0;
    //     }
    //     alert(res.data2.msg);
    //     navigate("/Login");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // fetch(
    //   "Join",
    //   {
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   }.then(alert("회원가입 완료."), navigate("/Login"))
    // );
    setUser({ ...data });
    navigate("/Login");
    console.log(user);
  };
  return (
    <Wrapper>
      <Title>JOIN</Title>
      <JoinBox>
        <JoinForm onSubmit={handleSubmit(onValid)}>
          <JoinInput
            {...register("id", {
              required: "ID가 필요합니다.",
              minLength: {
                value: 3,
                message: "ID는 최소 3자리부터 가능합니다.",
              },
            })}
            type="text"
            placeholder="ID"
          />
          <span>{errors?.id?.message}</span>
          <JoinInput
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
          />
          <JoinInput
            {...register("password", {
              required: true,
              minLength: { value: 3, message: "최소 3자리부터 가능합니다." },
            })}
            type="password"
            placeholder="Password"
          />
          <span>{errors?.password?.message}</span>
          <JoinInput
            {...register("password2", { required: true })}
            type="password"
            placeholder="Confirm Password"
          />
          <span>{errors?.password2?.message}</span>
          <input type="submit" value="등록" />
        </JoinForm>
        <Link to={"/Login"} style={{ textAlign: "center" }}>
          계정이 있으신가요?
          <br />
          지금 로그인하기 →
        </Link>
      </JoinBox>
    </Wrapper>
  );
}

export default Join;
