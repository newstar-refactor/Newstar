import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  width: auto;
  padding: 10px 30px;
  font-size: 20px;
  background-color: rgba(100, 192, 86, 0.8); // rgb 대신 rgba 사용하여 투명도 적용
  color: white;
  margin: 20px;
  cursor: pointer;
`;


const NextButton = ({onClick}) => {

  return (
    <div>
      <StyledButton onClick={onClick}>다음</StyledButton>
    </div>
  );
};

export default NextButton;