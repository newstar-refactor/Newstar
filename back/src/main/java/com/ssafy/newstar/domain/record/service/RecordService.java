package com.ssafy.newstar.domain.record.service;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.record.entity.Record;
import com.ssafy.newstar.domain.record.repository.RecordRepository;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;

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
}
