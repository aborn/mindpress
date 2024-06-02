package com.github.aborn.mindpress.inf.es;

import com.alibaba.fastjson2.JSONObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
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

    /**
     * 判断 index 是否存在
     */
    public boolean indexExists(String indexName) throws IOException {
        GetIndexRequest request = new GetIndexRequest(indexName);
        return client.indices().exists(request, RequestOptions.DEFAULT);
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
                System.out.println("success");
            }

            @Override
            public void onFailure(Exception e) {
                System.out.println("failed.");
            }
        };

        client.bulkAsync(request, RequestOptions.DEFAULT, listener);
    }
}
