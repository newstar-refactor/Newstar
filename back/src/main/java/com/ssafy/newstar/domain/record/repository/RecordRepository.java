package com.ssafy.newstar.domain.record.repository;

import com.ssafy.newstar.domain.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByMemberId(Long memberId);
    List<Record> findByMemberIdAndLikes(Long memberId, boolean likes);
}
