package com.ssafy.newstar.global.config;

import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.global.filter.MemberAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<MemberAuthenticationFilter> memberAuthenticationFilter
            (MemberRepository memberRepository, RedisTemplate<String, Long> redisTemplate) {
        FilterRegistrationBean<MemberAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new MemberAuthenticationFilter(memberRepository, redisTemplate));
        registrationBean.addUrlPatterns("/*"); // 모든 URL에 필터를 적용
        return registrationBean;
    }
}
