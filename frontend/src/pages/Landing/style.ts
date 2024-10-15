import styled from "styled-components";
import SchoolFullImg from "@media/SchoolFull.png";

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
  min-width: 50rem;
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
  display: table;
  float: left;
  height: 100%;
  width: 65%;
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
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 20rem;
`;

export const LoginLogoCont = styled.div`
  height: 3.2rem;
  margin-left: auto;
  margin-right: auto;
  width: 9rem;

  .gbsw_new_logo {
    float: left;
    width: 3.2rem;
  }

  .gbsw_old_logo {
    float: right;
    width: 3rem;
  }
`;

export const LoginTextCont = styled.div`
  color: #000;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  height: 3rem;
  text-align: center;
  font-weight: bold;

  .tag_bottom {
    color: #7d7d7d;
  }
`;

export const RentalStauts = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${SchoolFullImg});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 7px 7px 0;
  box-shadow: 0 2px 8px 0 rgba(99, 99, 99, 0.2);
  display: table;
  float: left;
  height: 100%;
  width: 35%;
`;
