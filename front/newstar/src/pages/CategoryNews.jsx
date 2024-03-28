import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BigCategoryData, SmallCategoryData } from '../state/categoryData'

const CategoryNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px 90px;
`

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 2px 2px 7px 1px lightgray;
`

const BigCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 5px 5px 0px 0px;
  color: black;
  background-color: white;
  box-shadow: 2px 2px 7px 1px lightgray;
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
  height: 45px;
  color: black;
  background-color: white;
  border-bottom: 0.5px solid gray;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(138, 192, 56, 0.7);
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

  function mouseEvent(code, bool) {
    setHide(prev => ({ ...prev, [code]: bool}))
  }

  function renderSmallCategory(bigCategoryCode) {
    return SmallCategoryData[bigCategoryCode]?.map(small => (
      <SmallCategoryBox 
        key={small.code}
        onMouseEnter={() => mouseEvent(small.code, true)}
        onMouseLeave={() => mouseEvent(small.code, false)}
        onClick={() => navigate(`/newstar/category/${small.code}`)}>
          {small.name}
      </SmallCategoryBox>
    ))
  }

  return (
    <CategoryNewsContainer>
      {BigData.map((big) => (
        <CategoryBox key={big}
          onMouseEnter={() => mouseEvent(big.code, true)}
          onMouseLeave={() => mouseEvent(big.code, false)}>
          <BigCategoryBox
          onClick={() => navigate(`/newstar/category/${big.code}`)}
        >{big.name} 전체</BigCategoryBox>
          {hide[big.code] && renderSmallCategory(big.code)}
        </CategoryBox>
      ))}
    </CategoryNewsContainer>
  )
}