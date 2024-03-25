// 메인 숏폼 페이지
// 뉴스 기사 좌우로 스크롤

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

  .slick-slide {
  }

`;


export default function Main() {
  const [newsDatas, setNewsDatas] = useRecoilState(newsDataState);
  const [viewArticles, setViewArticles] = useState([]);


  useEffect(() => {
    getNews(
      ( response ) => {
        setNewsDatas(response.data)
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (nowSlide) => {

      // 현재 슬라이드의 뉴스 데이터
      const nownewsData = newsDatas[nowSlide];
      
      // 중복 검사
      if (viewArticles.includes(nownewsData.article_id)) {
        return;
      }
      
      // 시청기록 생성
      const mynews = {
        articleId: nownewsData.article_id,
      };

      postRecords(mynews,
        (response) => {
          console.log("시청 기록 생성 성공", response);
          setViewArticles(prev => [...prev, nownewsData.article_id]);
        },
        (error) => {
          console.log("시청 기록 생성 실패", error);
        }
      );
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