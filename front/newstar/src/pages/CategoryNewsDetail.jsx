// 뉴스 카테고리별로 모아보기
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import { useRecoilState } from 'recoil'

import { getCategoryNews } from '../api/fetch'
import { categoryDataState } from '../state/atoms'
import CategoryNewsCard from '../components/main/CategoryNewsCard'

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

  let categoryTitle = ''
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  const [categoryDatas, setCategoryDatas] = useRecoilState(categoryDataState)
  const [categoryPaging, setCategoryPaging] = useState({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장

  // category 별 데이터 불러오기
  useEffect(() => {
    if (['100', '102', '103', '104', '101', '105'].includes(params.categoryId)) {
      getCategoryNews(
        params.categoryId, '', 10, 0,
        ( response ) => {
          setCategoryDatas(response.data.data.content)
          setCategoryPaging(response.data.data.content)
        },
        ( error ) => {
          console.log(error)
        }
      )
    } else { // 중분류가 들어온경우
      getCategoryNews(
        '', params.categoryId, 10, 0,
        ( response ) => {
          setCategoryDatas(response.data.data.content)
          setCategoryPaging(response.data.data.content)
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
      {categoryTitle}
      {categoryDatas.length > 0 ? categoryDatas.map((categoryData) => (
          <CategoryNewsCard
            key={`${data.article_id}-${data.title}`}
            categoryData={data}
          />
      )) : <BoxContainer>결과가 존재하지 않습니다.</BoxContainer>}
      <div ref={ref}></div>
    </CategoryNewsCardContainer>
  
  )
}