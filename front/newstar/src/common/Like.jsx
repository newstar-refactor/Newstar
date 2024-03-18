import React from "react";
import Lottie from "lottie-react"

import likeLottie from "../assets/lottie/like.json"

import { BiBookmarkHeart, BiSolidBookmarkHeart } from "react-icons/bi";

const LikeButton = ({ handleLikeButtonClick, isLiked }) => {

  // isLiked가 true이면, 채워진 북마크 / false면, 빈 북마크 활성화
  const likeBtn = isLiked ?
    <BiSolidBookmarkHeart 
      onClick={handleLikeButtonClick} 
      style={{cursor: 'pointer'}}
      size={40}
      color="pink"
       /> 
    // <Lottie 
    //   animationData={likeLottie}
    //   onClick={handleLikeButtonClick}
    //   style={{ width: 'auto', height: '80px'}} />
       :
    <BiBookmarkHeart
      onClick={handleLikeButtonClick} 
      style={{cursor: 'pointer'}}
      size={40}
      color="lightgray"
       />
    


  return (
    <div>
      {likeBtn}
    </div>
  )
};

export default LikeButton;
