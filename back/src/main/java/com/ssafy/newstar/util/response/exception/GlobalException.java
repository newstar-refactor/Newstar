package com.ssafy.newstar.util.response.exception;

import com.ssafy.newstar.util.response.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GlobalException extends RuntimeException {
  ErrorCode errorCode;
}
