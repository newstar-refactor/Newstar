package com.ssafy.newstar.global.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerConfiguration {

  private final WebClient webClient = WebClient.create("https://newstar.world/api/data");
  @Scheduled(cron = "0 5 * * * *") // 매일 매시 05분에 실행
  public void doCrawling() {
    log.info("크롤링 ing");

    Mono<String> response = webClient.get()
        .uri("/crawling")
        .retrieve()
        .bodyToMono(String.class);

    response.subscribe(result -> log.info(result),
        error -> log.error("Error: " + error.getMessage()));
  }
}
