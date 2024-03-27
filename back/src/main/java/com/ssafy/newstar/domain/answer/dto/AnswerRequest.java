package com.ssafy.newstar.domain.answer.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import lombok.Data;

@Data
public class AnswerRequest {
  @NotBlank
  private Long questionId;

  @NotBlank
  private String response;
}

