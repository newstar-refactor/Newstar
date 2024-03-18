// 보류

// 추가 회원 정보 입력 페이지
// 로그인 후, 추천을 위한 추가 정보 입력 받음



export default function AddInfo() {
  const age = 10
  return (
    <div>
      <h2>보다 정확한 추천을 위해 정보를 입력해 주세요.</h2>

      <div>
        <div>닉네임</div>
        <input type="text" />
      </div>
      <div>
        <div>이메일</div>
        <input type="text" />
      </div>
      <div>
        <div>성별</div>
        <select name="gender" id="">
          <option value="">성별을 선택하세요.</option>
          <option value="man">남</option>
          <option value="woman">여</option>
        </select>
      </div>
      <div>
        <div>나이</div>
        <input type="number" />
      </div>
    </div>
  )
}