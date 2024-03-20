package com.ssafy.newstar.domain.article.repository;

import com.ssafy.newstar.domain.article.entity.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ArticleRepository extends JpaRepository<Article, Long> {

  Slice<Article> findByScategory(int scategory, Pageable pageable);
}
