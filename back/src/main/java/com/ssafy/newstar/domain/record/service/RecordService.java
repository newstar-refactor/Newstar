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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Slice<Record> records = recordRepository.findByMemberIdAndLikesOrderByIdDesc(memberId, true, pageable);

        return records.map(Record::getArticle);
    }

    // 사용자 시청 기록 생성
    public void createRecord(Record record) {
        recordRepository.save(record);
    }

    // Record Entity 생성
    public Record createRecordEntity(Long memberId, Long articleId) {
        Member member = memberRepository.getReferenceById(memberId);
        Article article = articleRepository.getReferenceById(articleId);

        return Record.createRecode(member, article);
    }
    public void updateRecordLikes(Long memberId, RecordLikeRequest request) {
        Member member = memberRepository.getReferenceById(memberId);
        Article article = articleRepository.getReferenceById(request.getArticleId());

        Optional<Record> record = recordRepository.findByMemberAndArticle(member, article);
        record.orElseThrow(() -> new GlobalException(ErrorCode.RECORD_NOT_FOUND))
                .updateLikes(request.getLikes());
    }

    public boolean confirmRecord(Long memberId, Long articleId) {
        Member member = memberRepository.getReferenceById(memberId);
        Article article = articleRepository.getReferenceById(articleId);

        Optional<Record> record = recordRepository.findByMemberAndArticle(member, article);
        // null 이면 true 리턴eRecordRequest.getArticleId());
        return record.isEmpty();
    }
}
