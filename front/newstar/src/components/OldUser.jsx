import ModalComponent from "../Hooks/Modal";

// qr로 정보 불러오기
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jsQR from "jsqr";

import { postCheckmember } from "../api/fetch";

const AddQRContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const AddQrHead = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const FileContainer = styled.div`
  display: flex;
  gap: 10px;
`

const GetFileButton = styled.label`
  background-color: rgb(138, 192, 56, 0.7);
  color: white;
  padding: 7px 10px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
`

const StartButton = styled.button`
  background-color: rgb(138, 192, 56, 0.7);
  color: white;
  padding: 7px 10px;
  border-radius: 5px;
  border-style: none;
  font-size: 13px;
  cursor: pointer;
`

const InputCode = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const AddQrDescription = styled.div`
  font-size: 13px;
  color: gray;
`


function AddQR() {
  const [qrText, setQrText] = useState("");
  const [keyValue, setKeyValue] = useState("");

  const navigate = useNavigate()

  const handleReadQr = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();

        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            if(code.data == "null") {
              setQrText("인식할 수 없습니다");
            } else {
              setQrText(code.data);
            }
            setKeyValue(code.data);
          } else {
            alert("QR 코드를 인식할 수 없습니다.");
          }
        };
        image.src = imageData;
      };
      reader.readAsDataURL(file);
    }
  };

  const registKey = (event) => {
    postCheckmember(
      {pw: keyValue},
      (response) => {
        const isKey = response?.data.data
        console.log(isKey)

        if(isKey) {
          localStorage.setItem("X-USER-ID", keyValue);
          window.location.reload();
          navigate('/newstar')
        } else {
          alert("유효하지 않는 QR코드 입니다.")
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  return (
    <AddQRContainer>
      
      <AddQrHead>
      <h3>내 정보 불러오기</h3>
      <AddQrDescription>저장하신 QR코드 사진을 등록해주세요!</AddQrDescription>
      </AddQrHead>
      <FileContainer>
        <InputCode value={qrText} placeholder="첨부파일" />
        <GetFileButton className="input-file-button" htmlFor="input-file">
        <input type="file" id="input-file" style={{ display:"none" }} onChange={handleReadQr}/>
          파일선택
        </GetFileButton>
      </FileContainer>
        <StartButton onClick={registKey}>등록하고 시작하기</StartButton>
    </AddQRContainer>
  
  )



}



export default function OldUserModal({ isOldUserModalOpen, setIsOldUserModalOpen}) {
  return (
    <ModalComponent 
      isOpen={isOldUserModalOpen}
      setIsOpen={setIsOldUserModalOpen}
      modalContent={<AddQR/>}
      height={'200px'}
    />
  )
}