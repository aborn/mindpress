package com.github.aborn.mindpress.service.dto;

import com.github.aborn.mindpress.inf.annotation.Query;
import lombok.Data;

/**
 * @author aborn
 * @date 2022-05-29
 **/
@Data
public class MarkdownMetaQueryCriteria {

    @Query(blurry = "title,desc")
    private String q;

    @Query
    private String space;

    // SELECT * FROM md_markdown_meta WHERE FIND_IN_SET('markdown', md_markdown_meta.tags);
    @Query(propName = "tags", type = Query.Type.FIND_IN_SET)
    private String tag;

    @Query(propName = "category")
    private String cate;

    @Query(propName = "status")
    private String status;

    @Query
    private Integer isPublic;

    @Query
    private String createBy;
}
