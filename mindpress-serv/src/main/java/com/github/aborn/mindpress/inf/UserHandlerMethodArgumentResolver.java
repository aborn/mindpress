package com.github.aborn.mindpress.inf;

import com.github.aborn.mindpress.inf.annotation.CurrentUser;
import com.github.aborn.mindpress.inf.base.User;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * @author aborn
 * @date 2022/06/13 07:13
 */
@Component
public class UserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentUser.class) &&
                parameter.getParameterType().isAssignableFrom(User.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer container,
                                  NativeWebRequest request, WebDataBinderFactory factory) {
        // 从header中获取用户信息
        String uid = request.getHeader("uid");
        User user = new User();
        user.setUid(uid);
        return user;
    }
}
