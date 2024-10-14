import styled from "styled-components";

export const InputCont = styled.div`
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

  & > input {
    width: 300px;
    height: 40px;
    margin-top: 15px;
    padding: 5px 10px;
    border: 2px solid #bebec7;
    border-radius: 5px;
    outline: none;
  }

  & > input[type="date"] {
    width: 200px;
    padding: 0 5px;

    &:placeholder-shown {
      display: none;
    }
  }
`;
