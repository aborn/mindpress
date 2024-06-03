package com.github.aborn.mindpress.service.dto;

import com.github.aborn.mindpress.inf.base.BaseDTO;
import lombok.Data;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    private HashMap<String, List<String>> highlight;

    public void addHighlightItemKV(String key, String value) {
        if (this.highlight == null) {
            this.highlight = new HashMap<>();
        }
        List<String> values = this.highlight.containsKey(key) ? this.highlight.get(key) : new ArrayList<>();
        values.add(value);
        this.highlight.put(key, values);
    }
}
