package com.github.aborn.mindpress.inf.base;

import java.util.List;

/**
 * @author aborn
 * @description /
 * @date 2022-05-28
 **/
public interface BaseMapper<D, E> {

    /**
     * DTO to Entity
     * @param dto /
     * @return /
     */
    E toEntity(D dto);

    /**
     * Entity to DTO
     * @param entity /
     * @return /
     */
    D toDto(E entity);

    /**
     * DTOs to Entity list
     * @param dtoList /
     * @return /
     */
    List <E> toEntity(List<D> dtoList);

    /**
     * Entity list to DTOs
     * @param entityList /
     * @return /
     */
    List <D> toDto(List<E> entityList);
}
