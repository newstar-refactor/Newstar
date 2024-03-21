package com.ssafy.newstar.domain.record.service;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.article.repository.ArticleRepository;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.domain.record.dto.CreateRecordRequest;
import com.ssafy.newstar.domain.record.dto.RecordLikeRequest;
import com.ssafy.newstar.domain.record.entity.Record;
import com.ssafy.newstar.domain.record.repository.RecordRepository;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecordService {
    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;
    // 사용자 시청 기록 조회
    public List<Article> getRecords(Long memberId) {
        // 사용자 시청 기록 조회
        List<Record> records = recordRepository.findByMemberId(memberId);

        return records.stream()
                .map(Record::getArticle)
                .toList();
    }

    // 사용자가 좋아요한 기사 조회
    public List<Article> getRecordLikes(Long memberId) {
        List<Record> records = recordRepository.findByMemberIdAndLikes(memberId, true);

        return records.stream()
                .map(Record::getArticle)
                .toList();
    }

    // 사용자 시청 기록 생성
    public void createRecord(Record record) {
        recordRepository.save(record);
    }

    // Record Entity 생성
    public Record createRecordEntity(Long memberId, CreateRecordRequest createRecordRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

        Article article = articleRepository.findById(createRecordRequest.getArticleId())
                .orElseThrow(() -> new GlobalException(ErrorCode.ARTICLE_NOT_FOUND));

        return Record.createRecode(member, article);
    }
    public void updateRecordLikes(Long memberId, RecordLikeRequest request) {
        Record record = recordRepository.findByMemberIdAndArticleId(memberId, request.getArticleId());
        record.updateLikes(request.getLikes());
    }
}
