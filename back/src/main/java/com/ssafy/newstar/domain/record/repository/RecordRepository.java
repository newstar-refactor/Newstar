package com.ssafy.newstar.domain.record.repository;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.record.entity.Record;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @EntityGraph(attributePaths = {"article"})
    List<Record> findByMemberId(Long memberId);
    List<Record> findByMemberIdAndLikes(Long memberId, boolean likes);
    Optional<Record> findByMemberAndArticle(Member member, Article article);

    @EntityGraph(attributePaths = {"article"})
    Optional<Record> findByArticleAndMember(Article article, Member member);
}
