import pandas as pd
from mecab import MeCab
from gensim.models.doc2vec import TaggedDocument
from tqdm import tqdm

import re
from gensim.models import doc2vec

def makeModel():
    news_df = pd.read_csv('category_articles.csv')
    news_df = news_df.dropna()

    mecab = MeCab()

    tagged_corpus_list = []

    for index, row in tqdm(news_df.iterrows(), total=len(news_df)):
        text = row['content']
        # 본문 기호 제거
        text = re.sub('[-=+,#/\?:^.@*\"※~ㆍ!』‘|\(\)\[\]`\'…》\”\“\’·]', ' ', text)
        tag = row['title']
        tagged_corpus_list.append(TaggedDocument(tags=[tag], words=mecab.nouns(text)))

    model = doc2vec.Doc2Vec(vector_size=300, alpha=0.025, min_alpha=0.025, workers=16, window=5)

    # Vocabulary 빌드
    model.build_vocab(tagged_corpus_list)

    # Doc2Vec 학습
    model.train(tagged_corpus_list, total_examples=model.corpus_count, epochs=10)

    # 모델 저장
    model.save('dart.doc2vec')

    return {"message": "complete make model"}