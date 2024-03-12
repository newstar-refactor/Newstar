package com.ssafy.newstar.domain.article.entity;

import jakarta.persistence.*;

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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "article_id")
  Long id;

  private String title;

  private String url;

  private LocalDateTime date;

  private int Bcategory;

  private int Scategory;

  private String imageUrl;

  @Column( length=10000 )
  private String content;
}
