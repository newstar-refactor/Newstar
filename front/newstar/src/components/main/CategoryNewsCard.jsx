// 대분류, 중분류끼리 모은 뉴스
import styled from 'styled-components'
import Tag from "../../common/Tag"
import { useRecoilState } from 'recoil'
// import { collectDataState } from '../state/atoms'

const CategoryNewsCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  // border: 0.5px solid gray;
  border-radius: 8px;
  width: 100%;
  height: 90px;
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
`

const CategoryNewsCardImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  // border-radius: 0 8px 8px 0;
  border-radius: 5px;
`

export default function CategoryNewsCard({ categoryData }) {
  return (
    <CategoryNewsCardWrapper>
      <CategoryNewsCardImage src= {categoryData.imageUrl} alt="news_image" />
      <CategoryNewsCardContent>
        <div>{categoryData.title}</div>
        {/* <div>{categoryData.content}</div> */}
        {/* <div>{categoryData.Scategory}</div> */}
      </CategoryNewsCardContent>
    </CategoryNewsCardWrapper>
  )
}