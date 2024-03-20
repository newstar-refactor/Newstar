package com.ssafy.newstar.domain.article.service;

import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.article.repository.ArticleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {
  private final ArticleRepository articleRepository;
  public List<Article> getArticlesByCategory(int category) {
    return articleRepository.findByCategory(category);
  }
}
