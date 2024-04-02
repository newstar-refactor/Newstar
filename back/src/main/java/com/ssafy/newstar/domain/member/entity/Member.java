package com.ssafy.newstar.domain.member.entity;

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
public class Member {

  @Id
  @GeneratedValue
  @Column(name = "member_id")
  private Long id;

  @Column(unique = true)
  private String pw;

  private LocalDateTime signDate;

  public static Member createMember(String pw) {
    Member member = new Member();
    member.pw = pw;
    member.signDate = LocalDateTime.now();
    return member;
  }
}