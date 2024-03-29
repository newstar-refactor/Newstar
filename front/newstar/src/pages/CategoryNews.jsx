import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BigCategory, BigCategoryData, SmallCategoryData } from '../state/categoryData'

const CategoryNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
`

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-bottom: 0.5px solid lightgray;
`

const BigCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 60px;
  /* border-radius: 5px 5px 0px 0px; */
  color: black;
  background-color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(138, 192, 56, 0.7);
    color: white;
    transition: 0.5s;
  }

`

const SmallCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  color: black;
  background-color: white;
  border-bottom: 0.5px solid lightgray;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgb(138, 192, 56, 0.6);
    color: white;
    transition: 0.5s;
  }
`


export default function CategoryNews() {
  const navigate = useNavigate()
  const BigData = BigCategoryData
  
  const initialHideState = BigData.reduce((acc, cur) => {
    acc[cur.code] = false
    return acc
  }, {})

  const [hide, setHide] = useState(initialHideState)

  function mouseEvent(code) {
    setHide(prev => ({ ...prev, [code]: !prev[code]}))
  }

  function renderSmallCategory(bigCategoryCode) {
    return (
      <>
        <SmallCategoryBox 
        onClick={() => navigate(`/newstar/category/${bigCategoryCode}`)}>
          {BigCategory[bigCategoryCode]} 전체
        </SmallCategoryBox>
      {SmallCategoryData[bigCategoryCode]?.map(small => (
        <SmallCategoryBox 
          key={small.code}
          onClick={() => navigate(`/newstar/category/${small.code}`)}>
            {small.name}
        </SmallCategoryBox>
    ))
  }
  </>)
  }

  return (
    <CategoryNewsContainer>
      {BigData.map((big) => (
        <CategoryBox key={big.code}>
          <BigCategoryBox
          onClick={() => mouseEvent(big.code)}
        >{big.name}</BigCategoryBox>
          {hide[big.code] && renderSmallCategory(big.code)}
        </CategoryBox>
      ))}
    </CategoryNewsContainer>
  )
}
