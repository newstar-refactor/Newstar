import Modal from 'react-modal'
import QRCode from 'qrcode.react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { userKeyState } from '../state/atoms'

import NextButton from '../common/Button'
import { useNavigate } from 'react-router-dom'

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const Warning1 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: gray;
`

const Warning2 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;

`

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

function CreateQR({ setModalOpen }) {
  const navigate = useNavigate()

  function handleDownloadClick() {
    const canvas = document.querySelector('canvas')
    const url = canvas ? canvas.toDataURL('image/png') : ''
    const link = document.createElement('a');
    link.href = url;
    link.download = `newstar-key.png`;
    link.click();
  }

  const userKey = useRecoilValue(userKeyState)

  return (
    <QRWrapper>
      <WarningWrapper>
        <Warning2>앱이 삭제되면 기록이 삭제됩니다!</Warning2>
        <Warning1>QR코드를 저장하시면,</Warning1> 
        <Warning1>언제든지 내 기록을 불러올 수 있습니다.</Warning1> 
      </WarningWrapper>
      <QRCode value={userKey} size={220} />
      <ButtonWrapper>
        <NextButton onClick={handleDownloadClick} content={"다운로드"} />
        <NextButton onClick={()=>navigate('/newstar')} content={"시작하기"} />
      </ButtonWrapper>
    </QRWrapper>
  )
}

function QRModal({ modalOpen, setModalOpen }) {

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
      contentLabel="user_key"
    >
      <CreateQR setModalOpen={setModalOpen} />
    </Modal>
  );
}
export default QRModal 