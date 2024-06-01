package com.github.aborn.mindpress.service.mapstruct;

import com.github.aborn.mindpress.inf.base.BaseMapper;
import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * @author aborn
 * @date 2022-05-29
 **/
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MarkdownMetaMapper extends BaseMapper<MarkdownMetaDto, MarkdownMeta> {

}