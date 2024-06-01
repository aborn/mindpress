package com.github.aborn.mindpress.service.dto;

import com.github.aborn.mindpress.inf.base.BaseDTO;
import lombok.Data;
import java.io.Serializable;

/**
 * @author aborn
 * @description /
 * @date 2022-05-29
 **/
@Data
public class MarkdownMetaDto extends BaseDTO implements Serializable {

    /**
     * ID
     */
    private Long id;

    /**
     * markdown article uniq id
     */
    private String articleid;

    /**
     * title
     */
    private String title;

    /**
     * description
     */
    private String desc;

    /**
     * description
     */
    private String tags;

    /**
     * the space file belongs to
     */
    private String space;

    /**
     * is public access, default no
     */
    private Integer isPublic;

    private String category;

    private Integer status;

    private String refArticleid;

    private String ext;
}
