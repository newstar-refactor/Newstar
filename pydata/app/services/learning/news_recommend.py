from gensim.models import Doc2Vec
import numpy as np
import time


def recomm(like_list, maxsize, views):
    start_time = time.time()  # 함수 실행 시작 시간 측정
    # 모델 불러오기
    model = Doc2Vec.load('news.doc2vec')


    # 가장 유사한 문서들의 ID 찾기
    # 좋아요한 갯수가 1이상이면 좋아요한 기사 기준 추천
    if len(like_list) != 0:
        similar_docs = model.dv.most_similar(positive=like_list, topn=maxsize)
    else:
        similar_docs = model.dv.most_similar(positive=[1], topn=maxsize)

    # 유사도 점수에 doc_id를 활용하여 가중치 적용
    weighted_similar_docs = [(doc_id, similarity * exp_weight(doc_id, maxsize)) for doc_id, similarity in similar_docs]

    # 가중치 적용 후 유사도 점수에 따라 정렬
    weighted_similar_docs.sort(key=lambda x: x[1], reverse=True)

    # 결과 문서들의 ID만 추출
    doc_ids = [doc_id for doc_id, _ in similar_docs]

    # 이미 본 뉴스들 제거
    views_set = set(views)
    filtered_doc_ids = [doc_id for doc_id in doc_ids if doc_id not in views_set]

    filtered_doc_ids = filtered_doc_ids[100: 600]

    return filtered_doc_ids

# 로그 스케일 가중치 계산 함수
def log_weight(id, max_id):
    return np.log(id + 1) / np.log(max_id + 1)

# 선형 스케일 가중치 계산 함수
def linear_weight(id, max_id):
    return id / max_id

# 지수 스케일 가중치 계산 함수
def exp_weight(id, max_id,factor=4):
    normalized_value = id / max_id
    # 정규화된 값에 factor를 곱한 후, 이 값을 지수 함수에 적용합니다.
    # factor 값은 가중치 증가율을 조절.
    return np.exp(factor * normalized_value) / np.exp(factor)