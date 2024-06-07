package com.github.aborn.mindpress.service.dto.vo;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.alibaba.fastjson2.JSONObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.json.JacksonJsonParser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.pegdown.Extensions;
import org.pegdown.PegDownProcessor;

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
@Slf4j
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
            if (StringUtils.isNotBlank(extInfo.getTitle()) && StringUtils.isBlank(this.getTitle())) {
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

            parseContentToDesc();
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void parseContentToDesc() {
        PegDownProcessor pdp = new PegDownProcessor(Integer.MAX_VALUE);
        // 根据内容解析
        String htmlContent = pdp.markdownToHtml(content);
        Document parse = Jsoup.parse(htmlContent);
        Elements elements = parse.getElementsByTag("p");
        if (elements != null && !elements.isEmpty()) {
            for (int i = 0; i < elements.size(); i++) {
                Element element = elements.get(i);
                if (StringUtils.isNotBlank(element.text())) {
                    setDesc(element.text());
                    return;
                }
            }
        }

        // 根据 extInfo 解析
        ExtInfo extInfo = JSONObject.parseObject(this.getExtInfo(), ExtInfo.class);
        if (StringUtils.isNotBlank(extInfo.getDesc())) {
            String desc = extInfo.getDesc();
            if (extInfo.getDesc().length() > MAX_DESC_LENGTH) {
                desc = desc.substring(0, MAX_DESC_LENGTH);
            }
            this.setDesc(desc);
            return;
        }

        this.setDesc(getTitle());
    }
}
