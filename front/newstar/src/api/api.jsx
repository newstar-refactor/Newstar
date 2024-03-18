import axios from "axios"

const BASEAPI = 'https://www.newstar.world/'

const api = {
  news: `${BASEAPI}/news`,
  word: `${BASEAPI}/word`,
  recommend: `${BASEAPI}/recommend`,
  record: `${BASEAPI}/record`
}

export default api