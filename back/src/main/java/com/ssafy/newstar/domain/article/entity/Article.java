package com.ssafy.newstar.domain.article.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Article {
  @Id
  @GeneratedValue
  @Column(name = "article_id")
  Long id;

  private String title;


  private LocalDateTime writedDate;

  private String url;

  private String img;

  private int Bcategory;

  private int Scategory;

  private String content;

  private String keyword;
}
