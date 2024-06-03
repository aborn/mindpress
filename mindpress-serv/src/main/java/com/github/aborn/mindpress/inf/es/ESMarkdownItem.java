package com.github.aborn.mindpress.inf.es;

import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.inf.base.BaseDTO;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import lombok.Data;
import org.springframework.beans.BeanUtils;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 15:33
 */
@Data
public class ESMarkdownItem extends BaseDTO {

    ESMarkdownItem() {}

    public ESMarkdownItem(MarkdownMetaDto markdownMeta, ContentDto contentDto) {
        BeanUtils.copyProperties(markdownMeta, this);
        if (contentDto != null) {
            this.content = contentDto.getContent();
            this.category = "abc";
        }
    }

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

    /**
     * Markdown文本内容
     */
    private String content;

}
