from gensim.models import Doc2Vec

def recomm():
    # 모델 불러오기
    model = Doc2Vec.load('dart.doc2vec')

    # 예시: 가장 유사한 문서들 찾기
    return model.dv.most_similar(positive=[ '\n"오픈AI의 GPT-4, 저작권 보호 수준 최악"\n'],  topn=20)