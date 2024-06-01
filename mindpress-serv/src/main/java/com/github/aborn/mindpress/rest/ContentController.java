package com.github.aborn.mindpress.rest;

import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.inf.base.BaseResponse;
import com.github.aborn.mindpress.inf.exception.EntityExistException;
import com.github.aborn.mindpress.inf.utils.MarkdownUtils;
import com.github.aborn.mindpress.service.ContentService;
import com.github.aborn.mindpress.service.MarkdownMetaService;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.ContentQueryCriteria;
import com.github.aborn.mindpress.service.dto.vo.ContentVo;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author aborn
 * @date 2022-05-28
 **/
@RestController
@RequiredArgsConstructor
@Api(tags = "Markdown file content controller")
@RequestMapping("/api/mindpress/content")
public class ContentController {

    private final ContentService contentService;

    private final MarkdownMetaService markdownMetaService;

    @GetMapping
    public ResponseEntity<Object> queryContent(ContentQueryCriteria criteria, Pageable pageable) {
        return new ResponseEntity<>(contentService.queryAll(criteria, pageable), HttpStatus.OK);
    }

    @PostMapping
    @CrossOrigin
    public ResponseEntity<Object> createOrUpdateContent(@RequestBody ContentVo resources) {
        ContentVo dtoRes = null;
        BaseResponse res = BaseResponse.success("success");

        resources.parseExtInfo();
        if (StringUtils.isNotBlank(resources.getArticleid())) {
            // update action
            ContentDto dto = contentService.findByArticleId(resources.getArticleid());

            if (dto != null) {
                // update
                contentService.update(resources);
                res.setMsg("save content success, articleid=" + resources.getArticleid());
            } else {
                res.setSuccess(false);
                res.setCode(500);
                res.setMsg("file doesn't exists.");
            }
        } else {
            // create action
            resources.setCreateBy("aborn");
            resources.setUpdateBy("aborn");
            resources.setArticleid(MarkdownUtils.getId(resources.getContent()));

            try {
                dtoRes = contentService.create(resources);
                if (dtoRes != null) {
                    res.addExt("articleid", dtoRes.getArticleid());
                    res.setMsg("create file success! articleid=" + resources.getArticleid());
                } else {
                    res.setSuccess(false);
                    res.setCode(501);
                    res.setMsg("create file failed! articleid=" + resources.getArticleid());
                }
            } catch (EntityExistException e) {
                res.addExt("articleid", resources.getArticleid());
                res.setMsg("create file failed. file exists! articleid=" + resources.getArticleid());
                res.setCode(502);
                res.setSuccess(false);
            } catch (Exception e) {
                res.addExt("articleid", resources.getArticleid());
                res.setMsg("create file exception. articleid=" + resources.getArticleid());
                res.setCode(503);
                res.setSuccess(false);
            }
        }
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Object> updateContent(@Validated @RequestBody Content resources) {
        String articleId = resources.getArticleid();
        // contentService.update(resources);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "{id}")
    @CrossOrigin
    public ResponseEntity<Object> queryContent(@PathVariable("id") String articleid) {
        ContentVo contentVo = contentService.queryContentVo(articleid);

        return contentVo == null ? ResponseEntity.badRequest().build() :
                new ResponseEntity<>(contentVo, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteContent(@RequestBody Long[] ids) {
        contentService.deleteAll(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
