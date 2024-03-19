import styled from 'styled-components'
import BookMark from "./BookMark"

const MainNewsBodyWrapper = styled.div`
  padding: 20px;
`

export default function NewsBody({ newsData }) {
  return (
    <MainNewsBodyWrapper>
      <div>{newsData.content}</div>
      <br />
      <a href={newsData.url}><BookMark newsData={newsData} /></a>
    </MainNewsBodyWrapper>
  )
}