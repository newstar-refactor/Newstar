package com.ssafy.newstar.domain.article.dto;
import com.ssafy.newstar.domain.record.entity.Record;
import lombok.Data;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ArticleDetailResponse {
  Long article_id;

  private String title;

  private String url;

  private LocalDateTime date;

  private int Bcategory;

  private int Scategory;

  private String image_url;

  private String content;

  private Boolean likes;

  public static ArticleDetailResponse createArticleDetailResponse(Record record) {
    ArticleDetailResponse articleResponse = new ArticleDetailResponse();
    articleResponse.article_id = record.getArticle().getId();
    articleResponse.title = record.getArticle().getTitle();
    articleResponse.url = record.getArticle().getUrl();
    articleResponse.date = record.getArticle().getDate();
    articleResponse.Bcategory = record.getArticle().getBcategory();
    articleResponse.Scategory = record.getArticle().getScategory();
    articleResponse.image_url = record.getArticle().getImageUrl();
    articleResponse.content = record.getArticle().getSummary();
    articleResponse.likes = record.getLikes();

    return articleResponse;
  }

}
