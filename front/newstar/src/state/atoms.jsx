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

export { newsDataState, wordState, recommendDataState }