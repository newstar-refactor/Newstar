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
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => {
    setIsLoading(false)
    setIsEnd(false)
    setLikeNews([])
    setLikePage(0)
  }, [])

  useEffect(() => {
    if (inView && !isLoading && !isEnd) {
      setIsLoading(true)
      getLikes(
        5, likePage,
        (response) => {
          const data = response.data.data.content
          if(data.length < 5) {
            setIsEnd(true)
          }
          setLikeNews([...likeNews, ...response.data.data.content]);
          setLikePage((likePage) => likePage + 1)
          setIsLoading(false)
        },
        (error) => {
          setIsLoading(false)
          console.log(error);
        }
      );

    }
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
        <div style={{ color: 'white' }} ref={ref}>n</div>
        </LikeNewsCards>
      </LikeNewsContainer>
    </div>
  )
}