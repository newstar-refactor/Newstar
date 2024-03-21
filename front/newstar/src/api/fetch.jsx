import { api, axiosInstance } from "./api"

// 뉴스 데이터 조회
function getNews(success, fail) {
  return axiosInstance.get(api.news)
    .then(success)
    .catch(fail)
}

// 검색어로 뉴스 조회
function searchNews(searchWord, success, fail) {
  return axiosInstance.post(api.search, searchWord)
    .then(success)
    .catch(fail)
}

// 이전 데이터 불러오기
function getMembers(success, fail) {
  return axiosInstance.get(api.members)
    .then(success)
    .catch(fail)
}

// 새로운 회원 등록
function postMembers(cate, success, fail) {
  return axiosInstance.post(api.members, cate)
    .then(success)
    .catch(fail)
}

// 시청기록 조회
function getRecords(success, fail) {
  return axiosInstance.get(api.records)
    .then(success)
    .catch(fail)
}

// 좋아요 목록 조회
function getLikes(success, fail) {
  return axiosInstance.get(api.like)
    .then(success)
    .catch(fail)
}

// 키워드 조회
function getKeyword(success, fail) {
  return axiosInstance.get(api.keywords)
    .then(success)
    .catch(fail)
}

// 카테고리별로 조회
function getCategoryNews(cate, newsNum, pageNum, success, fail) {
  const categoryUrl = api.category(cate, newsNum, pageNum)
  return axiosInstance.get(categoryUrl)
    .then(success)
    .catch(fail)
}

// 카테고리 페이징 데이터 조회
function getPagingNews(cate, success, fail) {
  return axiosInstance.get(`${api.paging}/${cate}`)
    .then(success)
    .catch(fail)
}

export { getNews,
  searchNews, 
  getMembers, 
  postMembers, 
  getRecords, 
  getLikes,
  getKeyword,
  getCategoryNews,
  getPagingNews
}
