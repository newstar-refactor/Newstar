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

  private String email;

  private String gender;

  private int age;

  private LocalDateTime signDate;

  private Boolean status;
}
