package com.github.aborn.mindpress.service.dto.vo;

import lombok.Data;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author aborn
 * @date 2022/06/16 06:59
 */
@Data
public class ExtInfo {
    private String title;
    private ExtInfoAuthor author;
    private ExtInfoAuthor[] authors;
    private String categories;
    private String category;
    private String tags;
    private String tag;
    private String date;
    private String permalink;
    private String desc;

    ExtInfo() {
    }

    ExtInfo(Map<String, Object> objectMap) {
        this.title = (String) objectMap.get("title");
        this.categories = (String) objectMap.get("categories");
        this.category = (String) objectMap.get("category");
        this.tags = (String) objectMap.get("tags");
        this.tag = (String) objectMap.get("tag");
        this.date = (String) objectMap.get("date");
        this.permalink = (String) objectMap.get("permalink");
        this.desc = (String) objectMap.get("desc");
        LinkedHashMap map = (LinkedHashMap) objectMap.get("author");
        if (map != null && map.containsKey("name")) {
            this.author = new ExtInfoAuthor();
            this.author.setName((String) map.get("name"));
            this.author.setLink((String) map.get("link"));
        }
    }
}
