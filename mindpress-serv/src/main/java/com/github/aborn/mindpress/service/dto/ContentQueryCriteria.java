package com.github.aborn.mindpress.service.dto;

import com.github.aborn.mindpress.inf.annotation.Query;
import lombok.Data;

/**
 * @author aborn
 * @date 2022-05-28
 **/
@Data
public class ContentQueryCriteria {

    @Query
    private String id;

    @Query
    private String articleid;
}