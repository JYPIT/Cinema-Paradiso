import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

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
  height: 300px;
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
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // error를 보여주는 formState
    setError, //특정한 error를 발생시키는 trigger
  } = useForm();

  // 유효성 검사
  const onValid = (data) => {
    if (data.password !== data.password2) {
      setError("password2", { message: "비밀번호가 일치하지 않습니다." });
      return 0;
    }
    console.log(JSON.stringify(data));
    fetch("Join", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    //alert("회원가입 완료");
  };
  const callDB = async () => {
    console.log("SELECT *");
    const result = await axios.get("/db/cinemaUserDB");
    console.log(result.data);
  };

  return (
    <Wrapper>
      <Title>JOIN</Title>
      <JoinBox>
        <JoinForm onSubmit={handleSubmit(onValid)}>
          <JoinInput
            {...register("nickname", {
              required: "Nickname이 필요합니다.",
              minLength: {
                value: 3,
                message: "Nickname은 최소 3자리부터 가능합니다.",
              },
            })}
            type="text"
            placeholder="Nickname"
          />
          <span>{errors?.nickname?.message}</span>
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
          <input type="submit" value="Join" />
        </JoinForm>
      </JoinBox>
      <button onClick={callDB} style={{ fontSize: "50px" }}>
        Cinema User DB
      </button>
    </Wrapper>
  );
}

export default Join;
