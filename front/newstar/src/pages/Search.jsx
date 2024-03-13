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

  // keyword가 변경될 때 마다 실행
  // 영어 keyword가 입력될 경우를 대비하여 모두 소문자로 변환 후 비교
  useEffect(() => {

    const searchKeyword = keyword.trim().toLowerCase();

    if (searchKeyword.trim() !== '') {
      // ** url 수정해야함 **
      axios.get(`${api.news}?keyword=${searchKeyword}`)
        .then(response => {
          setFilterdNews(response.data);
        })
        .catch(error => {
          console.log("Error fetching Searchdata", error);
        });
      // 키워드가 비어있으면 뉴스 목록 비우기
    } else {
      setFilterdNews([]);
    }
  }, [keyword])


  return (
    <div>
      <div>검색페이지</div>
      <SearchBar setKeyword={setKeyword}/>
      <SearchNewsList NewsData={filteredNews} />
    </div>
  )
}