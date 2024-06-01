package com.github.aborn.mindpress.inf.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author aborn
 * @description /
 * @date 2022-05-28
 **/
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Query {

    String propName() default "";

    Type type() default Type.EQUAL;

    /**
     * 连接查询的属性名，如User类中的dept
     */
    String joinName() default "";

    /**
     * default left join
     */
    Join join() default Join.LEFT;

    /**
     * bulrry search @Query(blurry = "email,username")
     */
    String blurry() default "";

    enum Type {
        EQUAL, GREATER_THAN, LESS_THAN, INNER_LIKE, LEFT_LIKE, RIGHT_LIKE, LESS_THAN_NQ, IN, NOT_IN, NOT_EQUAL, BETWEEN, NOT_NULL, IS_NULL, FIND_IN_SET
    }

    enum Join {
        LEFT, RIGHT, INNER
    }

}

