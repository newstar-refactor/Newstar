package com.newstar.gateway.util.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  // 회원
  MEMBER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "해당 유저를 찾을 수 없습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
