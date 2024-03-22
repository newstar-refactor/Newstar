// 대분류, 중분류끼리 모은 뉴스
import styled from 'styled-components'
import { BigCategory, SmallCategory } from '../../state/categoryData'
import SmallTag from "../../common/SmallTag"


import { useParams } from 'react-router-dom'

const TagsWrapper = styled.div`
  display: flex;
  gap: 7px;
`

const CategoryNewsCardWrapper = styled.div`
  display: flex;
  // border: 0.5px solid gray;
  width: 100%;
  height: 70px;
  cursor: pointer;
`

const CategoryNewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap; 
  overflow: hidden;
  padding: 20px;
  width: 75%;
  font-size: 18px;
  gap: 3px;
`

const CategoryNewsCardImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  // border-radius: 0 8px 8px 0;
  border-radius: 5px;
`

const CategoryNewsTitle = styled.div`
  font-size: 13px;
`
const CategoryNewsContent = styled.div`
  font-size: 11px;
  color: gray;
`

export default function CategoryNewsCard({ categoryData }) {
  const newsDate = categoryData.date.replace("T", ' ')
  return (
    <>
      <CategoryNewsCardWrapper>
        <CategoryNewsCardImage src= {categoryData.imageUrl} alt="news_image" />
        <CategoryNewsCardContent>
          {/* <TagsWrapper>
            <SmallTag fontSize={'10px'} >{`# ${BigCategory[categoryData.bcategory]}`}</SmallTag>
            <SmallTag fontSize={'10px'} >{`# ${SmallCategory[categoryData.scategory]}`}</SmallTag>
          </TagsWrapper> */}
          <CategoryNewsContent>{newsDate}</CategoryNewsContent>
          <CategoryNewsTitle>{categoryData.title}</CategoryNewsTitle>
          <CategoryNewsContent>{categoryData.content}</CategoryNewsContent>
        </CategoryNewsCardContent>
      </CategoryNewsCardWrapper>
    </>
  )
}