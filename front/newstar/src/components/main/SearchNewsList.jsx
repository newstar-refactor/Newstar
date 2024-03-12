// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
`


// title, imageUrl 변수 수정
const SearchNewsList = ({ NewsData }) => {

  const navigate = useNavigate();

  // 리스트를 클릭하면 숏폼 url로 이동
  const handleClick = () => {
    navigate(NewsData.url)
  };

  return (
    <BoxContainer onClick={handleClick}>
      <div>{NewsData.title}</div>
      <img src={NewsData.imageUrl} alt="news image" />
    </BoxContainer>
  );
};

export default SearchNewsList;