package com.github.aborn.mindpress.domain;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.github.aborn.mindpress.inf.base.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Timestamp;
import java.io.Serializable;

/**
 * @author aborn
 * @description /
 * @date 2022-05-29
 **/
@Entity
@Data
@Table(name = "mp_markdown_space")
public class MarkdownSpace extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(value = "ID")
    private Long id;

    @Column(name = "name",unique = true,nullable = false)
    @NotBlank
    @ApiModelProperty(value = "space uniq name")
    private String name;

    @Column(name = "desc")
    @ApiModelProperty(value = "space dscription")
    private String desc;

    @Column(name = "owner",nullable = false)
    @NotBlank
    @ApiModelProperty(value = "space owner")
    private String owner;

    public void copy(MarkdownSpace source) {
        BeanUtil.copyProperties(source, this, CopyOptions.create().setIgnoreNullValue(true));
    }
}
