// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { getArticle } from "../api/fetch"

import MainNewsHeader from "../components/main/MainNewsHeader"
import MainNewsBody from "../components/main/MainNewsBody"


const DetailNewsImage = styled.img`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
`

const DetailNewsContainer = styled.div`
  height: auto;
  max-height: 86vh;
  overflow-y: auto;
  width: 100%;
`

function NewsDetailCard() {
  const params = useParams()
  const [article, setArticle] = useState([])

  useEffect(() => {
    getArticle(
      params.articleId,
      ( response ) => {
        setArticle(response?.data.data)
        console.log(response)
      }
    )
  }, [params.articleId])

  return (
    <DetailNewsContainer>
      <DetailNewsImage
        src={article.image_url}
        alt="news_image"
      />
      <MainNewsHeader
        newsData={article}
        // isLiked={isLiked}
        // setIsLiked={setIsLiked}
        // handleLikeButtonClick={handleLike}
      />
      <MainNewsBody newsData={article} />
    </DetailNewsContainer>
  )
}

export default NewsDetailCard