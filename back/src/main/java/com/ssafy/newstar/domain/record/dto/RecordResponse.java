package com.ssafy.newstar.domain.record.dto;

import com.ssafy.newstar.domain.article.entity.Article;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class RecordResponse {
    Long id;

    private String title;

    private Integer scategory;

    public static RecordResponse createRecordResponse(Article article) {
        RecordResponse recordResponse = new RecordResponse();
        recordResponse.id = article.getId();
        recordResponse.title = article.getTitle();
        recordResponse.scategory = article.getScategory();
        return recordResponse;
    }

    public static List<RecordResponse> createRecordResponse(List<Article> articles) {
        return articles.stream().map(RecordResponse::createRecordResponse).toList();
    }
}
