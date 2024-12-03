package com.newstar.gateway.util.response.exception;
import com.newstar.gateway.util.response.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GlobalException extends RuntimeException {
  ErrorCode errorCode;
}
