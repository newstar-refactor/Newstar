package com.ssafy.newstar.domain.member.controller;

import static com.ssafy.newstar.domain.member.dto.MemberResponse.createMemberResponse;
import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.newstar.domain.member.dto.MemberRequest;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.service.MemberService;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.SuccessCode;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;

  // 사용자의 정보를 가져온다.
  @GetMapping("/members")
  public ResponseEntity<?> matchingMember(HttpServletRequest request) {
    Long memberId = (Long) request.getAttribute("memberId");
    Optional<Member> member = memberService.getMember(memberId);
    member.orElseThrow(
        () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

    return getResponseEntity(SuccessCode.OK, createMemberResponse(member.get()));
  }

  // 회원가입 로직
  @PostMapping("/members")
  public ResponseEntity<?> createMember(@RequestBody MemberRequest memberRequest) {
    Member member = memberService.createMember(memberRequest);
    return getResponseEntity(SuccessCode.OK, createMemberResponse(member));
  }
}
