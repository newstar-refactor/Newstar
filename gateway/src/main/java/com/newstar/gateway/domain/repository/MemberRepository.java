package com.newstar.gateway.domain.repository;
import com.newstar.gateway.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
  Optional<Member> findByPw(String pw);
}
