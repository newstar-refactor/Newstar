import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const LikeButton = ({ handleButtonClick }) => {

  // isLiked가 true이면, 채워진 북마크 / false면, 빈 북마크 활성화
  const likeBtn = isLiked ? (
    <FaBookmark onClick={handleButtonClick} />
  ) : (
    <FaRegBookmark onClick={handleButtonClick} />
  );

  return (
    <div>
      {likeBtn}
    </div>
  )
}

export default LikeButton;
