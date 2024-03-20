package com.ssafy.newstar.domain.article.dto;

import com.ssafy.newstar.domain.article.entity.Article;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ArticleResponse {
  Long id;

  private String title;

  private String url;

  private LocalDateTime date;

  private int Bcategory;

  private int Scategory;

  private String imageUrl;

  private String content;

  public static ArticleResponse createArticleResponse(Article article) {
    ArticleResponse articleResponse = new ArticleResponse();
    articleResponse.id = article.getId();
    articleResponse.title = article.getTitle();
    articleResponse.url = article.getUrl();
    articleResponse.date = article.getDate();
    articleResponse.Bcategory = article.getBcategory();
    articleResponse.Scategory = article.getScategory();
    articleResponse.imageUrl = article.getImageUrl();
    articleResponse.content = article.getContent();
    return articleResponse;
  }

  public static List<ArticleResponse> createArticleResponse(List<Article> articles) {
    return articles.stream().map(ArticleResponse::createArticleResponse).toList();
  }
}
