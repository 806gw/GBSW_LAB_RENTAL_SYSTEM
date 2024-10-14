import styled from "styled-components";

export const TopCont = styled.div`
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: "Pretendard";
`;

export const Parent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: auto;
  padding: 20px 0;
`;

export const FormCont = styled.div`
  width: 100%;
  max-width: 1080px;
  min-height: 500px;

  h1 {
    padding: 20px 0;
  }

  .rental_btn {
    width: 170px;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: #169dfe;
    font-weight: 500;
    font-size: 1rem;
    font-family: "Pretendard";
    color: #fff;
    margin-top: 40px;
    transition: background-color 0.1s ease-in;

    &:hover {
      cursor: pointer;
      background-color: #1387e6;
    }
  }
`;

export const TextareaCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;

  & > span {
    font-size: 1.2rem;
    font-weight: 600;
    border-bottom: 3px solid #bebec7;
    padding: 5px 0;
  }

  & > textarea {
    width: 350px;
    height: 100px;
    margin-top: 15px;
    padding: 5px 10px;
    border: 2px solid #bebec7;
    border-radius: 5px;
    outline: none;
  }
`;
