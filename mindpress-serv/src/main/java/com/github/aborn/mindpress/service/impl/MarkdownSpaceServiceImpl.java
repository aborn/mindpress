package com.github.aborn.mindpress.service.impl;

import com.github.aborn.mindpress.domain.MarkdownSpace;
import com.github.aborn.mindpress.inf.exception.EntityExistException;
import com.github.aborn.mindpress.inf.utils.ValidationUtil;
import lombok.RequiredArgsConstructor;
import com.github.aborn.mindpress.repository.MarkdownSpaceRepository;
import com.github.aborn.mindpress.service.MarkdownSpaceService;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceDto;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceQueryCriteria;
import com.github.aborn.mindpress.service.mapstruct.MarkdownSpaceMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.github.aborn.mindpress.inf.utils.PageUtil;
import com.github.aborn.mindpress.inf.utils.QueryHelp;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.LinkedHashMap;

/**
 * @author aborn
 * @description service impl
 * @date 2022-05-29
 **/
@Service
@RequiredArgsConstructor
public class MarkdownSpaceServiceImpl implements MarkdownSpaceService {

    private final MarkdownSpaceRepository markdownSpaceRepository;
    private final MarkdownSpaceMapper markdownSpaceMapper;

    @Override
    public Map<String,Object> queryAll(MarkdownSpaceQueryCriteria criteria, Pageable pageable){
        Page<MarkdownSpace> page = markdownSpaceRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root,criteria,criteriaBuilder),pageable);
        return PageUtil.toPage(page.map(markdownSpaceMapper::toDto));
    }

    @Override
    public List<MarkdownSpaceDto> queryAll(MarkdownSpaceQueryCriteria criteria){
        return markdownSpaceMapper.toDto(markdownSpaceRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root,criteria,criteriaBuilder)));
    }

    @Override
    @Transactional
    public MarkdownSpaceDto findById(Long id) {
        MarkdownSpace markdownSpace = markdownSpaceRepository.findById(id).orElseGet(MarkdownSpace::new);
        ValidationUtil.isNull(markdownSpace.getId(),"MarkdownSpace","id",id);
        return markdownSpaceMapper.toDto(markdownSpace);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public MarkdownSpaceDto create(MarkdownSpace resources) {
        if(markdownSpaceRepository.findByName(resources.getName()) != null){
            throw new EntityExistException(MarkdownSpace.class,"name",resources.getName());
        }
        return markdownSpaceMapper.toDto(markdownSpaceRepository.save(resources));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(MarkdownSpace resources) {
        MarkdownSpace markdownSpace = markdownSpaceRepository.findById(resources.getId()).orElseGet(MarkdownSpace::new);
        ValidationUtil.isNull( markdownSpace.getId(),"MarkdownSpace","id",resources.getId());
        MarkdownSpace markdownSpace1 = null;
        markdownSpace1 = markdownSpaceRepository.findByName(resources.getName());
        if(markdownSpace1 != null && !markdownSpace1.getId().equals(markdownSpace.getId())){
            throw new EntityExistException(MarkdownSpace.class,"name",resources.getName());
        }
        markdownSpace.copy(resources);
        markdownSpaceRepository.save(markdownSpace);
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            markdownSpaceRepository.deleteById(id);
        }
    }
}