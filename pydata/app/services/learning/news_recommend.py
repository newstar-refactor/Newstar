from gensim.models import Doc2Vec

def recomm(like_list):
    # 모델 불러오기
    model = Doc2Vec.load('news.doc2vec')

    # 가장 유사한 문서들의 ID 찾기
    similar_docs = model.dv.most_similar(positive=[like_list], topn=20)

    # 유사한 문서들의 ID만 추출
    doc_ids = [doc_id for doc_id, _ in similar_docs]

    return doc_ids