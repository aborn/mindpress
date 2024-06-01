package com.github.aborn.mindpress.rest;

import com.github.aborn.mindpress.domain.MarkdownSpace;
import com.github.aborn.mindpress.service.MarkdownSpaceService;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceQueryCriteria;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author aborn
 * @date 2022-05-29
 **/
@RestController
@RequiredArgsConstructor
@Api(tags = "markdown space管理")
@RequestMapping("/api/mindpress/space")
public class SpaceController {

    private final MarkdownSpaceService markdownSpaceService;

    @GetMapping
    @ApiOperation("query markdown space")
    public ResponseEntity<Object> queryMarkdownSpace(MarkdownSpaceQueryCriteria criteria, Pageable pageable) {
        return new ResponseEntity<>(markdownSpaceService.queryAll(criteria, pageable), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation("create markdown space")
    public ResponseEntity<Object> createMarkdownSpace(@Validated @RequestBody MarkdownSpace resources) {
        return new ResponseEntity<>(markdownSpaceService.create(resources), HttpStatus.CREATED);
    }

    @PutMapping
    @ApiOperation("update markdown space")
    public ResponseEntity<Object> updateMarkdownSpace(@Validated @RequestBody MarkdownSpace resources) {
        markdownSpaceService.update(resources);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    @ApiOperation("删除markdown space")
    public ResponseEntity<Object> deleteMarkdownSpace(@RequestBody Long[] ids) {
        markdownSpaceService.deleteAll(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}