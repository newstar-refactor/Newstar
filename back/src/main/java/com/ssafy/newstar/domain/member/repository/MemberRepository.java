package com.ssafy.newstar.domain.member.repository;

import com.ssafy.newstar.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
  public Member findByPw(String pw);
}
