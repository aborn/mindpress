package com.github.aborn.mindpress.repository;

import com.github.aborn.mindpress.domain.MarkdownMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

/**
 * @author aborn
 * @date 2022-05-29
 **/
public interface MarkdownMetaRepository extends JpaRepository<MarkdownMeta, Long>, JpaSpecificationExecutor<MarkdownMeta> {
    /**
    * 根据 Articleid 查询
    * @param articleid /
    * @return /
    */
    Optional<MarkdownMeta> findByArticleid(String articleid);
}