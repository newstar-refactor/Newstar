import React from 'react';
import Lottie from 'lottie-react';

import likeLottie from '../assets/lottie/like.json';

import { BiBookmarkHeart, BiSolidBookmarkHeart } from 'react-icons/bi';

const LikeButton = ({ handleLikeButtonClick, isLiked }) => {
    // isLiked가 true이면, 채워진 북마크 / false면, 빈 북마크 활성화
    const likeBtn = isLiked ? (
        <BiSolidBookmarkHeart onClick={handleLikeButtonClick} style={{ cursor: 'pointer' }} size={45} color="#FFD4D4" />
    ) : (
        <BiBookmarkHeart
            onClick={handleLikeButtonClick}
            style={{ cursor: 'pointer', marginRight: '2px' }}
            size={40}
            color="lightgray"
        />
    );

    return <div>{likeBtn}</div>;
};

export default LikeButton;
