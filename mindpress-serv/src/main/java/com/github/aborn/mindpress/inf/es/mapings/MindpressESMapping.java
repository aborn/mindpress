package com.github.aborn.mindpress.inf.es.mapings;

import com.alibaba.fastjson2.JSONObject;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 15:46
 */
public class MindpressESMapping {
    public static String MP_ES_INDEX_NAME = "mindpress";
    public static String MP_ES_SETTINGS = "" +
            "  {\n" +
            "      \"number_of_shards\" : \"2\",\n" +
            "      \"number_of_replicas\" : \"0\"\n" +
            "   }";

    public static String MP_ES_MAPPINGS = "" +
            "{" +
            "    \"properties\": {\n" +
            "      \"id\" : {\n" +
            "        \"type\": \"keyword\",\n" +
            "        \"ignore_above\": 64\n" +
            "      },\n" +
            "      \"articleid\" : {\n" +
            "        \"type\": \"keyword\",\n" +
            "        \"ignore_above\": 64\n" +
            "      },\n" +
            "      \"title\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"desc\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"tags\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"space\" : {\n" +
            "        \"type\": \"text\n" +
            "      },\n" +
            "      \"isPublic\" : {\n" +
            "        \"type\": \"keyword\",\n" +
            "        \"ignore_above\": 64\n" +
            "      },\n" +
            "      \"category\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"status\" : {\n" +
            "        \"type\": \"keyword\",\n" +
            "        \"ignore_above\": 64\n" +
            "      },\n" +
            "      \"refArticleid\" : {\n" +
            "        \"type\": \"keyword\",\n" +
            "        \"ignore_above\": 64\n" +
            "      },\n" +
            "      \"ext\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"content\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"createTime\" : {\n" +
            "        \"type\": \"date\",\n" +
            "        \"format\": \"yyyy-MM-dd HH:mm:ss\"\n" +
            "      },\n" +
            "      \"updateTime\" : {\n" +
            "        \"type\": \"date\",\n" +
            "        \"format\": \"yyyy-MM-dd HH:mm:ss\"\n" +
            "      },\n" +
            "      \"createBy\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"updateBy\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\",\n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "}" +
            "}" +
            "}" +

            "}";

    public static String BuildMappings() {
        JSONObject jsonObject = new JSONObject();
        JSONObject properties = new JSONObject();

        properties.put("id", buildKeyword());
        properties.put("articleid", buildKeyword());
        properties.put("title", buildText());
        properties.put("desc", buildText());
        properties.put("tags", buildText());
        properties.put("space", buildKeyword());
        properties.put("isPublic", buildKeyword());
        properties.put("category", buildText());
        properties.put("status", buildKeyword());
        properties.put("refArticleid", buildKeyword());
        properties.put("ext", buildText());
        properties.put("content", buildText());
        properties.put("createTime", buildDate());
        properties.put("updateTime", buildDate());
        properties.put("createBy", buildText());
        properties.put("updateBy", buildText());

        jsonObject.put("properties", properties);
        return jsonObject.toJSONString();
    }

    public static void main(String[] args) {
        try {
            JSONObject jsonObject = JSONObject.parseObject(BuildMappings());
        } catch (Exception e) {
            System.out.println("gg");
        }
    }

    private static JSONObject buildKeyword() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("type", "keyword");
        jsonObject.put("ignore_above", 64);
        return jsonObject;
    }

    private static JSONObject buildDate() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("type", "date");
        jsonObject.put("format", "yyyy-MM-dd HH:mm:ss");
        return jsonObject;
    }
    private static JSONObject buildText() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("type", "text");
        jsonObject.put("analyzer", "ik_max_word");
        jsonObject.put("search_analyzer", "ik_smart");

        JSONObject fields = new JSONObject();
        JSONObject keyword = new JSONObject();
        keyword.put("ignore_above", 256);
        keyword.put("type", "keyword");
        fields.put("keyword", keyword);
        jsonObject.put("fields", fields);

        return jsonObject;
    }
}
