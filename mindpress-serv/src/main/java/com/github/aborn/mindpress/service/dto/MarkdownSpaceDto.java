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
public class MarkdownSpaceDto extends BaseDTO implements Serializable {

    /**
     * ID
     */
    private Long id;

    /**
     * space uniq name
     */
    private String name;

    /**
     * space dscription
     */
    private String desc;

    /**
     * space owner
     */
    private String owner;
}