package com.ssafy.newstar.domain.article.repository;

import com.ssafy.newstar.domain.article.entity.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ArticleRepositoryCustom {

  Slice<Article> getByCategory(Pageable pageable, String bcategory, String scategory);
}
