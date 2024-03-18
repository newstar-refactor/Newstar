import React from "react";
import Lottie from "lottie-react"

import likeLottie from "../assets/lottie/like.json"

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const LikeButton = ({ handleLikeButtonClick, isLiked }) => {

  // isLiked가 true이면, 채워진 북마크 / false면, 빈 북마크 활성화
  const likeBtn = isLiked ?
    <FaBookmark 
      onClick={handleLikeButtonClick} 
      style={{cursor: 'pointer'}}
      size={30}
       /> 
    // <Lottie 
    //   animationData={likeLottie}
    //   onClick={handleLikeButtonClick}
    //   style={{ width: 'auto', height: '80px'}} />
       :
    <FaRegBookmark 
      onClick={handleLikeButtonClick} 
      style={{cursor: 'pointer'}}
      size={30}
       />
    


  return (
    <div>
      {likeBtn}
    </div>
  )
};

export default LikeButton;
