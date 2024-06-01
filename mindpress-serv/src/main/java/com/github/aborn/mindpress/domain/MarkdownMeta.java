package com.github.aborn.mindpress.domain;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.github.aborn.mindpress.inf.base.BaseEntity;
import com.github.aborn.mindpress.service.dto.vo.ContentVo;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

/**
 * @author aborn
 * @description /
 * @date 2022-05-29
 **/
@Entity
@Data
@Table(name = "mp_markdown_meta")
public class MarkdownMeta extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(value = "ID")
    private Long id;

    @Column(name = "articleid", unique = true, nullable = false)
    @NotBlank
    @ApiModelProperty(value = "markdown article uniq id")
    private String articleid;

    @Column(name = "title", nullable = false)
    @NotBlank
    @ApiModelProperty(value = "title")
    private String title;

    @Column(name = "description", nullable = false)
    @NotBlank
    @ApiModelProperty(value = "description")
    private String desc;

    @Column(name = "tags")
    @ApiModelProperty(value = "description")
    private String tags;

    @Column(name = "space")
    @ApiModelProperty(value = "the space file belongs to")
    private String space;

    @Column(name = "is_public")
    @ApiModelProperty(value = "is public access, default no")
    private Integer isPublic;

    @Column(name = "status")
    @ApiModelProperty(value = "status")
    private Integer status = 0;

    @Column(name = "ref_articleid")
    @ApiModelProperty(value = "ref article id")
    private String refArticleid = "";

    @Column(name = "ext")
    @ApiModelProperty(value = "ext")
    private String ext = "";

    public void copy(MarkdownMeta source) {
        BeanUtil.copyProperties(source, this, CopyOptions.create().setIgnoreNullValue(true));
    }

    public void copyFromVo(ContentVo source) {
        BeanUtil.copyProperties(source, this, CopyOptions.create().setIgnoreNullValue(true));
        this.isPublic = source.isPub() ? 1 : 0;
    }

    public void updateDefaultSpace() {
        if (StringUtils.isBlank(this.space)) {
            this.space = "default";
        }
    }
}
