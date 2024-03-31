// 검색 시 나오는 뉴스 리스트
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postRecords } from '../../api/fetch';

// styled-components
const BoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 10px;
    cursor: pointer;
    // border-bottom: 1px solid #ccc;
    height: 75px;
`;

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    font-size: 16px;
    font-weight: 600;
    min-height: calc(100vh - 190px);
`;

const SearchNewsCardImage = styled.img`
    width: 30%;
    border-radius: 5px;
`;

const SearchTitle = styled.div`
    font-size: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 70%;
`;

const SearchNewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 80px;
`;

const SearchNewsList = ({ NewsData }) => {
    const navigate = useNavigate();

    const handleNewsClick = (articleId) => {
        const mynews = { articleId };
        postRecords(
            mynews,
            (response) => {
                navigate(`/newstar/${articleId}`);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <SearchNewsCardContainer>
            {NewsData.length > 0 ? (
                NewsData.map((newsItem, index) => (
                    <>
                    <BoxContainer key={newsItem.article_id} onClick={() => handleNewsClick(newsItem.article_id)}>
                        <SearchNewsCardImage src={newsItem.image_url} alt="news image" />
                        <SearchTitle>{newsItem.title}</SearchTitle>
                    </BoxContainer>
                    <hr color="lightgray" border-width="1px" />
                    </>
                ))
            ) : (
                <EmptyContainer>찾으시는 기사가 없습니다 😅</EmptyContainer>
            )}
        </SearchNewsCardContainer>
    );
};

export default SearchNewsList;
