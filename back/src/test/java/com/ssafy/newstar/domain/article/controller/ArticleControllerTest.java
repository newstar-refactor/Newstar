package com.ssafy.newstar.domain.article.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = true)
class ArticleControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void getArticles() throws Exception {
    // given
    // when
    mockMvc.perform(get("/articles/{articleId}", 1)
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb"))
        // then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"));
  }

  @Test
  void getArticlesByCategory() throws Exception {
    // given
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("bcategory", "100");
    params.add("scategory", "");
    params.add("size", "10");
    params.add("page", "0");
    // when
    mockMvc.perform(get("/articles/category")
            .header("X-User-Id", "feb91399-aaf3-40ef-856d-35e6ddf8befb")
            .params(params))
        // then
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json"))
        .andExpect(jsonPath("$.statusCode").value(200))
        .andExpect(jsonPath("$.statusName").value("OK"))
        .andExpect(jsonPath("$.message").value("OK"));
  }
}