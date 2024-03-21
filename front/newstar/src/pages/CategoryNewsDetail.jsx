// 뉴스 카테고리별로 모아보기
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'

import { getCategoryNews } from '../api/fetch'
import { categoryDataState } from '../state/atoms'
import CategoryNewsCard from '../components/main/CategoryNewsCard'

const CategoryNewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`


export default function CategoryNewsDetail() {
  
  const params = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  const [categoryDatas, setCategoryDatas] = useRecoilState(categoryDataState)
  const [categoryPaging, setCategoryPaging] = useState({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장

  // category 별 데이터 불러오기
  useEffect(() => {

    setLoading(true)

    // 대분류일 경우
    if ([100, 101, 105].includes(params.categoryId)) {
      getCategoryNews(
        params.categoryId, '', 5, 0,
        ( response ) => {
          setCategoryDatas(response.content)
          setCategoryPaging(response.content)
          console.log(response)
        },
        ( error ) => {
          console.log(error)
        }
      )
    } else { // 중분류가 들어온경우
      getCategoryNews(
        '', params.categoryId, 5, 0,
        ( response ) => {
          setCategoryDatas(response.content)
          setCategoryPaging(response.content)
        },
        ( error ) => {
          console.log(error)
        }
      )
    }

    setLoading(false)
  },[])

  // 페이지 끝에 닿으면 추가 데이터 불러오기
  function fetchMoreDatas() {
    setFetching(true)

    if ([100, 101, 105].includes(params.categoryId)) {
      getCategoryNews(
        params.categoryId, '', 5, currentPage + 1,
        ( response ) => {
          const fetchedData = response.content
          const mergedData = categoryDatas.concat(...fetchedData)
          setCategoryDatas(mergedData)
          setCurrentPage(currentPage + 1)
          setFetching(false)
        },
        ( error ) => {
          console.log(error)
          setFetching(false)
        }
      )
    } else {
      getCategoryNews(
        '', params.categoryId, 5, currentPage + 1,
        ( response ) => {
          const fetchedData = response.content
          const mergedData = categoryDatas.concat(...fetchedData)
          setCategoryDatas(mergedData)
          setCurrentPage(currentPage + 1)
          setFetching(false)
        },
        (error) => {
          console.log(error)
          setFetching(false)
        }
      )
    }


  }

  // 스크롤 이벤트 핸들러
  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 5 && fetching === false) {
      // 페이지 끝에 도달 -> 추가 데이터
      fetchMoreDatas();
  }};

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    // <CategoryNewsCardContainer>
    //   {categoryDatas.map((categoryData) => (
    //     <CategoryNewsCard
    //       key={`${categoryData.id}-${categoryData.title}`}
    //       categoryData={categoryData}
    //     />
    //   ))}
    // </CategoryNewsCardContainer>
    <div></div>
  )
}