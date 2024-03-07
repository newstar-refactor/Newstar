package com.ssafy.newstar.domain.recommend.repository;

import com.ssafy.newstar.domain.recommend.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

}
