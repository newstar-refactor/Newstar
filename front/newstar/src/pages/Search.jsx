// 기사 검색 페이지
// 키워드로 뉴스 실시간 검색

import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { searchNews } from '../api/fetch';
import SearchBar from '../components/SearchBar';
import SearchNewsList from '../components/main/SearchNewsList';

const SearchContainer = styled.div`
  padding: 10px 20px 70px;
`

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    font-size: 16px;
    font-weight: 600;
    min-height: calc(100vh - 190px);
`;


export default function Search() {

  // 키워드 상태관리
  const [keyword, setKeyword] = useState('');
  // 필터링 된 뉴스 목록 상태관리
  const [filteredNews, setFilteredNews] = useState([]);
  // 검색이 실행되었는지 추적 상태관리
  const [searchPerformed, setSearchPerformed] = useState(false);


  const handleSetKeyword = (newKeyword) => {
    if (newKeyword.trim() !== '') {
      setKeyword(newKeyword);
      setSearchPerformed(true);
    } else {
      // 키워드가 빈 문자열이라면 검색을 실행하지 않음을 나타내기 위해 searchPerformed를 false로 설정
      setSearchPerformed(false);
    }
  };

  useEffect(() => {
    
    const fetchNews = async () => {
      const searchWord = keyword.trim().toLowerCase();

      if (searchWord !== '') {
        try {
          // 성공 콜백
          const response = await searchNews(searchWord);
          setFilteredNews(response.data);
          // 실패 콜백
        } catch (error) {
          console.log(error);
        }
      } else {
        setFilteredNews([]);
      }
    };

    fetchNews();
  }, [keyword]);

  
  return (
    <SearchContainer>
      <SearchBar setKeyword={handleSetKeyword} />
      {searchPerformed ? (
        <SearchNewsList NewsData={filteredNews} />
      ) : (
        <EmptyContainer>찾으시는 뉴스를 검색해주세요 🔍</EmptyContainer>
      )}
    </SearchContainer>
  );
}