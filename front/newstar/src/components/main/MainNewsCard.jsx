// 메인 페이지 뉴스 카드
import { useState } from "react"
import styled from "styled-components"

import LikeButton from "../../common/Like"
import Tag from "../../common/Tag"

const HeaderImage = styled.img`
  width: 100%;
`

const NewsLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 0.5px solid gray;
  border-radius: 8px;
  width: 100%; 
`

const NewsLinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap; 
  overflow: hidden;
  padding: 20px;
`
const NewsBodyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`

// 뉴스 이미지
function NewsHeader({NewsData}) {
  return (
    <div><HeaderImage src={NewsData.imageUrl} alt="news image" /></div>
    )
  }
  
  // 뉴스 내용
  function NewsBody({NewsData, isLiked}) {
    return (
      <div>
        <NewsBodyHeader>
          <div>
            <Tag fontSize={'12px'}>{`# ${NewsData.Bcategory}`}</Tag>
            <Tag fontSize={'12px'}>{`# ${NewsData.Scategory}`}</Tag>
          </div>
          <LikeButton isLiked={isLiked} />
        </NewsBodyHeader>
        <NewsContent NewsData={NewsData} />
      </div>
  )
}

// 뉴스 제목, 요약
function NewsContent({NewsData}) {
  return (
    <div>
      <h2>{NewsData.title}</h2>
      <div>{NewsData.date}</div>
      <br />
      <div>{NewsData.content}</div>
      <a href={NewsData.url}><NewsLink NewsData={NewsData} /></a>

    </div>
  )
  
}

// 뉴스 북마크
function NewsLink({NewsData}) {
  return (
    <NewsLinkWrapper>
      <NewsLinkInfo>
        <div>{NewsData.title}</div>
        <div>{NewsData.content}</div>
        <div>{NewsData.url}</div>
      </NewsLinkInfo>
      <img src={NewsData.imageUrl} alt="news image" height={110} />
    </NewsLinkWrapper>
  )
}


function MainNewsCard() {

  const NewsData = {
    id: 0,
    title: '유정복 시장과 악수하는 윤 대통령',
    url: 'https://n.news.naver.com/mnews/article/003/0012412928',
    date: '2024-03-07 13:59:29',
    Bcategory: 100,
    Scategory: 264,
    imageUrl: 'https://mimgnews.pstatic.net/image/origin/003/2024/03/07/12412928.jpg?type=ofullfill220_150',
    content:'[인천=뉴시스] 조수정 기자 = 윤석열 대통령이 7일 인천 송도컨벤시아에서 열린 수도권광역급행철도 GTX-B 노선 착공기념식에 입장하며 유정복 인천시장과 악수하고 있다.  2024.03.07. chocrystal@newsis.com [사진 영상 제보받습니다] 공감언론 뉴시스가 독자 여러분의 소중한 제보를 기다립니다. 뉴스 가치나 화제성이 있다고 판단되는 사진 또는 영상을 뉴시스 사진영상부(n-photo@newsis.com)로 보내주시면 적극 반영하겠습니다.',
  }

  const [isLiked, setIsLiked] = useState(false)
  const handleLikeButtonClick = () => {setIsLiked(!isLiked)}

  return (
    <div>
      <NewsHeader NewsData={NewsData} />
      <NewsBody 
        NewsData={NewsData}
        isLiked={isLiked}
        handleLikeButtonClick={handleLikeButtonClick} />
    </div>
  )
}

export default MainNewsCard