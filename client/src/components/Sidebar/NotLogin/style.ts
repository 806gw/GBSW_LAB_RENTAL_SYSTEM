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
  transition: transform 0.3s ease;
  z-index: 1000;

  &.active {
    transform: translateX(0);
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
    width: 200px;
  }

  p {
    font-size: 16px;
    font-weight: 900;
    margin-top: 20px;
    color: red;
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
