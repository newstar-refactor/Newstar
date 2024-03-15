package com.ssafy.newstar.global.config;

import com.ssafy.newstar.domain.member.repository.MemberRepository;
import com.ssafy.newstar.global.filter.MemberAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<MemberAuthenticationFilter> memberAuthenticationFilter(MemberRepository memberRepository) {
        FilterRegistrationBean<MemberAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new MemberAuthenticationFilter(memberRepository));
        registrationBean.addUrlPatterns("/*"); // 모든 URL에 필터를 적용
        return registrationBean;
    }
}
