package com.ssafy.newstar.domain.member.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = true)
class MemberControllerTest {

  @Autowired
  private MockMvc mockMvc;


  @BeforeEach
  void setUp() {
  }

  @Test
  void matchingMember() throws Exception {
    // given
    // when
    mockMvc.perform(get("/members")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb")) // 사용자 헤더
        // then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"))
        .andExpect(jsonPath("$.data.pw").value("feb91399-aaf3-40ef-856d-35e6ddf8befb"))
        .andExpect(jsonPath("$.data.signDate").exists());

  }

  @Test
  void createMember() throws Exception {
    // given
    // when
    mockMvc.perform(post("/members")
            .contentType(MediaType.APPLICATION_JSON) // Content-Type 헤더
            .content("{\"categories\":[100, 200, 300]}"))
        // then
        .andExpect(status().isCreated())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(201))
        .andExpect(jsonPath("$.statusName").value("CREATED"))
        .andExpect(jsonPath("$.message").value("Created Success"))
        .andExpect(jsonPath("$.data.pw").exists())
        .andExpect(jsonPath("$.data.signDate").exists());
  }


}