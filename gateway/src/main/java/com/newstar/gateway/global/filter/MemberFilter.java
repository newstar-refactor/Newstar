package com.newstar.gateway.global.filter;

import com.newstar.gateway.domain.member.entity.Member;
import com.newstar.gateway.domain.member.repository.MemberRepository;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
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
            log.info("MemberFilter config: {}", config);

            String pw = exchange.getRequest().getHeaders().getFirst("X-User-Id");

            return Mono.justOrEmpty(redisTemplate.opsForValue().get(pw)) // Redis에서 값 확인
                    .flatMap(memberId -> {
                        // Redis에서 값이 있으면 DB 조회 없이 헤더에 추가하고 필터를 이어서 실행
                        exchange.getRequest().mutate()
                                .header("MemberId", memberId.toString()) // Redis에서 가져온 MemberId를 헤더에 추가
                                .build();
                        log.info("레디스 접근후 진입");
                        return chain.filter(exchange); // 필터 체인을 Reactive 흐름에 연결
                    });
//                    .switchIfEmpty(
//                            memberRepository.findMemberByPw(pw)
//                                    .doOnNext(member -> {
//                                        log.info("Found member in DB: {}", member);
//                                        redisTemplate.opsForValue().set(pw, member.getId()); // Redis에 값 저장
//                                        exchange.getRequest().mutate()
//                                                .header("MemberId", member.getId().toString()) // DB에서 가져온 MemberId를 헤더에 추가
//                                                .build();
//                                    })
//                                    .then(chain.filter(exchange)) // 체인을 Reactive 흐름에 연결
//                    );
        };


//            String pw = exchange.getRequest().getHeaders().getFirst("X-User-Id");
//            Mono<Member> member = memberRepository.findMemberByPw(pw);
//            log.info("지나갑니다");
//            return chain.filter(exchange); };
        }
    @Data
    public static class Config {
        private String baseMessage;
    }

}