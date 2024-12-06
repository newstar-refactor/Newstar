package com.newstar.gateway.global.filter;

import com.newstar.gateway.domain.member.entity.Member;
import com.newstar.gateway.domain.member.repository.MemberRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class MemberFilter extends AbstractGatewayFilterFactory<MemberFilter.Config> {
    MemberRepository memberRepository;
    ReactiveRedisTemplate<String, Long> redisTemplate;
    public MemberFilter(MemberRepository memberRepository, ReactiveRedisTemplate<String, Long> redisTemplate) {
        super(Config.class);
        this.memberRepository = memberRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public GatewayFilter apply(MemberFilter.Config config) {
        return (ServerWebExchange exchange, GatewayFilterChain chain) -> {
            String pw = exchange.getRequest().getHeaders().getFirst("X-User-Id");
            if (pw == null || pw.isEmpty()) {
                return Mono.error(new IllegalArgumentException("X-User-Id 헤더가 없습니다."));
            }


            return Mono.zip(
                            redisTemplate.opsForValue().get(pw).defaultIfEmpty(0L),
                            memberRepository.findMemberIdByPw(pw).defaultIfEmpty(0L)
                    )
                    .flatMap(tuple -> {
                        Long redisMemberId = tuple.getT1();
                        Long mysqlMemberId = tuple.getT2();

                        if (redisMemberId == 0L) {
                            // Redis에서 데이터 가져옴
                            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                    .header("MemberId", redisMemberId.toString())
                                    .build();
                            ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                            return chain.filter(mutatedExchange);
                        } else if (mysqlMemberId == 0L) {
                            // MySQL에서 데이터 가져온 후 Redis에 저장
                            return redisTemplate.opsForValue().set(pw, mysqlMemberId)
                                    .then(Mono.defer(() -> {
                                        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                                                .header("MemberId", mysqlMemberId.toString())
                                                .build();
                                        ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                                        return chain.filter(mutatedExchange);
                                    }));
                        } else {
                            return Mono.error(new IllegalArgumentException("MemberId를 찾을 수 없습니다."));
                        }
                    });
        };
    }
    @Data
    public static class Config {
        private String baseMessage;
    }

}