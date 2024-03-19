from gensim.models import Doc2Vec

def recomm(like_list):
    # 모델 불러오기
    model = Doc2Vec.load('news.doc2vec')
    print(type(like_list))
    # 가장 유사한 문서들의 ID 찾기
    if type(like_list) is not str:
        similar_docs = model.dv.most_similar(positive=[like_list], topn=20)
        print(like_list)
    else:
        similar_docs = model.dv.most_similar(positive=[20], topn=20)
    # 유사한 문서들의 ID만 추출
    doc_ids = [doc_id for doc_id, _ in similar_docs]

    return doc_ids