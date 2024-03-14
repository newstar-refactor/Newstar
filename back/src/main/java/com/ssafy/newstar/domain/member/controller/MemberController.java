package com.ssafy.newstar.domain.member.controller;

import static com.ssafy.newstar.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.newstar.domain.member.dto.MemberRequest;
import com.ssafy.newstar.domain.member.service.MemberService;
import com.ssafy.newstar.util.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;

  // 사용자의 정보를 가져온다.
  @GetMapping("/member")
  public ResponseEntity<?> matchingMember() {
    return getResponseEntity(SuccessCode.OK, memberService.getMember("a"));
  }

  // 회원가입 로직
  @PostMapping("/member")
  public ResponseEntity<?> createMember(@RequestBody MemberRequest memberRequest) {
    return getResponseEntity(SuccessCode.OK, memberService.createMember(memberRequest));
  }

}
