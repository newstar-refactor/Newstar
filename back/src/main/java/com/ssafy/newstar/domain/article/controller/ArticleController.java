package com.ssafy.newstar.domain.article.controller;

import static com.ssafy.newstar.domain.article.dto.ArticleResponse.createArticleResponse;

import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.article.service.ArticleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleController {
  private final ArticleService articleService;
  @GetMapping("/articles/{category}")
  public List<ArticleResponse> getArticlesByCategory(@PathVariable("category") int category) {
    return createArticleResponse(articleService.getArticlesByCategory(category));
  }
}
