package com.newstar.gateway.domain.member.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Table("member") // 테이블 이름 지정 (스키마는 URL에서 지정)
public class Member {

  @Id
  private Long id; // Primary Key, @GeneratedValue는 사용 불가

  @Column("pw") // 컬럼 이름 명시
  private String pw;

  @Column("sign_date")
  @CreatedDate
  private LocalDateTime signDate;

  public static Member createMember(String pw) {
    Member member = new Member();
    member.pw = pw;
    member.signDate = LocalDateTime.now();
    return member;
  }
}
