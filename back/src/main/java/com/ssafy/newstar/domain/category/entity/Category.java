package com.ssafy.newstar.domain.category.entity;

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
public class Category {

  @Id
  @GeneratedValue
  @Column(name = "category_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  private Integer number;

  public static Category createCategory(Member member, Integer number) {
    Category category = new Category();
    category.member = member;
    category.number = number;
    return category;
  }
}
