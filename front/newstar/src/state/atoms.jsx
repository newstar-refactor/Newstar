import { atom } from "recoil"

const newsDataState = atom({
  key: "newsDataState",
  default: ""
})

const wordState = atom({
  key: "atomState",
  default: ""
})

const recommendDataState = atom({
  key: "recommendState",
  default: ""
})

const recordDataState = atom({
  key: "recordState",
  default: ""
})

export { newsDataState, wordState, recommendDataState, recordDataState }