package com.github.aborn.mindpress.service.mapstruct;

import com.github.aborn.mindpress.inf.base.BaseMapper;
import com.github.aborn.mindpress.domain.MarkdownSpace;
import com.github.aborn.mindpress.service.dto.MarkdownSpaceDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * @author aborn
 * @date 2022-05-29
 **/
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MarkdownSpaceMapper extends BaseMapper<MarkdownSpaceDto, MarkdownSpace> {

}