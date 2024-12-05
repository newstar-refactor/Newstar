package com.newstar.gateway.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

  @Value("${spring.data.redis.host}")
  private String host;

  @Value("${spring.data.redis.port}")
  private int port;

  @Bean
  public ReactiveRedisTemplate<String, Long> reactiveRedisTemplate(ReactiveRedisConnectionFactory connectionFactory) {
    // Key와 Value의 직렬화 방식을 설정
    RedisSerializationContext<String, Long> serializationContext = RedisSerializationContext
            .<String, Long>newSerializationContext()
            .key(RedisSerializer.string())  // Key는 String으로 설정
            .value(new GenericToStringSerializer<>(Long.class))  // Value는 Long 타입을 직렬화
            .hashKey(RedisSerializer.string())  // Hash key도 String으로 설정
            .hashValue(new GenericToStringSerializer<>(Long.class))  // Hash value는 Long 타입을 직렬화
            .build();

    // ReactiveRedisTemplate을 생성하여 반환
    return new ReactiveRedisTemplate<>(connectionFactory, serializationContext);
  }
}
