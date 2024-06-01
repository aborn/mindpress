package com.github.aborn.mindpress.inf.utils;

import cn.hutool.core.util.ObjectUtil;
import com.github.aborn.mindpress.inf.exception.BadRequestException;

/**
 * @author aborn
 * @description /
 * @date 2022-05-28
 **/
public class ValidationUtil {

    /**
     * 验证空
     */
    public static void isNull(Object obj, String entity, String parameter , Object value){
        if(ObjectUtil.isNull(obj)){
            String msg = entity + " 不存在: "+ parameter +" is "+ value;
            throw new BadRequestException(msg);
        }
    }
}
