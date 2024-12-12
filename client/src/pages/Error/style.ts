import styled from "styled-components";

export const TopCont = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
`;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  & > img {
    width: 7.5rem;
  }

  & > h1 {
    font-size: 4.3rem;
  }

  & > h1 > span {
    color: #ec7302;
  }
`;
