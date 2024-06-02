docker run -d \
  --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e ES_JAVA_OPTS="-Xms512m -Xmx512m" \
  -v /Users/aborn/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
  -v /Users/aborn/es/data:/usr/share/elasticsearch/data \
  -v /Users/aborn/es/logs:/usr/share/elasticsearch/logs \
  -v /Users/aborn/es/plugins:/usr/share/elasticsearch/plugins \
  --net mindpress_net \
  elasticsearch:7.17.21
