package com.github.aborn.mindpress.rest;

import com.github.aborn.mindpress.inf.es.ESMarkdownItem;
import com.github.aborn.mindpress.inf.es.MindpressESClient;
import com.github.aborn.mindpress.service.MarkdownMetaService;
import com.github.aborn.mindpress.service.dto.MarkdownMetaQueryCriteria;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author aborn
 * @date 2022/05/28 06:52
 */
@RestController
@RequiredArgsConstructor
@Api(tags = "markdown space管理")
@RequestMapping("/api/mindpress")
public class MindpressController {

    private final MarkdownMetaService markdownMetaService;

    private final MindpressESClient mindpressESClient;

    @GetMapping("search")
    @ApiOperation("query Markdown meta infos")
    @CrossOrigin
    public ResponseEntity<Object> queryMarkdownMeta(MarkdownMetaQueryCriteria criteria, Pageable pageable) {
        return new ResponseEntity<>(markdownMetaService.queryAll(criteria, pageable), HttpStatus.OK);
    }

    @GetMapping("es")
    @ApiOperation("init es")
    @CrossOrigin
    public ResponseEntity<Object> es(String s, String t) {
        if (!StringUtils.isBlank(t)) {
            List<ESMarkdownItem> markdownItems = mindpressESClient.getPageData(0);
            mindpressESClient.transferData(markdownItems,true);
        }
        List<ESMarkdownItem> detail = mindpressESClient.search(s);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }
}
