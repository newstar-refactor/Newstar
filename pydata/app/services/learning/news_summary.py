from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration

def load_kobart_model_and_tokenizer():
    # KoBART 모델과 토크나이저 로딩
    tokenizer = PreTrainedTokenizerFast.from_pretrained("gogamza/kobart-base-v1")
    model = BartForConditionalGeneration.from_pretrained("gogamza/kobart-base-v1")
    return model, tokenizer

def summarize_text(text, model, tokenizer):
    # 입력 텍스트를 토크나이즈하여 모델에 입력 가능한 형태로 변환
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)

    # 요약 수행
    summary_ids = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)

    # 요약 결과 텍스트 반환
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# 모델과 토크나이저 로딩
def make_news_summary(text):
    model, tokenizer = load_kobart_model_and_tokenizer()
    # 텍스트 요약 수행
    summary = summarize_text(text, model, tokenizer)

    return summary
# 요약 결과 출력
print(summary)
