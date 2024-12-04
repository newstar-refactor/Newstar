package com.newstar.gateway.domain.member.repository;

import com.newstar.gateway.domain.member.entity.Member;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface MemberRepository extends ReactiveCrudRepository<Member, Long> {
  Mono<Member> findMemberByPw(String pw);
}