package com.ssafy.newstar.domain.summary.entity;

import com.ssafy.newstar.domain.article.entity.Article;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Summary {

    @Id
    private Long id;

    @Column( length=10000 )
    private String content;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "summary_id")
    private Article article;

    public static Summary createSummary(Article article, String content){
        Summary summary = new Summary();
        summary.article = article;
        summary.content = content;
        return summary;
    }
}
