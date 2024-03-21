import Modal from 'react-modal'
import QRCode from 'qrcode.react'
import styled from 'styled-components'

import NextButton from '../common/Button'
import { useNavigate } from 'react-router-dom'

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
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
    width: "50%",
    height: "50%",
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

function CreateQR() {
  const navigate = useNavigate()
  const key = localStorage.getItem('X-USER-ID')

  function handleDownloadClick() {
    const canvas = document.querySelector('canvas')
    const url = canvas ? canvas.toDataURL('image/png') : ''
    const link = document.createElement('a');
    link.href = url;
    link.download = `newstar-key.png`;
    link.click();
    console.log('저장완')

    navigate('/newstar')
  }

  return (
    <QRWrapper>
      <div>QR코드를 저장하시면,</div> 
      <div>추후 내 기록을 다시 볼 수 있습니다.</div>
      <QRCode value={key} />
      <NextButton onClick={handleDownloadClick}/>
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
      contentLabel="user_key"
      shouldCloseOnOverlayClick={false}
    >
      <CreateQR/>
    </Modal>
  );
}
export default QRModal 