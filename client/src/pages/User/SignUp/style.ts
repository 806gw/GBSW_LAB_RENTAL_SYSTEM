import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  overflow: hidden;
  height: 94vh;
`;

export const TopCont = styled.div`
  min-width: 1400px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

export const Parent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const MainCont = styled.div`
  margin: 5vh auto 5rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 70%;
  height: 74%;
  border-radius: 8px;
  transition: all 0.7s;
  animation: fadein 1s ease-in-out;
  background-color: #fff;
  min-height: 35rem;
  max-height: 60rem;
  max-width: 100rem;

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

export const LoginCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const LoginSubCont = styled.div`
  display: table-cell;
  height: auto;
  vertical-align: middle;
  width: auto;
`;

export const LoginTitle = styled.div`
  font-family: Noto Sans KR, sans-serif;
  font-size: 1.2rem;
  font-weight: 480;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30rem;
`;

export const LoginLogoCont = styled.div`
  height: 3.2rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;

  .gbsw_new_logo {
    width: 4rem;
  }
`;

export const LoginTextCont = styled.div`
  color: #000;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 3rem;
  text-align: center;
  font-weight: bold;
  margin: 15px;

  .tag_bottom {
    color: #7d7d7d;
  }
`;

export const LoginInputCont = styled.div`
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  width: 100%;
`;

export const LoginInputWrap = styled.form`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0px;
  padding: 0px;
  border: 0px;
  vertical-align: top;
  margin: 8px 8px 8px 0px;
  width: 100%;
`;

export const InputCont = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 15px 25px;
  font-size: 13px;
  color: #000;
  border: 1px #c4c4c4 solid;
  border-radius: 5px;
  outline: transparent 1px solid;
  box-sizing: border-box;
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;

  .show_logo {
    font-size: 20px;
    color: #707070;
  }
`;

export const LoginBtn = styled.button`
  background-color: #00aa87;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: Noto Sans KR, sans-serif;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transition: background-color 0.12s ease-in;

  &:hover {
    background-color: #029678;
  }
`;

export const ErrorText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  color: red;
  font-size: 12px;
  margin: 10px 10px;
`;

export const LoadingText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  color: #3669dd;
  font-size: 12px;
  margin: 10px 20px;
`;

export const SignInBtn = styled(NavLink)`
  color: #7d7d7d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: Noto Sans KR, sans-serif;
  font-size: 14px;
  font-weight: 700;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  width: 100%;

  :hover {
    text-decoration: underline;
  }
`;
