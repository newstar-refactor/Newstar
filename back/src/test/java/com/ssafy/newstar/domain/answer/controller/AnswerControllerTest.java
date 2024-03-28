package com.ssafy.newstar.domain.answer.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = true)
class AnswerControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void haveAnswer() throws Exception {
    // given
    // when
    mockMvc.perform(get("/answers", 1)
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb"))
        // then
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.data.haveAnswer").value(false));
  }

  @Test
  void createAnswer() throws Exception {
    // given
    // when
    mockMvc.perform(post("/answers")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb")
            .contentType("application/json")
            .content("[{\"questionId\":1,\"response\":\"mobile\"},{\"questionId\":2,\"response\":\"적당합니다.\"},{\"questionId\":3,\"response\":\"만족\"},{\"questionId\":4,\"response\":\"매우 만족\"},{\"questionId\":5,\"response\":\"보통\"},{\"questionId\":6,\"response\": \"123\"},{\"questionId\":7,\"response\":\"010-9764-9784\"}]"))
        // then
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.statusCode").value(201))
        .andExpect(jsonPath("$.statusName").value("CREATED"))
        .andExpect(jsonPath("$.message").value("Created Success"));
  }
}