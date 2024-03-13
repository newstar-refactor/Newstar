// 검색바

export default function SearchBar({setKeyword}) {
  return (
    <div>
      <input 
        type="text"
        placeholder="키워드를 입력하세요."
        onChange={(e) => setKeyword(e.target.value)}
         />
    </div>
  )
}