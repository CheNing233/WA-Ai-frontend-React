import request from "@/services";
import {AxiosResponse} from "axios";

// 响应接口
export interface GetUrlByStaticImageIdRes {
    /* */
    success: boolean;

    /* */
    code: number;

    /* */
    errorMsg: string;

    /* */
    data: { url: string },

    /* */
    total: number;
}

/**
 * getUrlByStaticImageId
 * @param {string} id
 * @returns
 */
export function getUrlByStaticImageId(id: string): Promise<AxiosResponse<GetUrlByStaticImageIdRes>> {
    return request.get(
        `/staticImage/url?id=${id}`,
        {
            // 请求缓存配置
            cacheSettings: {
                enable: true,
                expire: 60 * 60 * 24 * 7,
            },
        }
    );
}