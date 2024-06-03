export interface Base {
    createBy: string;
    updateBy: string;
    createTime: number;
    updateTime: number;
}

export interface PageResponse<T> {
    totalElements: number;
    content: T[];
}

export interface MarkdownMetaS extends Base {
    articleid: string;
    category: string;
    desc: string;
    ext?: string;
    id: number;
    isPublic: number;
    likeCountVo?: number;
    refArticleid?: string;
    reviewNote?: string;
    reviews?: string;
    reviewInfo?: string;
    space: string;
    status: number;
    title: string;
    tags: string;    
    highlight?: object;
}

export type MarkdownMetaPageResponse = PageResponse<MarkdownMetaS>;

export interface AuthMeta {
    name: string;
    link: string;
    uid?: string;
    avatar?: string;
}

// 对应的是将 MarkdownMeta 转化后的数据
export interface MarkdownMeta {
    articleid: string;
    authors: AuthMeta[];
    category: string;
    createBy: string;
    createTime: number;
    date: number;
    description: string;
    editlink: string;
    isPublic: boolean;
    id: number;
    likeCount: number;
    permalink: string;
    reviewInfo?: string;
    space: string;
    status: number;
    tags: string[];
    title: string;
    updateTime: number;
    _type: string;    
    highlightHtml?: string;
    highlightTitle?: string;
}