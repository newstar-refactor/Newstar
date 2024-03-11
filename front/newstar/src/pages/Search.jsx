// 기사 검색 페이지
// 키워드로 뉴스 실시간 검색
import SearchBar from '../components/SearchBar'
import SearchNewsList from '../components/main/SearchNewsList'

export default function Search() {
  return (
    <div>
      <div>검색페이지</div>
      <SearchBar />
      <SearchNewsList/>
    </div>
  )
}