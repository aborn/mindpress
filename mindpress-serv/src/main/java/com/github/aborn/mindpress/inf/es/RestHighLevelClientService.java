package com.github.aborn.mindpress.inf.es;

import com.alibaba.fastjson2.JSONObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.config.RequestConfig;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.DocWriteResponse;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.common.util.concurrent.ListenableFuture;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 14:28
 */
@Service
public class RestHighLevelClientService {

    @Resource
    private RestHighLevelClient client;

    /**
     * 创建索引
     *
     * @param indexName
     * @param settings
     * @param mapping
     * @return
     * @throws IOException
     */
    public CreateIndexResponse createIndex(String indexName, String settings, String mapping) throws IOException {
        CreateIndexRequest request = new CreateIndexRequest(indexName);
        if (null != settings && !"".equals(settings)) {
            request.settings(settings, XContentType.JSON);
        }
        if (null != mapping && !"".equals(mapping)) {
            request.mapping(mapping, XContentType.JSON);
        }
        return client.indices().create(request, RequestOptions.DEFAULT);
    }

    public boolean indexExists(String indexName) throws IOException {
        GetIndexRequest request = new GetIndexRequest(indexName);
        return client.indices().exists(request, RequestOptions.DEFAULT);
    }

    public boolean checkESConnected() {
        try {
            RequestConfig requestConfig = RequestConfig.custom()
                    .setConnectTimeout(1000)
                    .setSocketTimeout(2000)
                    .build();
            RequestOptions options = RequestOptions.DEFAULT.toBuilder()
                    .setRequestConfig(requestConfig)
                    .build();

            return client.ping(options);
        } catch (Exception e) {
            System.out.println("Can't get status : " + e.getMessage());
            return false; // Not available
        }
    }

    /**
     * 搜索
     */
    public SearchResponse search(String key, int pageNumber, int pageSize, String... indexNames) throws IOException {
        SearchRequest request = new SearchRequest(indexNames);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        //查询条件使用QueryBuilders工具来实现
        //QueryBuilders.termQuery 精准查询
        //QueryBuilders.matchAllQuery() 匹配全部

        MatchQueryBuilder contentQuery = QueryBuilders.matchQuery("content", key)
                .fuzziness(Fuzziness.AUTO)
                .prefixLength(3)
                .maxExpansions(10);
        MatchQueryBuilder titleQuery = new MatchQueryBuilder("title", key);
        MatchQueryBuilder descQuery = new MatchQueryBuilder("desc", key);

        // content or title
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery()
                .should(contentQuery)
                .should(titleQuery)
                .should(descQuery)
                .minimumShouldMatch(1);

        searchSourceBuilder.query(boolQueryBuilder);
        // searchSourceBuilder.query(contentQuery);

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<span style=\"color:red\">"); // 高亮前缀
        highlightBuilder.postTags("</span>"); // 高亮后缀

        highlightBuilder.fields().add(new HighlightBuilder.Field("title")); // 高亮字段
        highlightBuilder.fields().add(new HighlightBuilder.Field("content")); // 高亮字段

        searchSourceBuilder.highlighter(highlightBuilder);

        // return part fields
        String[] includeFields = new String[]{"title", "content"};
        String[] excludeFields = new String[]{};
        // searchSourceBuilder.fetchSource(includeFields, excludeFields);

        searchSourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
        searchSourceBuilder.from(pageNumber); // from 0
        searchSourceBuilder.size(pageSize);   // pagesize default 10
        searchSourceBuilder.sort(new FieldSortBuilder("updateTime").order(SortOrder.DESC));
        request.source(searchSourceBuilder);

        // log.info("[search query:{}]",request.source().toString());
        return client.search(request, RequestOptions.DEFAULT);
    }

    /**
     * 批量导入
     *
     * @param indexName
     * @param isAutoId  使用自动id 还是使用传入对象的id
     * @param source
     * @return
     * @throws IOException
     */
    public BulkRequest buildImportRequest(String indexName, boolean isAutoId, List<ESMarkdownItem> source) {
        if (CollectionUtils.isEmpty(source)) {
            return null;
        }
        BulkRequest request = new BulkRequest();

        for (ESMarkdownItem node : source) {
            if (isAutoId) {
                request.add(new IndexRequest(indexName).source(JSONObject.toJSONString(node), XContentType.JSON));
            } else {
                request.add(new IndexRequest(indexName)
                        .id(node.getId().toString())
                        .source(JSONObject.toJSONString(node), XContentType.JSON));
            }
        }
        return request;
    }

    public BulkResponse sync(BulkRequest request) throws IOException {
        return client.bulk(request, RequestOptions.DEFAULT);
    }

    public void async(BulkRequest request) {
        ActionListener<BulkResponse> listener = new ActionListener<BulkResponse>() {
            @Override
            public void onResponse(BulkResponse bulkResponse) {
                if (bulkResponse.hasFailures()) {
                    System.out.println("async has failure!");
                } else {
                    System.out.println("async transfer success!");
                }
                for (BulkItemResponse bulkItemResponse : bulkResponse) {
                    DocWriteResponse itemResponse = bulkItemResponse.getResponse();

                    if (bulkItemResponse.isFailed()) {
                        BulkItemResponse.Failure failure = bulkItemResponse.getFailure();
                        System.out.println("async, failure: " + failure.getMessage());
                    }

                    switch (bulkItemResponse.getOpType()) {
                        case INDEX:
                        case CREATE:
                            IndexResponse indexResponse = (IndexResponse) itemResponse;
                            break;
                        case UPDATE:
                            UpdateResponse updateResponse = (UpdateResponse) itemResponse;
                            break;
                        case DELETE:
                            DeleteResponse deleteResponse = (DeleteResponse) itemResponse;
                    }
                }
            }

            @Override
            public void onFailure(Exception e) {
                System.out.println("async to es failed.");
            }
        };

        client.bulkAsync(request, RequestOptions.DEFAULT, listener);
    }
}
