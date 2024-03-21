import axios from "axios"

const BASEAPI = 'http://localhost:8080/api'

const api = {
  model: '/data/news/model',
  news: '/data/news',
  members: '/members',
  records: '/records',
  like: '/recodes/likes',
  keywords: '/keywords',
  category: (cate, newsNum, pageNum) => `/articles/${cate}?size=${newsNum}&page=${pageNum}`,
}

const axiosInstance = axios.create({
  baseURL: BASEAPI
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('X-USER-ID')
    config.headers['X-USER-ID'] = accessToken
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// X-USER-ID: 헤더로 보낼 이름 입니다
export { api, axiosInstance }