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
import org.springframework.util.StringUtils;

@Slf4j
@RequiredArgsConstructor
public class MemberAuthenticationFilter implements Filter {

  private final MemberRepository memberRepository;

  private final static List<URLMethod> whiteList = new ArrayList<>();

  static {
    //  key 값이 필요 없는 곳은 uri 추가
    whiteList.add(new URLMethod("/api/members", "POST"));
    whiteList.add(new URLMethod("/members", "POST"));
    whiteList.add(new URLMethod("/api/swagger-ui", "GET"));
    whiteList.add(new URLMethod("/api/v3/api-docs", "GET"));
    whiteList.add(new URLMethod("/api/favicon.ico", "GET"));
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    HttpServletRequest servletRequest = (HttpServletRequest) request;
    HttpServletResponse servletResponse = (HttpServletResponse) response;
    String requestURI = servletRequest.getRequestURI();
    String requestMethod = servletRequest.getMethod();
    log.info(requestURI + " : " + requestMethod);

    if (requestURI.equals("/api") || checkWhiteList(requestURI, requestMethod)) {
      chain.doFilter(request, response);
      return;
    }

    log.info("필터 진입");
    try {
      // 회원을 선별하는 UUID 값
      String key = servletRequest.getHeader("X-User-Id");
      log.info("X-User-Id 값 : " + key);
      if (!StringUtils.hasText(key)) {
        log.info("X-User-Id 값이 비어 있습니다.");
        throw new GlobalException(ErrorCode.KEY_NOT_FOUND);
      }

      Member member = memberRepository.findByPw(key).orElseThrow(
          () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

      servletRequest.setAttribute("memberId", member.getId());
      log.info(" memberId : " + member.getId());
      // 다음 필터 없으면 컨트롤러로 가겠지
      chain.doFilter(request, response);
    } catch (GlobalException e) {
      setErrorResponse(servletResponse, e.getErrorCode());
    }
  }

  private boolean checkWhiteList(String requestURI, String requestMethod) {
    for (URLMethod urlMethod : whiteList) {
      if (requestURI.startsWith(urlMethod.getUrl()) && requestMethod.equals(
          urlMethod.getMethod())) {
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
