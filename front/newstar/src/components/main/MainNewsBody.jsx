import styled from 'styled-components'
import BookMark from "./BookMark"

const MainNewsBodyWrapper = styled.div`
  padding: 20px;
`

export default function NewsBody({ recommendData }) {
  return (
    <MainNewsBodyWrapper>
      <div>{recommendData.content}</div>
      <br />
      <a href={recommendData.url}><BookMark recommendData={recommendData} /></a>
    </MainNewsBodyWrapper>
  )
}