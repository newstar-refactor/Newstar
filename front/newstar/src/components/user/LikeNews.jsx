// 좋아요 한 뉴스

import styled from "styled-components"
import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { useInView } from 'react-intersection-observer'
import { likeDataState } from "../../state/atoms"
import { getLikes } from "../../api/fetch"

import LikeNewsCard from "../main/LikeNewsCard"

const LikeNewsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px;
  position: relative;
  
`

const LikeNewsCards = styled.div`
  min-width: 100%;
  display: flex;
  gap: 10px;
`


export default function LikeNews() {

  // 좋아요 한 뉴스 기록
  const [likeNews, setLikeNews] = useRecoilState(likeDataState);
  const [likePage, setLikePage] = useState(0)
  const [ref, inView] = useInView()

  useEffect(() => {
    getLikes(
      5, likePage,
      (response) => {
        setLikeNews(response.data.data.reverse());
        console.log(response)
        setLikePage((likePage) => likePage + 1)
      },
      (error) => {
        console.log(error);
      }
    );
  }, [inView]);

  return (
    <div>
      <h2>좋아요 한 뉴스</h2>
      <LikeNewsContainer>
        <LikeNewsCards>
          {likeNews && likeNews.map((likeData, idx) => (
            <LikeNewsCard
              key={`${idx}-${likeData.article_id}`}
              $background={idx % 2 === 0 ? "rgb(138, 192, 56)" : "rgb(100, 192, 86)"}
              likeData={likeData} />
          ))}
        </LikeNewsCards>
      </LikeNewsContainer>
      <div ref={ref}></div>
    </div>
  )
}