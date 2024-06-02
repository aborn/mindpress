package com.github.aborn.mindpress.inf.es;

/**
 * @author aborn (jiangguobao)
 * @date 2024/06/02 15:46
 */
public class MindpressESConfig {
    public static String MP_ES_INDEX_NAME = "MINDPRESS";
    public static String MP_ES_SETTINGS = "" +
            "  {\n" +
            "      \"number_of_shards\" : \"2\",\n" +
            "      \"number_of_replicas\" : \"0\"\n" +
            "   }";

    public static String MP_ES_MAPPINGS = "" +
            "{\n" +
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
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"desc\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"tags\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\", \n" +
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
            "        \"analyzer\": \"ik_max_word\", \n" +
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
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"ext\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"content\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\", \n" +
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
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      },\n" +
            "      \"updateBy\" : {\n" +
            "        \"type\": \"text\",\n" +
            "        \"analyzer\": \"ik_max_word\", \n" +
            "        \"search_analyzer\": \"ik_smart\",\n" +
            "        \"fields\": {\n" +
            "          \"keyword\" : {\"ignore_above\" : 256, \"type\" : \"keyword\"}\n" +
            "        }\n" +
            "      }\n" +
            "   }\n" +
            "}";
}
