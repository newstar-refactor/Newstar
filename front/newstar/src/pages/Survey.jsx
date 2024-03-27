import Modal from 'react-modal'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const customModal =  Modal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    minWidth: "400px",
    maxWidth: "70%",
    height: "70%",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

const SurveyTitle = styled.h2`
  display: flex;
  justify-content: center;
`

const SurveyQuestion = styled.div`
  font-size: 14px;
`

const SurveyDescription = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 13px;
`


const SurveyContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const AnswerWrapper = styled.div`
  display: flex;
  gap: 10px;
`


function SelectAnswer({ qId, qName }) {
  const Answers = ['매우 만족', '만족', '보통', '불만족', '매우 불만족']

  return (
    <>
      {Answers.map((answer, idx) => (
          <AnswerWrapper key={idx}>
            <input type="radio" id={`${qId}${idx}`} value={`${qId}${idx}`} name={qName} />
            <label htmlFor={`${qId}${idx}`} style={{fontSize: '13px'}}>{answer}</label>
          </AnswerWrapper>))
      }
    </>
  )
}



function SurveyContent() {
  const navigate = useNavigate()

  return (
    <SurveyContents>
      <SurveyTitle>깜짝설문 !</SurveyTitle>
      <SurveyDescription>참여해주신 분들께 추첨을 통해 커피쿠폰을 드립니다!</SurveyDescription>
      <br />
      <SurveyContents>
      <SurveyQuestion>서비스를 이용한 환경이 무엇인가요? </SurveyQuestion>
      <select name="device" id="device">
        <option value="pc">PC</option>
        <option value="mobile">Mobile</option>
      </select>

      <SurveyQuestion>뉴스 기사의 카테고리가 다양한가요?</SurveyQuestion>
      <AnswerWrapper>
        <input type="radio" id="check1" name="category" />
        <label htmlFor="check1" style={{fontSize: '13px'}}> 네, 다양합니다. </label>
      </AnswerWrapper>
      <AnswerWrapper>
        <input type="radio" id="check2" name="category" />
        <label htmlFor="check2" style={{fontSize: '13px'}}> 적당합니다. </label>
      </AnswerWrapper>
      <AnswerWrapper>
        <input type="radio" id="check3" name="category" />
        <label htmlFor="check3" style={{fontSize: '13px'}}> 부족한 것 같네요. </label>
      </AnswerWrapper>
      
      <br />
      <h4>웹 사이트의 시각적인 부분에 관한 질문입니다.</h4>
      <SurveyQuestion>웹 사이트의 시각적 매력에 대해서 평가해주세요.</SurveyQuestion>
      <input type="text" />
      <SurveyQuestion>웹 사이트의 페이지 가독성에 대해 평가해주세요.</SurveyQuestion>
      <SelectAnswer qId={'read'} qName={'read'} />

      <br />
      <h4>웹 사이트 컨텐츠 품질에 관한 질문입니다.</h4>
      <SurveyQuestion>웹 사이트의 로딩 속도에 만족하십니까?</SurveyQuestion>
      <SelectAnswer qId={'loading'} qName={'loading'}/>
      <SurveyQuestion>웹 사이트 사용자 경험(페이지 이동의 편의성, 버튼 및 링트의 명확성 등)에 만족하십니까?</SurveyQuestion>
      <SelectAnswer qId={'user'} qName={'user'}/>
      </SurveyContents>
      <button>참여완료</button>
    </SurveyContents>
  )
}

function Survey({ surveyModalOpen, setSurveyModalOpen }) {
  return (
    <Modal
      isOpen={surveyModalOpen}
      onRequestClose={() => setSurveyModalOpen}
      style={customModal}
      ariaHideApp={false}
      contentLabel="user_survey"
    >
      <SurveyContent />
    </Modal>
  )
}

export default Survey