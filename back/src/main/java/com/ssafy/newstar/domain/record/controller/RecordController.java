package com.ssafy.newstar.domain.record.controller;

import com.ssafy.newstar.domain.article.dto.ArticleResponse;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.record.dto.RecordLikeRequest;
import com.ssafy.newstar.domain.record.service.RecordService;
import com.ssafy.newstar.util.response.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.newstar.domain.record.dto.RecordResponse.createRecordResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;
    @GetMapping("/records")
    public ResponseEntity<?> getRecords(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK, createRecordResponse(recordService.getRecords(memberId)));
    }

    @GetMapping("/records/likes")
    public ResponseEntity<?> getRecordLikes(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        return getResponseEntity(SuccessCode.OK, createRecordResponse(recordService.getRecordLikes(memberId)));
    }

    @PatchMapping("/records")
    public ResponseEntity<?> updateRecordLikes(HttpServletRequest request, @RequestBody RecordLikeRequest recordLikeRequest) {
        Long memberId = (Long) request.getAttribute("memberId");
        recordService.updateRecordLikes(memberId, recordLikeRequest);
        return null;
    }
}
