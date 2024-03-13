import React from "react";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const LikeButton = ({ handleLikeButtonClick, isLiked }) => {

  // isLiked가 true이면, 채워진 북마크 / false면, 빈 북마크 활성화
  const likeBtn = isLiked ? (
    <FaBookmark onClick={handleLikeButtonClick} style={{cursor: 'pointer'}} />
  ) : (
    <FaRegBookmark onClick={handleLikeButtonClick} style={{cursor: 'pointer'}} />
  );

  return (
    <div>
      {likeBtn}
    </div>
  )
};

export default LikeButton;
