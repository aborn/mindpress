package com.github.aborn.mindpress.service;

import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.ContentQueryCriteria;
import com.github.aborn.mindpress.service.dto.vo.ContentVo;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

/**
 * @author aborn
 * @website https://sancaiwulian.com
 * @description 服务接口
 * @date 2022-05-28
 **/
public interface ContentService {

    /**
    * 查询数据分页
    * @param criteria 条件
    * @param pageable 分页参数
    * @return Map<String,Object>
    */
    Map<String, Object> queryAll(ContentQueryCriteria criteria, Pageable pageable);

    /**
    * 查询所有数据不分页
    * @param criteria 条件参数
    * @return List<ContentDto>
    */
    List<ContentDto> queryAll(ContentQueryCriteria criteria);

    /**
     * 根据ID查询
     * @param id ID
     * @return ContentDto
     */
    ContentDto findById(Long id);

    ContentDto findByArticleId(String id);

    ContentVo queryContentVo(String articleid);

    /**
    * 创建
    * @param resources /
    * @return ContentDto
    */
    ContentDto create(Content resources);

    ContentVo create(ContentVo resources);

    /**
    * 编辑
    * @param resources /
    */
    void update(ContentVo resources);

    /**
    * 多选删除
    * @param ids /
    */
    void deleteAll(Long[] ids);

}