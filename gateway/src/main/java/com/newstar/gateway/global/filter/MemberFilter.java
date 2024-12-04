package com.newstar.gateway.global.filter;

import com.newstar.gateway.domain.member.entity.Member;
import com.newstar.gateway.domain.member.repository.MemberRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class MemberFilter extends AbstractGatewayFilterFactory<MemberFilter.Config> {
    MemberRepository memberRepository;
    public MemberFilter(MemberRepository memberRepository) {
        super(Config.class);
        this.memberRepository = memberRepository;
    }

    @Override
    public GatewayFilter apply(MemberFilter.Config config) {
        return (ServerWebExchange exchange, GatewayFilterChain chain) -> {
            log.info("MemberFilter config: {}", config);

            String pw = exchange.getRequest().getHeaders().getFirst("X-User-Id");

            return memberRepository.findMemberByPw(pw)
                    .doOnNext(member -> {
                        // Member 데이터 처리 및 로깅
                        log.info("Found member: {}", member);
                        // 요청 헤더에 Member 정보 추가
                        exchange.getRequest().mutate()
                                .header("MemberId", member.getId().toString())
                                .build();
                    })
                    .then(chain.filter(exchange)); // 체인을 Reactive 흐름에 연결
//            Mono<Member> member = memberRepository.findMemberById(1L);
//            Member actualMember = member.block();
//            log.info("member: {}", member);
////            member.subscribe(m -> log.info("member: {}", m));
//            return chain.filter(exchange);
        };
    }
    @Data
    public static class Config {
        private String baseMessage;
    }

}