// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-itmes: center;
  border: 1px solid;
  paddind: 10px;
`


// title, imageUrl 변수 수정
const SearchNewsList = ({ title, imageUrl }) => {

  const navigate = useNavigate();

  // 리스트를 클릭하면 숏폼 url로 이동
  const handleClick = () => {
    navigate(newsUrl)
  };

  return (
    <BoxContainer onClick={handleClick}>
      <div>{title}</div>
      <img src={imageUrl} alt="newsimage"/>
    </BoxContainer>
  );
};

export default SearchNewsList;