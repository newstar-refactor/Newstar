package com.ssafy.newstar.domain.record.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
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
class RecordControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {

  }

  @Test
  void getRecords() throws Exception {
    //given
    //when
    mockMvc.perform(get("/records")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb"))
        //then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"));
  }

  @Test
  void getRecordLikes() throws Exception {
    //given
    //when
    mockMvc.perform(get("/records/likes")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb"))
        //then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"));
  }

  @Test
  void createRecord() throws Exception {
    //given
    //when
    mockMvc.perform(post("/records")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"articleId\":1}"))
        //then
        .andExpect(status().isCreated())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(201))
        .andExpect(jsonPath("$.statusName").value("CREATED"))
        .andExpect(jsonPath("$.message").value("Created Success"));
  }

  @Test
  void updateRecordLikes() throws Exception {
    //given
    //when
    mockMvc.perform(patch("/records")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"articleId\":1 , \"likes\":true }"))

        //then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"));
  }
}