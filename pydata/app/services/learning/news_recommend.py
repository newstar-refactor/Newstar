from gensim.models import Doc2Vec

def recomm(like_list, maxsize, views):
    # 모델 불러오기
    model = Doc2Vec.load('news.doc2vec')
    # 가장 유사한 문서들의 ID 찾기
    # 좋아요한 갯수가 1이상이면 좋아요한 기사 기준 추천
    if len(like_list) != 0:
        similar_docs = model.dv.most_similar(positive=[like_list], topn=maxsize)
    else:
        similar_docs = model.dv.most_similar(positive=[20], topn=maxsize)
    # 결과 문서들의 ID만 추출
    doc_ids = [doc_id for doc_id, _ in similar_docs]
    print(doc_ids)
    return doc_ids