package com.github.aborn.mindpress.inf.es;

import com.alibaba.fastjson2.JSON;
import com.github.aborn.mindpress.domain.MarkdownMeta;
import com.github.aborn.mindpress.inf.es.mapings.MindpressESMapping;
import com.github.aborn.mindpress.inf.utils.QueryHelp;
import com.github.aborn.mindpress.repository.ContentRepository;
import com.github.aborn.mindpress.repository.MarkdownMetaRepository;
import com.github.aborn.mindpress.service.dto.ContentDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaDto;
import com.github.aborn.mindpress.service.dto.MarkdownMetaQueryCriteria;
import com.github.aborn.mindpress.service.impl.ContentServiceImpl;
import com.github.aborn.mindpress.service.mapstruct.MarkdownMetaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 15:37
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MindpressESClient {

    private final RestHighLevelClientService restHighLevelClientService;
    private final MarkdownMetaRepository markdownMetaRepository;

    private final MarkdownMetaMapper markdownMetaMapper;
    private final ContentServiceImpl contentService;

    public boolean isActived() {
        return restHighLevelClientService.isLive();
    }

    public boolean init() {
        try {
            boolean exists = restHighLevelClientService.indexExists(MindpressESMapping.MP_ES_INDEX_NAME);
            if (exists) {
                return true;
            }

            restHighLevelClientService.createIndex(MindpressESMapping.MP_ES_INDEX_NAME,
                    MindpressESMapping.MP_ES_SETTINGS,
                    MindpressESMapping.BuildMappings());
            return true;
        } catch (IOException e) {
            log.warn("es init io exception ex. {}", e.getMessage());
            return false;
        } catch (Exception e) {
            log.warn("es init exception ex. {}", e.getMessage());
            return false;
        }
    }

    @PostConstruct
    public void doInitCheck() {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
                           @Override
                           public void run() {
                               String ds = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                               boolean isActive = isActived();
                               if (isActive) {
                                   try {
                                       boolean exists = restHighLevelClientService.indexExists(MindpressESMapping.MP_ES_INDEX_NAME);
                                       if (!exists) {
                                           log.info("{} Now init with all data!", ds);
                                           importAllDataToES(true);
                                       }
                                   } catch (IOException e) {
                                       log.warn("indexExists error {}", e.getMessage());
                                   }
                               }
                           }
                       },
                5000L,
                15000L);
    }

    private String getValue(HighlightField nameField) {
        if (nameField != null) {
            Text[] fragments = nameField.getFragments();
            StringBuilder stringBuffer = new StringBuilder();
            for (Text str : fragments) {
                stringBuffer.append(str.string());
            }
            return stringBuffer.toString();
        } else {
            return null;
        }
    }

    public List<ESMarkdownItem> search(String key) {
        log.info("Call ESClient search, key {}", key);
        List<ESMarkdownItem> res = new ArrayList<>();
        try {
            SearchResponse search = restHighLevelClientService.search(key, 0, 10, MindpressESMapping.MP_ES_INDEX_NAME);
            SearchHits hits = search.getHits();
            SearchHit[] hits1 = hits.getHits();
            for (SearchHit hit : hits1) {
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
            log.warn("Call ESClient search, io exception, key {}, error msg: {}", key, ioe.getMessage());
        } catch (Exception e) {
            log.warn("Call ESClient search, exception, key {}, error msg: {}", key, e.getMessage());
        }
        return res;
    }

    public void importAllDataToES(boolean isSync) {
        init();
        MarkdownMetaQueryCriteria criteria = MarkdownMetaQueryCriteria.builder().build();
        Pageable pageRequest = PageRequest.of(0, 10, Sort.by("createTime").descending());
        Page<MarkdownMeta> page = markdownMetaRepository.findAll((root, criteriaQuery, criteriaBuilder) ->
                QueryHelp.getPredicate(root, criteria, criteriaBuilder), pageRequest);
        int totalPage = page.getTotalPages();
        log.info("Now transfer all data to es. totalPage:{}", totalPage);
        for (int i = 0; i < totalPage; i++) {
            List<ESMarkdownItem> pageData = getPageData(i);
            boolean status = transferData(pageData, isSync);
            log.info("Page {}, status: {}", i, status);
        }
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
        if (!isActived()) {
            log.warn("es not connected, pls make sure es running!!");
            return false;
        }

        if (!init()) {
            return false;
        }

        try {
            BulkRequest request = restHighLevelClientService.buildImportRequest(
                    MindpressESMapping.MP_ES_INDEX_NAME, false, esdata);
            if (isSync) {
                BulkResponse bulkResponse = restHighLevelClientService.sync(request);
                for (BulkItemResponse bulkItemResponse : bulkResponse) {
                    if (bulkItemResponse.isFailed()) {
                        BulkItemResponse.Failure failure = bulkItemResponse.getFailure();
                        log.error("async, failure: " + failure.getMessage());
                    }
                }
            } else {
                restHighLevelClientService.async(request);
            }

            return true;
        } catch (IOException ioe) {
            log.warn("transferData io exception, isSync:{}, {}", isSync, ioe.getMessage());
            return false;
        } catch (Exception e) {
            log.warn("transferData  exception, isSync:{}, {}", isSync, e.getMessage());
            return false;
        }
    }
}
