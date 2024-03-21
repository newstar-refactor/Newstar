package com.ssafy.newstar.domain.record.dto;

import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.record.entity.Record;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ToString
public class RecordResponse {
    Long id;

    private String title;

    private String content;

    public static RecordResponse createRecordResponse(Article article) {
        RecordResponse recordResponse = new RecordResponse();
        recordResponse.id = article.getId();
        recordResponse.title = article.getTitle();
        recordResponse.content = article.getContent();
        return recordResponse;
    }

    public static List<RecordResponse> createRecordResponse(List<Article> articles) {
        return articles.stream().map(RecordResponse::createRecordResponse).toList();
    }
}
