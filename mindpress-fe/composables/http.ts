import axios from 'axios'

export interface PageData<T> {
    totalElements: number,
    content: T[],
}
export interface HttpBaseResponse<T> {
    success: boolean;
    code: number;
    msg: string;
    data: T;
    ext: object;
}

export const fetchSetting = {
    pageField: 'page',
    sizeField: 'pageSize',
    listField: 'content',
    totalField: 'totalElements',
};

interface FetchParams {
    page?: number;
    pageSize?: number;
    url: string;
    method?: string;  // post/get
    params?: object;
}

export interface FetchOption {
    method?: string;
    headers?: object;
    space?: string,
    data?: object,
}

export function createAxiosFetch(url: string, opt: FetchOption) {
    return (params: FetchParams) : Promise<any> => {
        const httpMethod = opt.method || params.method || 'get';
        const httpUrl = params.url || url;
        return new Promise((resolve, reject) => {
            axios({
                method: httpMethod,
                url: httpUrl,
                params: {
                    page: params.page,
                    size: params.pageSize,
                    space: opt.space,
                    ...params.params
                },
                headers: opt.headers,
                data: opt.data,
            }).then(function (response) {
                console.log(response.data)
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(error)
            });
        });
    } 
}

interface ApiParams {
    url: string;
    method: 'post' | 'get' | 'put';  // post/get
    params?: object;
    data?: object;    // post data
    headers?: object;
}

function createAxiosApi() {
    return (params: ApiParams) : Promise<any> => {
        const httpMethod = params.method
        const httpUrl = params.url
        return new Promise((resolve, reject) => {
            axios({
                method: httpMethod,
                url: httpUrl,
                params: params.params,
                data: params.data,
                headers: params.headers,
            }).then(function (response) {
                console.log(response.data)
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(error)
            });
        });
    } 
}

export const api = createAxiosApi();