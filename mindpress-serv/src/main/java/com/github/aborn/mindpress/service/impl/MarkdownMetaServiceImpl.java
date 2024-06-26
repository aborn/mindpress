package com.github.aborn.mindpress.service.impl;

import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.inf.es.ESMarkdownItem;
import com.github.aborn.mindpress.inf.es.MindpressESClient;
import com.github.aborn.mindpress.inf.exception.EntityExistException;
import com.github.aborn.mindpress.inf.utils.PageUtil;
import com.github.aborn.mindpress.inf.utils.QueryHelp;
import com.github.aborn.mindpress.inf.utils.ValidationUtil;
import com.github.aborn.mindpress.repository.MarkdownMetaRepository;
import com.github.aborn.mindpress.service.MarkdownMetaService;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaQueryCriteria;
import com.github.aborn.mindpress.service.mapstruct.MarkdownMetaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author aborn
 * @description service impl
 * @date 2022-05-29
 **/
@Service
@RequiredArgsConstructor
public class MarkdownMetaServiceImpl implements MarkdownMetaService {

    private final MarkdownMetaRepository markdownMetaRepository;
    private final MarkdownMetaMapper markdownMetaMapper;
    private final MindpressESClient mindpressESClient;

    @Override
    public Map<String, Object> queryAll(MarkdownMetaQueryCriteria criteria, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createTime").descending());
        // order by from new to oldest.
        Page<MarkdownMeta> page = markdownMetaRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder), pageRequest);
        // Page<MarkdownMeta> page = markdownMetaRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder), pageable);
        return PageUtil.toPage(page.map(markdownMetaMapper::toDto));
    }

    @Override
    public Map<String, Object> search(MarkdownMetaQueryCriteria criteria, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createTime").descending());
        String searchEngine = "default";
        Map<String, Object> result;
        if (!mindpressESClient.isActived()) {
            result = queryAll(criteria, pageable);
        } else {
            searchEngine = "es";
            List<ESMarkdownItem> searchResult = mindpressESClient.search(criteria.getQ());
            List<MarkdownMetaDto> metaDtoList = new ArrayList<>();
            searchResult.forEach(i -> {
                MarkdownMetaDto dto = new MarkdownMetaDto();
                BeanUtils.copyProperties(i, dto);
                metaDtoList.add(dto);
            });
            Page<MarkdownMetaDto> pageEs = new PageImpl<>(metaDtoList, pageRequest, metaDtoList.size());
            result = PageUtil.toPage(pageEs);
        }
        result.put("searchEngine", searchEngine);
        return result;
    }

    @Override
    public List<MarkdownMetaDto> queryAll(MarkdownMetaQueryCriteria criteria) {
        return markdownMetaMapper.toDto(markdownMetaRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder)));
    }

    @Override
    @Transactional
    public MarkdownMetaDto findById(Long id) {
        MarkdownMeta markdownMeta = markdownMetaRepository.findById(id).orElseGet(MarkdownMeta::new);
        ValidationUtil.isNull(markdownMeta.getId(), "MarkdownMeta", "id", id);
        return markdownMetaMapper.toDto(markdownMeta);
    }

    @Override
    public MarkdownMetaDto findByArticleId(String id) {
        MarkdownMeta meta = markdownMetaRepository.findByArticleid(id).orElseGet(MarkdownMeta::new);
        ValidationUtil.isNull(meta.getId(), "MarkdownMeta", "id", id);
        return markdownMetaMapper.toDto(meta);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public MarkdownMetaDto create(MarkdownMeta resources) {
        if (markdownMetaRepository.findByArticleid(resources.getArticleid()) != null) {
            throw new EntityExistException(MarkdownMeta.class, "articleid", resources.getArticleid());
        }
        return markdownMetaMapper.toDto(markdownMetaRepository.save(resources));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(MarkdownMeta resources) {
        MarkdownMeta markdownMeta = markdownMetaRepository.findByArticleid(resources.getArticleid()).orElseGet(MarkdownMeta::new);
        ValidationUtil.isNull(markdownMeta.getId(), "MarkdownMeta", "id", resources.getId());
        markdownMeta.copy(resources);
        markdownMetaRepository.save(markdownMeta);
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            markdownMetaRepository.deleteById(id);
        }
    }
}
