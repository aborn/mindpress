package com.github.aborn.mindpress.service.impl;

import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.inf.exception.EntityExistException;
import com.github.aborn.mindpress.inf.utils.PageUtil;
import com.github.aborn.mindpress.inf.utils.QueryHelp;
import com.github.aborn.mindpress.inf.utils.ValidationUtil;
import com.github.aborn.mindpress.repository.ContentRepository;
import com.github.aborn.mindpress.repository.MarkdownMetaRepository;
import com.github.aborn.mindpress.service.ContentService;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.ContentQueryCriteria;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import com.github.aborn.mindpress.service.dto.vo.ContentVo;
import com.github.aborn.mindpress.service.mapstruct.ContentMapper;
import com.github.aborn.mindpress.service.mapstruct.MarkdownMetaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @author aborn
 * @description MarkdownContent Service
 * @date 2022-05-28
 **/
@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;
    private final MarkdownMetaRepository metaRepository;
    private final ContentMapper contentMapper;
    private final MarkdownMetaMapper metaMapper;

    @Override
    public Map<String, Object> queryAll(ContentQueryCriteria criteria, Pageable pageable) {
        Page<Content> page = contentRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder), pageable);
        return PageUtil.toPage(page.map(contentMapper::toDto));
    }

    @Override
    public List<ContentDto> queryAll(ContentQueryCriteria criteria) {
        return contentMapper.toDto(contentRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder)));
    }

    @Override
    @Transactional
    public ContentDto findById(Long id) {
        Content content = contentRepository.findById(id).orElseGet(Content::new);
        ValidationUtil.isNull(content.getId(), "Content", "id", id);
        return contentMapper.toDto(content);
    }

    @Override
    @Transactional
    public ContentDto findByArticleId(String id) {
        Content content = contentRepository.findByArticleid(id).orElseGet(Content::new);
        ValidationUtil.isNull(content.getId(), "Content", "id", id);
        return contentMapper.toDto(content);
    }

    @Override
    public ContentVo queryContentVo(String articleid) {

        Optional<MarkdownMeta> optionalMeta = metaRepository.findByArticleid(articleid);
        if (optionalMeta.isPresent()) {
            Content content = contentRepository.findByArticleid(articleid).get();
            return new ContentVo(contentMapper.toDto(content), metaMapper.toDto(optionalMeta.get()));
        } else {
            return null;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ContentDto create(Content resources) {
        if (contentRepository.findByArticleid(resources.getArticleid()).isPresent()) {
            throw new EntityExistException(Content.class, "articleid", resources.getArticleid());
        }
        return contentMapper.toDto(contentRepository.save(resources));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ContentVo create(ContentVo resources) {
        if (contentRepository.findByArticleid(resources.getArticleid()).isPresent()) {
            throw new EntityExistException(Content.class, "articleid", resources.getArticleid());
        }
        ContentDto contentDto = contentMapper.toDto(contentRepository.save(resources.getContentDomain()));
        MarkdownMeta markdownMeta = metaRepository.findByArticleid(resources.getArticleid()).orElseGet(MarkdownMeta::new);
        markdownMeta.copyFromVo(resources);
        if (markdownMeta.getDesc() == null) {
            markdownMeta.setDesc(markdownMeta.getTitle());
        }
        markdownMeta.updateDefaultSpace();
        MarkdownMetaDto metaDto = metaMapper.toDto(metaRepository.save(markdownMeta));
        return new ContentVo(contentDto, metaDto);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(ContentVo resources) {
        Content content = contentRepository.findByArticleid(resources.getArticleid()).orElseGet(Content::new);
        ValidationUtil.isNull(content.getId(), "Content", "id", resources.getId());
        content.copyFromVo(resources);
        contentRepository.save(content);

        MarkdownMeta markdownMeta = metaRepository.findByArticleid(resources.getArticleid()).orElseGet(MarkdownMeta::new);
        markdownMeta.copyFromVo(resources);
        markdownMeta.setUpdateTime(new Timestamp(System.currentTimeMillis()));
        markdownMeta.updateDefaultSpace();
        metaRepository.save(markdownMeta);
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            contentRepository.deleteById(id);
        }
    }
}