import axios from "axios";

// const { $oidc } = useNuxtApp()
// const user = formatUserInfo($oidc)

const service = axios.create({
    timeout: 8000,
});

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code === 500 && res.msg) {
            doToast("服务端接口异常，请联系管理员。" + res.msg);
        }
        return res;
    },
    async (error) => {
        // 未授权
        if (error.response.status === 401) {
            // TODO 跳到登录页面
            location.href = "/";
        } else {
            // 请求出错，弹出错误信息
            if (error.response) {
                const res = error.response.data;
                doToast(res.message || res.error);
            } else {
                doToast("request timeout");
            }
        }
    }
);

export default service;
