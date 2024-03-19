import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { BigCategory, SmallCategory } from '../state/categoryData'


const CategoryNewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px;
`

const BigCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #d1d1d1;
  color: white;
  background-color: #a0c6d6;
  font-size: 30px;
  cursor: pointer;
`

const SmallCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 120px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px #d1d1d1;
  color: white;
  background-color: #dddddd;
  font-size: 30px;
  cursor: pointer;
`




export default function CategoryNews() {
  const navigate = useNavigate()

  const list100 = SmallCategory[100].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list101 = SmallCategory[101].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  const list105 = SmallCategory[105].map(small =>
    <SmallCategoryBox
      key={small.code} 
      onClick={() => navigate(`/category/${small.code}`)}>
      {small.name}</SmallCategoryBox>
  )

  return (
    <CategoryNewsContainer>
      <BigCategoryBox onClick={() => navigate('/category/100')}>정치</BigCategoryBox>
      {list100}
      <BigCategoryBox onClick={() => navigate('/category/101')}>경제</BigCategoryBox>
      {list101}
      <BigCategoryBox onClick={() => navigate('/category/105')}>IT/과학</BigCategoryBox>
      {list105}
    </CategoryNewsContainer>
  )
}