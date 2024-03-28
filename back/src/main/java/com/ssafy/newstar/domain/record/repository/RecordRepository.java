package com.ssafy.newstar.domain.record.repository;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.record.entity.Record;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @EntityGraph(attributePaths = {"article"})
    List<Record> findByMemberId(Long memberId);
    List<Record> findByMemberIdAndLikes(Long memberId, boolean likes);
    Record findByMemberIdAndArticleId(Long memberId, Long articleId);

    @EntityGraph(attributePaths = {"article"})
    Optional<Record> findByArticle(Article article);
}
