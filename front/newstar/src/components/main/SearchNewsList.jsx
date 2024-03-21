// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// styled-components
const BoxContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  `

const SearchNewsCardImage = styled.img`
  width: 25%;
  border-radius: 5px;
  object-fit: cover;
`

const SearchTitle = styled.h3`
  flex: 1; /* 제목이 남은 공간을 채우도록 설정 */
  margin: 0; /* 기본 마진 제거 */
`

const SearchNewsList = ({ NewsData }) => {
  const navigate = useNavigate();
  
    // 리스트를 클릭하면 숏폼 url로 이동
  const handleClick = (url) => {
    navigate({ pathname: url });
  };

  
  return (
    <div>
      {NewsData.length > 0 ? (
        NewsData.map((newsItem) => (
          <BoxContainer key={newsItem.article_id} onClick={() => handleClick(newsItem.url)}>
            <SearchNewsCardImage src={newsItem.image_url} alt="news image" />
            <SearchTitle>{newsItem.title}</SearchTitle>
          </BoxContainer>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchNewsList;