import axios from "axios"

const BASEAPI = 'https://i10b302.p.ssafy.io/api'

const api = {
  news: `${BASEAPI}/news`,
  word: `${BASEAPI}/word`,
  recommend: `${BASEAPI}/recommend`,
  record: `${BASEAPI}/record`
}

export default api