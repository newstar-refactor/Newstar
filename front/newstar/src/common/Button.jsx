import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NextButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/main")}>다음</button>
    </div>
  );
};

export default NextButton;