import { Link } from "react-router-dom";
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
  height: 100%;
  overflow-y: hidden;
  font-family: "Pretendard";
`;

export const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: auto;
  margin-top: 40px;
`;

export const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1080px;
  height: auto;
  margin-top: 30px;

  & > p {
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  & > div > select {
    background-color: #fff;
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1em;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 0 1px 0 rgba(0, 0, 0, 0.1);
    color: #3b2920;
    font-size: 0.9rem;
    height: 2.5rem;
    margin-right: 1.2rem;
    outline: none;
    text-align: center;
    text-align-last: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    width: 8rem;
  }

  & > div > button {
    background: #474747;
    border: none;
    border-radius: 4px;
    color: #fff;
    height: 2.5rem;
    width: 5rem;
    cursor: pointer;
  }
`;

export const RentCont = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 2px 4px 12px #00000014;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 200px;
  height: 200px;

  .gbsw {
    width: 6rem;
  }
  .arrow {
    color: #7d7d7d;
    margin-left: 10px;
    width: 20px;
  }
`;

export const LinkRent = styled(Link)`
  color: #00aa87;
  font-size: 20px;
  font-family: "Pretendard";
  font-weight: bolder;
  text-decoration: none;
  transition: color 0.12s ease-in;

  &:hover {
    color: #029678;
  }
`;

export const RentSubCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
`;

export const NoticeCont = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 850px;
  height: 200px;
  padding-left: 40px;
  justify-content: start;
`;

export const NoticeSubCont = styled.div`
  width: 100%;
  height: 100%;
  text-align: start;
  margin-top: 15px;
  display: flex;
  align-items: center;

  .important_text {
    color: #fd1717;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const NoticeRuleCont = styled.div`
  font-size: 15px;
  color: #000;
  padding: 10px 0;

  .notice_text {
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  .explanation {
    margin: 0;
    color: #878787;
  }
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: auto;
  height: auto;
`;

export const BodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 1100px;
  max-height: 450px;
`;

export const RentalCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  min-height: 50px;
  border-radius: 10px;
  background-color: #474747;
  color: #fff;
  font-family: "Pretendard";

  .list_detail {
    font-size: 15px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Pretendard";
    text-align: center;
  }
`;

export const RentalUserCont = styled.div`
  width: 100%;
  height: 100%;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 5px;
`;

export const RentalUserWrap = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 3.5rem;
  margin: 1rem auto 0;

  .user_detail {
    font-size: 13px;
    flex: 1;
    font-family: "Pretendard";
    text-align: center;
    position: relative;
  }

  .gbsm_symbol {
    width: 23px;
  }
`;

export const DeleteDetail = styled.img`
  width: 20px;
  cursor: pointer;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    font-size: 12px;
    word-wrap: break-word;
    white-space: normal;
    font-weight: 500;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    margin-top: 8px;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const CharacterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  .meister_character {
    width: 6rem;
  }

  .sw_character,
  .game_character {
    width: 5rem;
  }
`;

export const NotRentTextWrap = styled.div`
  margin: 50px;

  & > p {
    margin: 20px;
  }
`;
