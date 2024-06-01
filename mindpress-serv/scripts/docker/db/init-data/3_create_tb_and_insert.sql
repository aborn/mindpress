DROP TABLE IF EXISTS `mp_markdown_content`;
CREATE TABLE `mp_markdown_content`
(
    `id`          bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `articleid`   varchar(128) NOT NULL COMMENT 'markdown article uniq id',
    `content`     text COMMENT 'Markdown content',
    `create_by`   varchar(255) NOT NULL DEFAULT '' COMMENT 'creator,author',
    `update_by`   varchar(255) NOT NULL DEFAULT '' COMMENT 'updater',
    `create_time` datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    `update_time` datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `uniq_articleid` (`articleid`),
    KEY           `log_create_time_index` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='Markdown content info'

DROP TABLE IF EXISTS `mp_markdown_meta`;
CREATE TABLE `mp_markdown_meta`
(
    `id`            bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `articleid`     varchar(128)  NOT NULL DEFAULT '' COMMENT 'markdown article uniq id',
    `title`         varchar(255)  NOT NULL DEFAULT '' COMMENT 'title',
    `description`   varchar(1024) NOT NULL DEFAULT '' COMMENT 'description',
    `tags`          varchar(255)  NOT NULL DEFAULT '' COMMENT 'tags split by comma',
    `space`         varchar(255)  NOT NULL DEFAULT 'default' COMMENT 'the space file belongs to',
    `is_public`     tinyint(1) NOT NULL DEFAULT '0' COMMENT 'is public access, default no',
    `create_by`     varchar(255)  NOT NULL DEFAULT '' COMMENT 'markdown creator',
    `update_by`     varchar(255)  NOT NULL DEFAULT '' COMMENT 'markdown updater',
    `create_time`   datetime      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
    `update_time`   datetime      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
    `category`      varchar(256)  NOT NULL DEFAULT '' COMMENT 'category',
    `status`        int(11) NOT NULL DEFAULT '0' COMMENT 'status',
    `ref_articleid` varchar(128)  NOT NULL DEFAULT '' COMMENT 'ref articleid',
    `ext`           varchar(2048) NOT NULL DEFAULT '' COMMENT 'ext',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `uniq_articleid` (`articleid`),
    KEY             `log_create_time_index` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='Markdown meta infos'

DROP TABLE IF EXISTS `mp_markdown_space`;
CREATE TABLE `mp_markdown_space`
(
    `id`          bigint       NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `name`        varchar(255) NOT NULL COMMENT 'space uniq name',
    `desc`        varchar(255) DEFAULT NULL COMMENT 'space description',
    `owner`       varchar(255) NOT NULL COMMENT 'space owner',
    `create_by`   varchar(255) DEFAULT NULL COMMENT 'markdown creator',
    `update_by`   varchar(255) DEFAULT NULL COMMENT 'markdown updater',
    `create_time` datetime     DEFAULT NULL COMMENT 'create time',
    `update_time` datetime     DEFAULT NULL COMMENT 'update time',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `uniq_name` (`name`),
    KEY           `log_create_time_index` (`create_time`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci
  ROW_FORMAT = DYNAMIC COMMENT ='Markdown space info';

