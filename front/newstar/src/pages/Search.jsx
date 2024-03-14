// 기사 검색 페이지
// 키워드로 뉴스 실시간 검색

import React, { useState, useEffect } from 'react';
// import api from '../api/api'
// import axios from 'axios';
import SearchBar from '../components/SearchBar'
import SearchNewsList from '../components/main/SearchNewsList'


export default function Search() {

  // 키워드 상태 관리
  const [keyword, setKeyword] = useState('');
  // 필터링 된 뉴스 목록 상태관리
  const [filteredNews, setFilterdNews] = useState([]);

  // 뉴스 데이터 가져오는 함수
  const fetchNews = () => {
    // 공백 제거 및 소문자 변환
    const searchKeyword = keyword.trim().toLowerCase();

    // 검색어가 비어있지 않은 경우에만 API 요청 수행
    if (searchKeyword !== '') {
      axios.get(`${api.news}?keyword=${searchKeyword}`)
        .then(response => {
          setFilterdNews(response.data);
        })
        .catch(error => {
          console.log("Error fetching Searchdata", error);
        });
    } else {
      setFilterdNews([]);
    }
  };

  return (
    <div>
      <div>검색페이지</div>
      <SearchBar setKeyword={setKeyword} onSearch={fetchNews}/>
      <SearchNewsList NewsData={filteredNews} />
    </div>
  )
}