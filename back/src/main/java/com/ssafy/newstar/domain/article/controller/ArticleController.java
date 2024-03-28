package com.ssafy.newstar.domain.article.controller;

import static com.ssafy.newstar.domain.article.dto.ArticleDetailResponse.*;
import static com.ssafy.newstar.domain.article.dto.ArticleResponse.createArticleResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.newstar.domain.article.dto.ArticleDetailResponse;
import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.article.service.ArticleService;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.SuccessCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArticleController {
  private final ArticleService articleService;
  @GetMapping("/articles/{articleId}")
  public ResponseEntity<?> getArticles(HttpServletRequest request,
          @PathVariable("articleId") Long articleId) {
    Long memberId = (Long) request.getAttribute("memberId");
    return getResponseEntity(SuccessCode.OK, createArticleDetailResponse(articleService.getArticles(articleId, memberId)));
  }

  @GetMapping("/articles/category")
  public ResponseEntity<?> getArticlesByCategory(Pageable pageable,
      @RequestParam(value = "bcategory", required = false, defaultValue = "") String bcategory,
      @RequestParam(value = "scategory", required = false, defaultValue = "") String scategory) {
    if (StringUtils.hasText(bcategory) && StringUtils.hasText(scategory)) throw new GlobalException(ErrorCode.CATEGORY_NOT_ONE);
    if (!StringUtils.hasText(bcategory) && !StringUtils.hasText(scategory)) throw new GlobalException(ErrorCode.CATEGORY_NOT_SELECTED);

    Slice<ArticleResponse> response = createArticleResponse(articleService.getArticlesByCategory(pageable, bcategory, scategory));
    return getResponseEntity(SuccessCode.OK, response);
  }
}
