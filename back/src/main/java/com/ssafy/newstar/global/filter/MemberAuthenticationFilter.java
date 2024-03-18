package com.ssafy.newstar.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.util.response.ErrorCode;
import com.ssafy.newstar.util.response.ErrorResponseEntity;
import com.ssafy.newstar.util.response.exception.GlobalException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import org.springframework.http.MediaType;

@Slf4j
@RequiredArgsConstructor
public class MemberAuthenticationFilter implements Filter {
  private final MemberRepository memberRepository;

  private final static List<String> whiteList = new ArrayList<>();
  static {
    // jwt 토큰이 필요 없는 곳은 uri 추가
//    whiteList.add("/api/members");
  }
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    HttpServletRequest servletRequest = (HttpServletRequest) request;
    HttpServletResponse servletResponse = (HttpServletResponse) response;
    String requestURI = servletRequest.getRequestURI();
    if (requestURI.equals("/api") || checkWhiteList(requestURI)) {
      chain.doFilter(request, response);
      return;
    }

    log.info("필터 지나간다 ~");

    try {
      // 회원을 선별하는 UUID 값
      String key = servletRequest.getHeader("key");
      log.info("key 값 : " + key);
      if (key == "" || key == null ) {
        log.info("key 값이 비어 있습니다.");
        throw new GlobalException(ErrorCode.KEY_NOT_FOUND);
      }

      Member member = memberRepository.findByPw(key);
      if (member == null) {
        log.info("key 값에 해당하는 회원이 없습니다.");
        throw new GlobalException(ErrorCode.MEMBER_NOT_FOUND);
      }
      servletRequest.setAttribute("memberId", member.getId());

      // 다음 필터 없으면 컨트롤러로 가겠지
      chain.doFilter(request, response);
    } catch (GlobalException e) {
      log.info("필터에서 에러 발생");
      setErrorResponse(servletResponse, e.getErrorCode());
    }
  }

  private boolean checkWhiteList(String requestURI) {
    for (String white : whiteList) {
      if (requestURI.contains(white)) {
        return true;
      }
    }
    return false;
  }

  private void setErrorResponse(HttpServletResponse response, ErrorCode ec) {
    ObjectMapper objectMapper = new ObjectMapper();
    response.setStatus(ec.getHttpStatus().value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE + "; charset=utf-8");
    ErrorResponseEntity errorResponseEntity = ErrorResponseEntity.builder()
        .statusCode(ec.getHttpStatus().value())
        .statusName(ec.name())
        .message(ec.getMessage())
        .build();
    try {
      response.getWriter().write(objectMapper.writeValueAsString(errorResponseEntity));
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}