package com.newstar.gateway.domain.member.repository;

import com.newstar.gateway.domain.member.entity.Member;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveCrudRepository<Member, Long> {
  @Query("SELECT id FROM member WHERE pw = :pw")
  Mono<Long> findMemberIdByPw(@Param("pw")String pw);
}