package com.github.aborn.mindpress.inf.base;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author aborn
 * @date 2022/05/30 11:28
 */
@Data
@RequiredArgsConstructor
public class BaseResponse<T> implements Serializable {
    private static final long serialVersionUID = -7373628586421646818L;

    private boolean success;
    private int code;
    private String msg;
    private T data;
    private Map<String, Object> ext;

    public static <T> BaseResponse<T> success(T data) {
        return generateResponse(true, 200, "success", data, null);
    }

    public void addExt(String key, Object value) {
        if (this.ext == null) {
            this.ext = new HashMap<>();
        }
        this.ext.put(key, value);
    }

    private static <T> BaseResponse<T> generateResponse(boolean success, int code, String msg,
                                                        T data, Map<String, Object> ext) {
        BaseResponse<T> response = new BaseResponse();
        response.success = success;
        response.code = code;
        response.msg = msg;
        response.data = data;
        response.ext = ext;
        return response;
    }
}
