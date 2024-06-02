package com.github.aborn.mindpress.inf.es;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.inf.utils.QueryHelp;
import com.github.aborn.mindpress.repository.ContentRepository;
import com.github.aborn.mindpress.repository.MarkdownMetaRepository;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaQueryCriteria;
import com.github.aborn.mindpress.service.impl.ContentServiceImpl;
import com.github.aborn.mindpress.service.mapstruct.MarkdownMetaMapper;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 15:37
 */
@Service
@RequiredArgsConstructor
public class MindpressESClient {

    private final RestHighLevelClientService restHighLevelClientService;

    private final MarkdownMetaRepository markdownMetaRepository;

    private final ContentRepository contentRepository;
    private final MarkdownMetaMapper markdownMetaMapper;
    private final ContentServiceImpl contentService;

    public boolean init() {
        try {
            boolean exists = restHighLevelClientService.indexExists(MindpressESConfig.MP_ES_INDEX_NAME);
            if (!exists) {
                JSONObject jsonObjectS = JSONObject.parseObject( MindpressESConfig.MP_ES_SETTINGS);
                JSONObject jsonObjectM = JSONObject.parseObject( MindpressESConfig.BuildMappings());
                CreateIndexResponse res = restHighLevelClientService.createIndex(MindpressESConfig.MP_ES_INDEX_NAME,
                        MindpressESConfig.MP_ES_SETTINGS,
                        MindpressESConfig.BuildMappings());
            }
            return true;
        } catch (IOException e) {
            return false;
            //
        } catch (Exception e) {
            return false;
        }
    }

    public boolean transferData() {
        if (!init()) {
            return false;
        }
        MarkdownMetaQueryCriteria criteria = MarkdownMetaQueryCriteria.builder()
                .build();
        Pageable pageRequest = PageRequest.of(0, 10, Sort.by("createTime").descending());
        Page<MarkdownMeta> page = markdownMetaRepository.findAll((root, criteriaQuery, criteriaBuilder) ->
                QueryHelp.getPredicate(root, criteria, criteriaBuilder), pageRequest);
        Page<MarkdownMetaDto> pageDTO = page.map(markdownMetaMapper::toDto);
        List<MarkdownMetaDto> metaDtoList = pageDTO.getContent();

        List<ContentDto> tastes = contentService.findAllByArticleIds(metaDtoList.stream().map(MarkdownMetaDto::getArticleid).collect(Collectors.toList()));
        Map<String, ContentDto> contentDtoMap = tastes.stream().collect(Collectors.toMap(ContentDto::getArticleid, Function.identity()));

        List<ESMarkdownItem> esdata = new ArrayList<>(metaDtoList.size());

        for (MarkdownMetaDto metaDto : metaDtoList) {
            esdata.add(new ESMarkdownItem(metaDto, contentDtoMap.get(metaDto.getArticleid())));
        }

        try {
            BulkResponse bulkResponse = restHighLevelClientService.importAll(MindpressESConfig.MP_ES_INDEX_NAME,
                    false, esdata);
            return true;
        } catch (IOException ioException) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}
