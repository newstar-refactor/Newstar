package com.ssafy.newstar.domain.article.service;
import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {
  private final ArticleRepository articleRepository;
  public Slice<Article> getArticlesByCategory(Pageable pageable, int category) {
    return articleRepository.findByScategory(category, pageable);
  }
}
