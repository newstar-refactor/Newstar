package com.ssafy.newstar.global;

import com.ssafy.newstar.domain.article.entity.Article;
import com.ssafy.newstar.domain.member.entity.Member;
import com.ssafy.newstar.domain.recode.entity.Recode;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class initDB {

  private final InitService initService;
  @PostConstruct
  public void init() {
    initService.dbInit1();
  }

  @Component
  @Transactional
  @RequiredArgsConstructor
  static class InitService {

    private final EntityManager em;

    public void dbInit1() {
      Member member1 = Member.createMember(String.valueOf("feb91399-aaf3-40ef-856d-35e6ddf8befb"));
      em.persist(member1);

      Article article1 = Article.createArticle("尹 “의료개혁, 원칙대로 신속 추진을”…의대교수 집단사직 땐 진료유지명령 검토 ",
          "https://n.news.naver.com/mnews/article/658/0000068427",
          LocalDateTime.now(),
          100, 264,
          "https://mimgnews.pstatic.net/image/origin/658/2024/03/12/68427.jpg?type=ofullfill220_150",
          "한 총리 “실력 있는 전문병원, 상급병원 만큼 수가 받아야” 윤석열  대통령은 12일 의과대학 증원을 포함한 의료 개혁과 관련해 “원칙대로 신속하게 추진하라”고 지시했다.");
      Article article2 = Article.createArticle("韓 대통령실, 日과 국교정상화 60년 공동문서 발표에 긍정적",
          "https://n.news.naver.com/mnews/article/421/0007406931",
          LocalDateTime.now(),
          100, 264,
          "https://mimgnews.pstatic.net/image/origin/421/2024/03/12/7406931.jpg?type=ofullfill220_150",
          "16일(현지시간) 일본 도쿄의 오므라이스 식당 '렌가테이'에서 윤석열 한국 대통령과 기시다 후미오 일본 총리가 저녁 만찬 후 사진을 찍고 있다. 한일 양국 정상은 이날 12년만에 정상회담을 가졌다."
          );
      em.persist(article1);
      em.persist(article2);

      Recode recode1 = Recode.createRecode(member1, article1, true);
      Recode recode2 = Recode.createRecode(member1, article2, true);
      em.persist(recode1);
      em.persist(recode2);
    }
  }
}
