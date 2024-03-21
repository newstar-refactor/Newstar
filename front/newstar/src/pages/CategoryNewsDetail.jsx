// 뉴스 카테고리별로 모아보기
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { useRecoilState } from 'recoil'

import { getCategoryNews, getPagingNews } from '../api/fetch'
import { categoryDataState } from '../state/atoms'
import CategoryNewsCard from '../components/main/CategoryNewsCard'

const CategoryNewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
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


export default function CategoryNewsDetail() {
  
  const params = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  // const [categoryDatas, setCategoryDatas] = useRecoilState(categoryDataState)
  const [categoryDatas, setCategoryDatas] = useState([])
  // const [categoryPaging, setCategoryPaging] = useState({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장
  const [categoryPaging, setCategoryPaging] = useState([]); // API로부터 받아온 다음 페이지 데이터를 저장

  // category 별 데이터 불러오기
  useEffect(() => {

    setLoading(true)

    getCategoryNews(
      params.categoryId, 5, 1,
      ({ response }) => {
        setCategoryDatas(response.content)
        setCategoryPaging(response.content)
      },
      (error) => {
        console.log(error)
      }
    )

    setLoading(false)
  },[])

  // 페이지 끝에 닿으면 추가 데이터 불러오기
  function fetchMoreDatas() {
    setFetching(true)

    getCategoryNews(
      101, 5, currentPage + 1,
      ({ response }) => {
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
    <CategoryNewsCardContainer>
      {categoryDatas.map((categoryData) => (
        <CategoryNewsCard
          key={`${categoryData.id}-${categoryData.title}`}
          categoryData={categoryData}
        />
      ))}
    </CategoryNewsCardContainer>
  )
}