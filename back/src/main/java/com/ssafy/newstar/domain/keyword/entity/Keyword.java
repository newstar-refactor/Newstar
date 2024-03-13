package com.ssafy.newstar.domain.keyword.entity;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "article")
public class Keyword {
  @Id
  @GeneratedValue
  @Column(name = "keyword_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "article_id")
  private Article article;

  private String word;

  public static Keyword createKeyword(Article article, String word) {
    Keyword keyword = new Keyword();
    keyword.article = article;
    keyword.word = word;
    return keyword;
  }
}
