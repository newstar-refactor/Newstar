// 뉴스 카테고리별로 모아보기
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import { useRecoilState } from 'recoil'

import { getCategoryNews } from '../api/fetch'
import { categoryDataState } from '../state/atoms'
import CategoryNewsCard from '../components/main/CategoryNewsCard'
import { BigCategory, SmallCategory } from '../state/categoryData'

const CategoryNewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 80px;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  justify-content: center;
  margin-top: calc((100vh / 2) - 100px) ;
  padding: 20px;
  font-weight: 600;
`

export default function CategoryNewsDetail() {
  const params = useParams()

  // 뉴스 데이터
  const [categoryData, setCategoryData] = useRecoilState(categoryDataState)
  const [categoryTitle, setCategoryTitle] = useState('')
  
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (['100', '102', '103', '104', '101', '105'].includes(params.categoryId)) {
      getCategoryNews(
        params.categoryId, '', 10, 0,
        (response) => {
          setCategoryData(response.data.data.content)
          setCategoryTitle(BigCategory[params.categoryId])
        },
        ( error ) => {
          console.log(error)
        }
      )
    } else { // 중분류가 들어온경우
      getCategoryNews(
        '', params.categoryId, 10, 0,
        ( response ) => {
          setCategoryData(response.data.data.content)
          setCategoryTitle(SmallCategory[params.categoryId])
        },
        ( error ) => {
          console.log(error)
        }
      )
    }
  }, [])


  useEffect(() => {
    if (inView) {  // 대분류인 경우
      if (['100', '102', '103', '104', '101', '105'].includes(params.categoryId)) {
        getCategoryNews(
          params.categoryId, '', 10, page,
          ( response ) => {
            setCategoryData([...categoryData, ...response.data.data.content])
            setPage((page) => page + 1)
          },
          ( error ) => {
            console.log(error)
          }
        )
      } else { // 중분류가 들어온경우
        getCategoryNews(
          '', params.categoryId, 10, page,
          ( response ) => {
            setCategoryData([...categoryData, ...response.data.data.content])
            setPage((page) => page + 1)
          },
          ( error ) => {
            console.log(error)
          }
        )
      }
    }
  }, [inView])


  return (
    <CategoryNewsCardContainer>
      <div style={{ fontWeight: 900, fontSize: 20, textAlign: 'center' }}>{categoryTitle}</div>
      {categoryData.length > 0 ? categoryData.map((data) => (
          <CategoryNewsCard
            key={`${data.article_id}-${data.title}`}
            categoryData={data}
          />
      )) : <BoxContainer>결과가 존재하지 않습니다.</BoxContainer>}
      <div ref={ref}></div>
    </CategoryNewsCardContainer>
  
  )
}