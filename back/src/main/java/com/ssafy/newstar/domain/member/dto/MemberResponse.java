package com.ssafy.newstar.domain.member.dto;
import com.ssafy.newstar.domain.member.entity.Member;
import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class MemberResponse {
  private String pw;

  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime signDate;

  public static MemberResponse createMemberResponse(Member member) {
    MemberResponse memberResponse = new MemberResponse();
    memberResponse.pw = member.getPw();
    memberResponse.signDate = member.getSignDate();
    return memberResponse;
  }
}