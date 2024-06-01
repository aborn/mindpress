package com.github.aborn.mindpress.service;

import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaQueryCriteria;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

/**
 * @author aborn
 * @description service interface
 * @date 2022-05-29
 **/
public interface MarkdownMetaService {

    /**
    * 查询数据分页
    * @param criteria 条件
    * @param pageable 分页参数
    * @return Map<String,Object>
    */
    Map<String, Object> queryAll(MarkdownMetaQueryCriteria criteria, Pageable pageable);

    /**
    * 查询所有数据不分页
    * @param criteria 条件参数
    * @return List<MarkdownMetaDto>
    */
    List<MarkdownMetaDto> queryAll(MarkdownMetaQueryCriteria criteria);

    /**
     * 根据ID查询
     * @param id ID
     * @return MarkdownMetaDto
     */
    MarkdownMetaDto findById(Long id);

    /**
    * 创建
    * @param resources /
    * @return MarkdownMetaDto
    */
    MarkdownMetaDto create(MarkdownMeta resources);

    /**
    * 编辑
    * @param resources /
    */
    void update(MarkdownMeta resources);

    /**
    * 多选删除
    * @param ids /
    */
    void deleteAll(Long[] ids);
}