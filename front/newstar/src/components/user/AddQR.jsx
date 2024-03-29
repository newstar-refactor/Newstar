// qr로 정보 불러오기
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from 'react';
import jsQR from "jsqr";

export default function AddQR() {
  const [qrText, setQrText] = useState("");

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
            setQrText(code.data);
            localStorage.setItem("X-USER-ID", code.data);
            window.location.reload();
          } else {
            alert("QR 코드를 인식할 수 없습니다.");
          }
        };
        image.src = imageData;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>내정보 불러오기 </h3>

      <div>
        <input type="file" onChange={handleReadQr} />
        <p>QR 코드 내용: {qrText}</p>
      </div>
    </div>
  );
}
