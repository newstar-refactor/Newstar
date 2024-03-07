package com.ssafy.newstar.domain.recommend.entity;

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
@ToString(exclude = "member")
public class Recommend {
  @Id
  @GeneratedValue
  @Column(name = "keyword_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "article_id")
  Article article;

  private Integer score;

}
