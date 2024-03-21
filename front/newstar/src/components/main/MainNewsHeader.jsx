import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import styled from "styled-components"

import Tag from "../../common/Tag"
import LikeButton from "../../common/Like"

import { getRecords } from "../../api/fetch"

const MainNewsHeaderContainer = styled.div`
  padding: 20px 20px 10px;
`

const NewsTagAndLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NewsTags = styled.div`
  display: flex;
  gap: 7px;
`

// 카테고리 번호
const BigCategory = { 100: '정치', 101: '경제', 105: 'IT/과학' }
const SmallCategory = {
  264: '대통령실',
  265: '국회/정당',
  268: '북한',
  266: '행정',
  267: '국방/외교',
  269: '정치일반',
  
  259: '금융',
  258: '증권',
  261: '산업/재계',
  771: '중기/벤처',
  260: '부동산',
  262: '글로벌 경제',
  310: '생활경제',
  263: '경제 일반',
  
  731: '모바일',
  226: '인터넷/SNS',
  227: '통신/뉴미디어',
  230: 'IT 일반',
  732: '보안/해킹',
  283: '컴퓨터',
  229: '게임/리뷰',
  228: '과학 일반',
}

// 뉴스 헤더 (제목, 날짜, 태그)
export default function NewsHeader({ newsData, isLiked, handleLikeButtonClick }) {
  const newsDate = newsData.date.replace('T', '\n')

  return (
    <MainNewsHeaderContainer>
      <NewsTagAndLike>
        <NewsTags>
          <Link to={`/newstar/category/${newsData.Bcategory}`}><Tag fontSize={'12px'}>
              {`# ${BigCategory[newsData.Bcategory]}`}</Tag></Link>
          <Link to={`/newstar/category/${newsData.Scategory}`}><Tag fontSize={'12px'}>
              {`# ${SmallCategory[newsData.Scategory]}`}</Tag></Link>
        </NewsTags>
        <LikeButton 
          isLiked={isLiked}
          handleLikeButtonClick={handleLikeButtonClick}
            />
      </NewsTagAndLike>
      <br />
      <h2>{newsData.title}</h2>
      <br />
      <div style={{color: 'gray'}}>{newsDate}</div>
    </MainNewsHeaderContainer>
    )
  }