import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NextButton = ({onClick}) => {

  return (
    <div>
      <button onClick={onClick}>다음</button>
    </div>
  );
};

export default NextButton;