package com.github.aborn.mindpress.service.dto.vo;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.json.JacksonJsonParser;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * @author aborn
 * @date 2022/05/30 21:37
 */
@Data
public class ContentVo extends MarkdownMetaDto implements Serializable {

    public static final int MAX_DESC_LENGTH = 1000;

    private static final long serialVersionUID = 2371591328857612229L;

    public ContentVo() {
    }

    public ContentVo(ContentDto dto, MarkdownMetaDto metaDto) {
        BeanUtil.copyProperties(metaDto, this, CopyOptions.create().setIgnoreNullValue(true));

        CopyOptions copyOptions = CopyOptions.create();
        copyOptions.setIgnoreNullValue(true);
        // 以下4个字段，以 meta表里的数据为准
        copyOptions.setIgnoreProperties("createBy", "updateBy", "createTime", "updateTime");
        BeanUtil.copyProperties(dto, this, copyOptions);

        this.pub = metaDto.getIsPublic() != 0;
    }

    @JsonIgnore
    public Content getContentDomain() {
        Content content = new Content();
        content.copyFromVo(this);
        return content;
    }

    private String content;

    /**
     * is public
     */
    private boolean pub = true;

    // only for front-end post, json string
    private String extInfo;

    public void parseExtInfo() {
        if (this.getTags() == null) {
            this.setTags("");
        }

        if (StringUtils.isBlank(this.getExtInfo())) {
            return;
        }

        try {
            Map<String, Object> objectMap = new JacksonJsonParser().parseMap(this.getExtInfo());
            ExtInfo extInfo = new ExtInfo(objectMap);
            if (StringUtils.isNotBlank(extInfo.getTitle())) {
                this.setTitle(extInfo.getTitle());
            }
            if (StringUtils.isNotBlank(extInfo.getDate())) {
                // 2022-05-11 21:00:31
                try {
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date date = simpleDateFormat.parse(extInfo.getDate());
                    this.setCreateTime(new Timestamp(date.getTime()));
                } catch (ParseException e) {

                }
            }

            if (StringUtils.isNotBlank(extInfo.getTags())) {
                this.setTags(extInfo.getTags());
            }

            if (extInfo.getAuthor() != null) {
                this.setCreateBy(extInfo.getAuthor().getName());
            }

            if (StringUtils.isNotBlank(extInfo.getDesc())) {
                String desc = extInfo.getDesc();
                if (extInfo.getDesc().length() > MAX_DESC_LENGTH) {
                    desc = desc.substring(0, MAX_DESC_LENGTH);
                }
                this.setDesc(desc);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
