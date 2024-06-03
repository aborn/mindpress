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
import org.apache.commons.lang3.StringUtils;
import org.elasticsearch.action.DocWriteResponse;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
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
                JSONObject jsonObjectS = JSONObject.parseObject(MindpressESConfig.MP_ES_SETTINGS);
                JSONObject jsonObjectM = JSONObject.parseObject(MindpressESConfig.BuildMappings());
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

    private String getValue(HighlightField nameField) {
        if (nameField != null) {
            Text[] fragments = nameField.getFragments();
            StringBuffer stringBuffer = new StringBuffer();
            for (Text str : fragments) {
                stringBuffer.append(str.string());
            }
            return stringBuffer.toString();
        } else {
            return null;
        }
    }

    public List<ESMarkdownItem> search(String key) {
        List<ESMarkdownItem> res = new ArrayList<>();

        try {
            SearchResponse search = restHighLevelClientService.search(key, 0, 10, MindpressESConfig.MP_ES_INDEX_NAME);
            SearchHits hits = search.getHits();
            SearchHit[] hits1 = hits.getHits();
            for (SearchHit hit : hits1) {
                // System.out.println(documentFields.getSourceAsString());
                ESMarkdownItem esMarkdownItem = JSON.parseObject(hit.getSourceAsString(), ESMarkdownItem.class);
                Map<String, HighlightField> highlightFields = hit.getHighlightFields();
                if (highlightFields != null) {
                    for (Map.Entry<String, HighlightField> entry : highlightFields.entrySet()) {
                        String value = getValue(entry.getValue());
                        if (value != null) {
                            esMarkdownItem.addHighlightItemKV(entry.getKey(), value);
                        }
                    }
                }
                res.add(esMarkdownItem);
            }


        } catch (IOException ioe) {

        } catch (Exception e) {

        }
        return res;
    }

    public List<ESMarkdownItem> getPageData(int pageNumber) {
        MarkdownMetaQueryCriteria criteria = MarkdownMetaQueryCriteria.builder().build();
        Pageable pageRequest = PageRequest.of(pageNumber, 10, Sort.by("createTime").descending());
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
        return esdata;
    }

    public boolean transferData(List<ESMarkdownItem> esdata, boolean isSync) {
        if (!init()) {
            return false;
        }

        try {
            BulkRequest request = restHighLevelClientService.buildImportRequest(
                    MindpressESConfig.MP_ES_INDEX_NAME, false, esdata);
            if (isSync) {
                BulkResponse bulkResponse = restHighLevelClientService.sync(request);
                for (BulkItemResponse bulkItemResponse : bulkResponse) {
                    if (bulkItemResponse.isFailed()) {
                        BulkItemResponse.Failure failure = bulkItemResponse.getFailure();
                        System.out.println("async, failure: " + failure.getMessage());
                    }
                }
            } else {
                restHighLevelClientService.async(request);
            }

            return true;
        } catch (IOException ioException) {
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}
