// 메인 숏폼 페이지
// 뉴스 기사 좌우로 스크롤

import { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isStartState, newsDataState } from '../state/atoms';
import { checkAnswer, getNews, postRecords } from '../api/fetch';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { TourProvider } from '@reactour/tour';

import Logo from '../assets/logo_dark.png';
import Loading from '../components/Loading';
import MainNewsCard from '../components/main/MainNewsCard';
import Survey from './Survey';
import { useTour } from '@reactour/tour';
import TourExample from '../components/main/TourExample';

const steps = [
    {
        selector: '[data-tour="tag"]',
        content: '해시태그를 선택하면 동일한 카테고리의 뉴스를 볼 수 있어요!',
    },
    {
        selector: '[data-tour="like"]',
        content: '좋아요를 누르면 선호하는 뉴스를 모아볼 수 있어요!',
    },
    {
        selector: '[data-tour="link"]',
        content: '북마크를 누르면 기사를 상세하게 읽어볼 수 있어요!',
    },
    {
        selector: '[data-tour="slider"]',
        content: '뉴스 숏폼을 양쪽으로 슬라이딩하여 넘길 수 있어요!',
    },
];

const StyledSlider = styled(Slider)`
    .slick-slide {
        height: 0px !important;
    }
    .slick-slide.slick-active {
        height: 100% !important;
    }
`;

const tourData = {
    article_id: 0,
    bcategory: 100,
    content:
        '바쁜 현대인을 위한 플랫폼인 뉴스타를 출시했습니다. 해당 플랫폼은 개인 맞춤형 뉴스를 추천해주며, 숏폼 형식으로 사용자 경험을 향상시켰습니다.',
    date: '2024-03-27T21:21:01',
    image_url: Logo,
    scategory: 267,
    title: '한손으로 읽는 숏폼 트렌드 짧은 NEWS, 뉴스타',
    url: 'https://newstar.world',
};

export default function ShortForm() {
    const [newsDatas, setNewsDatas] = useRecoilState(newsDataState);
    const [isStarted, setIsStarted] = useRecoilState(isStartState);
    const [viewArticles, setViewArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    // news data 2번 Fetch 되는 거 방지
    // const [isEnter, setIsEnter] = useState(false);
    // 하나의 news fetch에 3번 이상 설문 안되게 방지
    const [isSurvey, setIsSurvey] = useState(false);
    const [surveyModalOpen, setSurveyModalOpen] = useState(false);
    const [checkSurvey, setCheckSurvey] = useState(false);
    const [surveyNumber, setSurveyNumber] = useState(Math.floor(Math.random() * 9) + 7);
    // 현재 current index
    const [sliceIndex, setSliceIndex] = useState(0);
    const [isImageLoad, setIsImageLoad] = useState(false);
    const { setIsOpen, isOpen } = useTour();

    // 뉴스 데이터 로드
    // useEffect(() => {
    //     setLoading(true);
    //     getNews(
    //         (response) => {
    //             setNewsDatas(response.data);
    //             setLoading(false);
    //             checkAnswer(
    //                 (response) => {
    //                     setCheckSurvey(response.data.data.haveAnswer);
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                 }
    //             );
    //         },
    //         (error) => {
    //             console.log(error);
    //             setLoading(false);
    //         }
    //     );
    // }, []);

    // 첫 페이지 로드 시 시청 기록 생성
    useEffect(() => {
        if (newsDatas.length > 0) {
            const firstNewsData = newsDatas[0];
            // 중복 검사
            // newsDatas 배열의 첫 번째 요소가 이미 viewArticles 배열에 포함되어 있는지 확인
            if (!viewArticles.includes(firstNewsData.article_id)) {
                postRecordForNews(firstNewsData.article_id);
            }
        }
    }, [newsDatas]); // newsDatas 상태가 변경될 때마다 실행

    useEffect(() => {
        if (isImageLoad && isStarted && !isOpen) {
            setIsStarted(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isImageLoad) {
            setIsOpen(true);
        }
    }, [isImageLoad]);

    const postRecordForNews = (articleId) => {
        const mynews = { articleId };
        postRecords(
            mynews,
            (response) => {
                setViewArticles((prev) => [...prev, articleId]);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const loadMoreNews = () => {
        getNews(
            (response) => {
                setNewsDatas((prevNews) => [...prevNews, ...response.data]);
            },
            (error) => {
                console.log(error);
            }
        );
    };
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: async (curr, next) => {
            // 중복 검사
            // 현재 보여지는 뉴스 기사의 article_id가 viewArticles 배열에 이미 존재하는지 확인
            if (!viewArticles.includes(newsDatas[next].article_id)) {
                postRecordForNews(newsDatas[next].article_id);
            }

            // 마지막 슬라이드인 경우 추가 데이터 로드
            if (next === newsDatas.length - 1 && !loading) {
                await loadMoreNews();
                if (!checkSurvey) {
                    setSurveyNumber(sliceIndex * 30 + Math.floor(Math.random() * 9) + 7);
                    setIsSurvey(false);
                }
            }

            if (next === surveyNumber && !checkSurvey) {
                if (!isSurvey) {
                    setSliceIndex((prev) => prev + 1);
                    setSurveyNumber(sliceIndex * 30 + Math.floor(Math.random() * 9) + 20);
                    setIsSurvey(true);
                }
                setSurveyModalOpen(true);
            }
        },
    };

    if (loading && !isStarted) {
        return <Loading />;
    }

    return (
        <>
            {isStarted && <TourExample newsData={tourData} setIsImageLoad={setIsImageLoad} />}
            {!isStarted && (
                <StyledSlider {...sliderSettings}>
                    {newsDatas &&
                        newsDatas.map((newsData) => <MainNewsCard key={newsData.article_id} newsData={newsData} />)}
                </StyledSlider>
            )}
            <Survey
                setCheckSurvey={setCheckSurvey}
                surveyModalOpen={surveyModalOpen}
                setSurveyModalOpen={setSurveyModalOpen}
            />
        </>
    );
}
