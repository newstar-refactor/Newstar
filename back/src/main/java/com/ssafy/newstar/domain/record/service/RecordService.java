package com.ssafy.newstar.domain.record.service;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.article.repository.ArticleRepository;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.domain.record.dto.RecordLikeRequest;
import com.ssafy.newstar.domain.record.entity.Record;
import com.ssafy.newstar.domain.record.repository.RecordRepository;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class RecordService {

  private final RecordRepository recordRepository;
  private final MemberRepository memberRepository;
  private final ArticleRepository articleRepository;

  // 사용자 시청 기록 조회
  public Slice<Article> getRecords(Long memberId, Pageable pageable) {
    Slice<Record> records = recordRepository.findByMemberIdOrderByIdDesc(memberId, pageable);

    return records.map(Record::getArticle);
  }

  // 사용자가 좋아요한 기사 조회
  public Slice<Article> getRecordLikes(Long memberId, Pageable pageable) {
    Slice<Record> records = recordRepository.findByMemberIdAndLikesOrderByIdDesc(memberId, true,
        pageable);

    return records.map(Record::getArticle);
  }

  // createRecord 사용자 시청 기록 생성
  public void createRecord(Long memberId, Long articleId) {
    Member member = memberRepository.getReferenceById(memberId);
    Article article = articleRepository.getReferenceById(articleId);

    // 기존 기록  있다면 제거
    if(recordRepository.findByMemberAndArticle(member, article).isPresent()) {
      recordRepository.deleteByMemberAndArticle(member, article);
    }

    Record record = Record.createRecode(member, article);
    recordRepository.save(record);
  }

  public void updateRecordLikes(Long memberId, RecordLikeRequest request) {
    Member member = memberRepository.getReferenceById(memberId);
    Article article = articleRepository.getReferenceById(request.getArticleId());

    // 기존 기록  있다면 제거
    if(recordRepository.findByMemberAndArticle(member, article).isPresent()) {
      recordRepository.deleteByMemberAndArticle(member, article);
    }

    Record record = Record.createRecodeWithLike(member, article, request.getLikes());
    recordRepository.save(record);
  }
}
