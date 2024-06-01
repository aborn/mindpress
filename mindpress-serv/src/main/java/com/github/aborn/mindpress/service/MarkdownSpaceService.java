package com.github.aborn.mindpress.service;

import com.github.aborn.mindpress.domain.MarkdownSpace;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceDto;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceQueryCriteria;
import org.springframework.data.domain.Pageable;
import java.util.Map;
import java.util.List;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

/**
 * @author aborn
 * @description service interface
 * @date 2022-05-29
 **/
public interface MarkdownSpaceService {

    /**
    * 查询数据分页
    * @param criteria 条件
    * @param pageable 分页参数
    * @return Map<String,Object>
    */
    Map<String, Object> queryAll(MarkdownSpaceQueryCriteria criteria, Pageable pageable);

    /**
    * 查询所有数据不分页
    * @param criteria 条件参数
    * @return List<MarkdownSpaceDto>
    */
    List<MarkdownSpaceDto> queryAll(MarkdownSpaceQueryCriteria criteria);

    /**
     * 根据ID查询
     * @param id ID
     * @return MarkdownSpaceDto
     */
    MarkdownSpaceDto findById(Long id);

    /**
    * 创建
    * @param resources /
    * @return MarkdownSpaceDto
    */
    MarkdownSpaceDto create(MarkdownSpace resources);

    /**
    * 编辑
    * @param resources /
    */
    void update(MarkdownSpace resources);

    /**
    * 多选删除
    * @param ids /
    */
    void deleteAll(Long[] ids);
}