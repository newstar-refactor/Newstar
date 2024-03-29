package com.ssafy.newstar.domain.record.repository;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.record.entity.Record;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @EntityGraph(attributePaths = {"article"})
    Slice<Record> findByMemberIdOrderByIdDesc(Long memberId, Pageable pageable);
    @EntityGraph(attributePaths = {"article"})
    Slice<Record> findByMemberIdAndLikesOrderByIdDesc(Long memberId, boolean likes, Pageable pageable);

    Optional<Record> findByMemberAndArticle(Member member, Article article);

    @EntityGraph(attributePaths = {"article"})
    Optional<Record> findByArticleAndMember(Article article, Member member);
}
