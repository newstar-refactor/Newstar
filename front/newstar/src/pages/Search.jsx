// 기사 검색 페이지
// 키워드로 뉴스 실시간 검색

import React, { useState } from 'react';
import { searchNews } from '../api/fetch';
import SearchBar from '../components/SearchBar';
import SearchNewsList from '../components/main/SearchNewsList';


export default function Search() {

  // 키워드 상태 관리
  const [keyword, setKeyword] = useState('');
  // 필터링 된 뉴스 목록 상태관리
  const [filteredNews, setFilterdNews] = useState([]);


  const fetchNews = () => {
    const searchWord = keyword.trim().toLowerCase();

    if (searchWord !== '') {
      searchNews(searchWord, 
        (response) => {
          // 성공 콜백
          setFilterdNews(response.data);
          console.log(response.data);
        },
        (error) => {
          // 실패 콜백
          console.log("Error fetching Searchdata", error);
        });
    } else {
      setFilterdNews([]);
    }
  };

  return (
    <div>
      <SearchBar setKeyword={setKeyword} onSearch={fetchNews}/>
      <SearchNewsList NewsData={filteredNews} />
    </div>
  )
}