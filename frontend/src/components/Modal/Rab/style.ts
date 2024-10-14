import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div<{ $isOpen: boolean }>`
  background-color: white;
  width: 400px;
  height: 220px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.5s forwards;

  & > p {
    font-size: 15px;
    margin-top: 20px;
  }
`;

export const WarningTextWrap = styled.div`
  width: 100%;
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1,
  .warning_logo {
    font-size: 17px;
    color: red;
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  & > button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 2rem;
    width: 4rem;
  }

  .del_btn {
    background-color: #0078ff;
    color: #fff;
  }

  .cancel_btn {
    margin-left: 2rem;
  }
`;
