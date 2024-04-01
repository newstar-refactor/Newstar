package com.ssafy.newstar.domain.member.controller;

import com.ssafy.newstar.domain.member.dto.MemberCheckRequest;
import com.ssafy.newstar.domain.member.dto.MemberRequest;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.service.MemberService;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.SuccessCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.newstar.domain.member.dto.MemberResponse.createMemberResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;
  private final RedisTemplate<String, Long> redisTemplate;

  // 사용자의 정보를 가져온다.
  @GetMapping("/members")
  public ResponseEntity<?> matchingMember(HttpServletRequest request) {
    Long memberId = (Long) request.getAttribute("memberId");
    Member member = memberService.getMember(memberId).orElseThrow(
        () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

    return getResponseEntity(SuccessCode.OK, createMemberResponse(member));
  }

  // 회원가입 로직
  @PostMapping("/members")
  public ResponseEntity<?> createMember(@RequestBody MemberRequest memberRequest) {
    Member member = memberService.createMember(memberRequest);
    // 회원가입시 redis에 pw값 저장해두기
    redisTemplate.opsForValue().set(member.getPw(), member.getId());
    return getResponseEntity(SuccessCode.CREATED, createMemberResponse(member));
  }

  //QR 등록 시 존재하는 회원인지 확인
  @PostMapping("/checkmember")
  public ResponseEntity<?> checkMember(@RequestBody MemberCheckRequest memberCheckRequest) {
    return getResponseEntity(SuccessCode.OK, memberService.checkMember(memberCheckRequest).isPresent());
  }
}
