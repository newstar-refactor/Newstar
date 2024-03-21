// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


// styled-components
const BoxContainer = styled.div`
  // display: flex;
  // align-items: center;
  // border: 1px solid;
  // padding: 10px;
  // cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`

const SearchNewsList = ({ NewsData }) => {
  const navigate = useNavigate();

    // 리스트를 클릭하면 숏폼 url로 이동
  const handleClick = (url) => {
    navigate({ pathname: url });
  };

  // date를 기준으로 뉴스 데이터를 최신순으로 정렬
  // 데이터의 불변성을 ㄹ위해 slice로 복사본 만들기
  const sortedNewsData = NewsData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <div>
      {sortedNewsData.length.length > 0 ? (
        sortedNewsData.map((newsItem) => (
          <BoxContainer key={newsItem.article_id} onClick={() => handleClick(newsItem.url)}>
            <h2>{newsItem.title}</h2>
            <img src={newsItem.image_url} alt="news image" />
          </BoxContainer>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchNewsList;