package com.ssafy.newstar.domain.answer.dto;

import lombok.Data;

@Data
public class CheckResponse {

  private boolean haveAnswer;

  public static CheckResponse getCheckResponse(boolean haveAnswer) {
    CheckResponse checkResponse = new CheckResponse();
    checkResponse.haveAnswer = haveAnswer;
    return checkResponse;
  }
}

