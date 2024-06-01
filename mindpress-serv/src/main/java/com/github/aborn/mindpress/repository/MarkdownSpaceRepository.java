package com.github.aborn.mindpress.repository;

import com.github.aborn.mindpress.domain.MarkdownSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author aborn
 * @date 2022-05-29
 **/
public interface MarkdownSpaceRepository extends JpaRepository<MarkdownSpace, Long>, JpaSpecificationExecutor<MarkdownSpace> {
    /**
    * 根据 Name 查询
    * @param name /
    * @return /
    */
    MarkdownSpace findByName(String name);
}