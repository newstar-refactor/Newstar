package com.ssafy.newstar.global.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulerConfiguration {
  @Scheduled(cron = "0 5 * * * *") // 매일 매시 05분에 실행
  public void doCrawling() {
    log.info("크롤링 ing");
  }
}
