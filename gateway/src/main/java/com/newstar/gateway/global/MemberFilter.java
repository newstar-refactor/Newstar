package com.newstar.gateway.global;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

@Slf4j
@Component
public class MemberFilter extends AbstractGatewayFilterFactory<MemberFilter.Config> {
    public MemberFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(MemberFilter.Config config) {
        return (ServerWebExchange exchange, GatewayFilterChain chain) -> {
            log.info("MemberFilter config: {}", config);

            return chain.filter(exchange);
        };
    }

    @Data
    public static class Config {
        private String baseMessage;
    }

}
