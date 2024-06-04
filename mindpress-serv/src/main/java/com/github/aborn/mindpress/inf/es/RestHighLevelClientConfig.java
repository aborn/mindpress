package com.github.aborn.mindpress.inf.es;

import lombok.Data;
import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.Node;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 14:27
 */
@Configuration
@PropertySource("classpath:es-config.properties")
@Data
public class RestHighLevelClientConfig {

    @Value("${es.host}")
    private String host;
    @Value("${es.port}")
    private int port;
    @Value("${es.scheme}")
    private String scheme;
    @Value("${es.token}")
    private String token;
    @Value("${es.charset}")
    private String charSet;
    @Value("${es.client.connectTimeOut}")
    private int connectTimeOut;
    @Value("${es.client.socketTimeout}")
    private int socketTimeout;

    private boolean status = true;

    @Bean
    public RestClientBuilder restClientBuilder() {
        RestClientBuilder restClientBuilder = RestClient.builder(new HttpHost(host, port, scheme));
        Header[] defaultHeaders = new Header[]{
                new BasicHeader("Accept", "*/*"),
                new BasicHeader("Charset", charSet),
                // 设置token 是为了安全 网关可以验证token来决定是否发起请求 我们这里只做象征性配置
                new BasicHeader("E_TOKEN", token)
        };
        restClientBuilder.setDefaultHeaders(defaultHeaders);

        restClientBuilder.setFailureListener(new RestClient.FailureListener() {
            @Override
            public void onFailure(Node node) {
                System.out.println("监听某个es节点失败" + node.toString());
                status = false;
            }
        });

        // custom config
        restClientBuilder.setRequestConfigCallback(new RestClientBuilder.RequestConfigCallback() {
            @Override
            public RequestConfig.Builder customizeRequestConfig(RequestConfig.Builder requestConfigBuilder) {
                return requestConfigBuilder.setSocketTimeout(connectTimeOut)
                        .setSocketTimeout(socketTimeout);
            }
        });

        return restClientBuilder;
    }

    @Bean
    public RestHighLevelClient restHighLevelClient(RestClientBuilder restClientBuilder) {
        return new RestHighLevelClient(restClientBuilder);
    }
}
