// // 메인 숏폼 페이지
// // 뉴스 기사 좌우로 스크롤

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil'
import { newsDataState } from '../state/atoms'
import { getNews, postRecords } from '../api/fetch'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainNewsCard from '../components/main/MainNewsCard'

const StyledSlider = styled(Slider)`
  .slick-track {
    overflow: auto;
  }
`;

export default function Main() {
  const [newsDatas, setNewsDatas] = useRecoilState(newsDataState);
  const [viewArticles, setViewArticles] = useState([]);

  // 뉴스 데이터 로드
  useEffect(() => {
    getNews(
      (response) => {
        setNewsDatas(response.data);
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  // 첫 페이지 로드 시 시청 기록 생성
  useEffect(() => {
    if (newsDatas.length > 0) {
      const firstNewsData = newsDatas[0];
      // 중복 검사
      // newsDatas 배열의 첫 번째 요소가 이미 viewArticles 배열에 포함되어 있는지 확인
      if (!viewArticles.includes(firstNewsData.article_id)) {
        postRecordForNews(firstNewsData.article_id);
      }
    }
  }, [newsDatas]) // newsDatas 상태가 변경될 때마다 실행

  const postRecordForNews = (articleId) => {
    const mynews = { articleId };
    postRecords(mynews,
      (response) => {
        console.log("시청 기록 생성 성공", response);
        setViewArticles(prev => [...prev, articleId]);
      },
      (error) => {
        console.log("시청 기록 생성 실패", error);
      }
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (nowSlide) => {
      const nownewsData = newsDatas[nowSlide];
      // 중복 검사
      // 현재 보여지는 뉴스 기사의 article_id가 viewArticles 배열에 이미 존재하는지 확인
      if (!viewArticles.includes(nownewsData.article_id)) {
        postRecordForNews(nownewsData.article_id);
      }
    }
  };

  return (
    <>
      <StyledSlider {...sliderSettings}>
        {newsDatas && newsDatas.map((newsData) => (
          <MainNewsCard
            key={newsData.article_id}
            newsData={newsData} />))
        }
      </StyledSlider>
    </>
  )
}