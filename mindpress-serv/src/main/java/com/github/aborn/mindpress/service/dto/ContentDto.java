package com.github.aborn.mindpress.service.dto;

import com.github.aborn.mindpress.inf.base.BaseDTO;
import lombok.Data;

import java.io.Serializable;

/**
 * @author aborn
 * @description /
 * @date 2022-05-28
 **/
@Data
public class ContentDto extends BaseDTO implements Serializable {

    /**
     * ID
     */
    private Long id;

    /**
     * 文章唯一标识
     */
    private String articleid;

    /**
     * Markdown文本内容
     */
    private String content;
}