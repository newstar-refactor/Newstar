package com.ssafy.newstar.util.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  // 회원
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),

  // 기사
  ARTICLE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 기사를 찾을 수 없습니다."),

  // 키워드
  KEYWORD_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 키워드를 찾을 수 없습니다.");


  private final HttpStatus httpStatus;
  private final String message;
}
