import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; ;
`;
const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 600px;
  background-color: teal;
`;
const BoardForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  //background-color: ${(props) => props.theme.black.lighter};
`;
function RequestBoard() {
  const [contentRequest, setContentRequest] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    setContentRequest({
      title: e.target.title.value,
      content: e.target.content.value,
    });
    alert("등록 완료:)");
  };
  console.log(contentRequest);
  return (
    <Wrapper>
      <BoardForm onSubmit={onSubmit}>
        <select name="" id="category" style={{ width: "20%" }}>
          <option value="movie">영화</option>
          <option value="tv">TV 프로그램</option>
          <option value="etc">기타</option>
        </select>
        <input id="title" type="text" placeholder="제목" />
        <textarea
          id="content"
          type="text"
          placeholder="요청 사항"
          style={{ height: "400px" }}
        />
        <button>등록</button>
      </BoardForm>
    </Wrapper>
  );
}

export default RequestBoard;
