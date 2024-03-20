package com.ssafy.newstar.domain.record.dto;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Data
@ToString
@Getter
public class RecordLikeRequest {
    private Long article_id;
    private Boolean likes;
}
