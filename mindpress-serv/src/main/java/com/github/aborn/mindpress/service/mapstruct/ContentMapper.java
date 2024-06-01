package com.github.aborn.mindpress.service.mapstruct;

import com.github.aborn.mindpress.domain.Content;
import com.github.aborn.mindpress.inf.base.BaseMapper;
import com.github.aborn.mindpress.service.dto.ContentDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

/**
 * @author aborn
 * @date 2022-05-28
 **/
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentMapper extends BaseMapper<ContentDto, Content> {

}