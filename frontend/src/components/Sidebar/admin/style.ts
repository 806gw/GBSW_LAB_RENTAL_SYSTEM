import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  &.active {
    transform: translateX(0);
  }

  &.inactive {
    transform: translateX(-100%);
  }
`;

export const SidebarWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px #e7e7e7 solid;

  .school_logo {
    width: 210px;
  }
`;

export const NameWrap = styled.div`
  width: 210px;
  height: 40px;
  border: 1px solid #666;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .user_logo {
    font-size: 16px;
    margin-right: 10px;
    color: #666;
  }

  p {
    font-size: 14px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ListCont = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LinkWrap = styled(Link)`
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.1s ease-in;
  margin-top: 20px;
  text-decoration: none;

  color: #747474;

  div {
    width: 100%;
    max-width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-size: 17px;
    margin-left: 20px;

    .logout_logo {
      font-size: 20px;
    }

    span {
      color: #000;
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ListWrap = styled.div`
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.1s ease-in;
  margin-top: 20px;

  color: #747474;

  div {
    width: 100%;
    max-width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    margin-left: 20px;

    .link_logo {
      font-size: 20px;
    }

    span {
      color: #000;
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;
