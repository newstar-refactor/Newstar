package com.ssafy.newstar.domain.member.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newstar.domain.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = MemberController.class)
class MemberControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private MemberService memberService;

  @BeforeEach
  void setUp() {

  }

  @Test
  void matchingMember()  throws Exception {
    // given
    // when
    mockMvc.perform(get("http://localhost:8080/api/members")
            //.contentType(MediaType.APPLICATION_JSON) // Content-Type 헤더 설정
            //.content(objectMapper.writeValueAsString(requestBody)) // 요청 바디 설정
            .header("key", "feb91399-aaf3-40ef-856d-35e6ddf8befb")) // 사용자 정의 헤더 설정
        // then
        .andExpect(status().isOk()); // 예상되는 응답 상태 코드 검증
//        .andExpect(content().string("expectedResponse")); // 예상되는 응답 내용 검증
  }

  @Test
  void createMember() {
  }
}