package com.ssafy.newstar.domain.article.repository;

import static com.ssafy.newstar.domain.article.entity.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.newstar.domain.article.entity.Article;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {

  private final JPAQueryFactory queryFactory;

  @Override
  public Slice<Article> getByCategory(Pageable pageable, String bcategory, String scategory) {

    BooleanBuilder builder = new BooleanBuilder();

    if (StringUtils.hasText(bcategory)) {
      builder.and(article.bcategory.eq(Integer.valueOf(bcategory)));
    }
    if (StringUtils.hasText(scategory)) {
      builder.and(article.scategory.eq(Integer.valueOf(scategory)));
    }

    List<Article> fetch = queryFactory
        .selectFrom(article)
        .where(builder)
        .orderBy(article.date.desc())
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();

    JPAQuery<Article> count = queryFactory
        .selectFrom(article)
        .where(builder);

    return PageableExecutionUtils.getPage(fetch, pageable, count::fetchCount);
  }
}
