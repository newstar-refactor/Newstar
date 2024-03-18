import axios from "axios"

const BASEAPI = 'https://www.newstar.world/api'

const api = {
  news: '/data/news',
  members: '/members',
  recodes: '/recodes',
  like: '/recodes/likes',
  keywords: '/keywords',
  category: '/category',
  paging: '/category/paging'
}

const axiosInstance = axios.create({
  baseURL: `${BASEAPI}`,
  headers: {
    key: 'key'
  }
})

export { api, axiosInstance }