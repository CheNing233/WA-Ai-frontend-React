import {create} from 'zustand'
import {IModel} from "@/services/modules/models";
import {removeDuplicateById, removeObjectById, updateObjectInArray} from "@/utils/array";

export type IWorkbenchSetting = {
    width?: string | number | any,
    setWidth?: (width: string | number) => void,
    wrapperInDrawer?: boolean,
    setWrapperInDrawer?: (wrapperInDrawer: boolean) => void,
    activeTab?: string,
    setActiveTab?: (activeTab: string) => void,
    activePanel?: string[],
    setActivePanel?: (activePanel: string[]) => void,
}


export const useWorkbenchSetting = create<IWorkbenchSetting>((set) => ({
    width: '100vw',
    setWidth: (width: string | number) => set(() => ({width})),
    wrapperInDrawer: true,
    setWrapperInDrawer: (wrapperInDrawer: boolean) => set(() => ({wrapperInDrawer})),
    activeTab: 'txt2img',
    setActiveTab: (activeTab: string) => set(() => ({activeTab})),
    activePanel: [
        'txt2img-model',
        'txt2img-prompt',
        'txt2img-settings',
        'txt2img-hires',

        'img2img-image',
        'img2img-model',
        'img2img-prompt',
        'img2img-settings',
        'img2img-hires',

        'extra-image',
        'extra-setting'
    ],
    setActivePanel: (activePanel: string[]) => set(() => (
        {activePanel: Array.from(new Set(activePanel))}
    )),
}))

export type IWorkbenchModel = {
    id: string | number,
    title: string,
    type: string,
    filename: string,

    asNegative?: boolean,
    weight?: number,

    bannerUrl?: string,
}

export type IWorkbenchModels = {
    txt2imgCheckpoint: IWorkbenchModel,
    img2imgCheckpoint: IWorkbenchModel,
    txt2imgVae: IWorkbenchModel,
    img2imgVae: IWorkbenchModel,
    txt2imgExtraModel: IWorkbenchModel[],
    img2imgExtraModel: IWorkbenchModel[],
    setModel: (
        model: IWorkbenchModel | IModel | any,
        target: 'txt2img' | 'img2img'
    ) => void,
    deleteModel: (
        modelId: string | number,
        target: 'txt2img' | 'img2img'
    ) => void,
    changeModel: (
        modelId: string | number,
        target: 'txt2img' | 'img2img',
        key: string,
        value: any
    ) => void,
}

const initialCheckpoint: IWorkbenchModel = {
    id: 277,
    title: 'tmndMix_tmndMixSPRAINBOW',
    type: 'CHECKPOINT',
    filename: 'tmndMix_tmndMixSPRAINBOW'
}

const initialVae: IWorkbenchModel = {
    id: 250,
    title: 'ClearVAE_NansLess1.safetensors',
    type: 'VAE',
    filename: 'ClearVAE_NansLess1.safetensors'
}

export const useWorkbenchModels = create<IWorkbenchModels>((set) => ({
    txt2imgCheckpoint: {...initialCheckpoint},
    img2imgCheckpoint: {...initialCheckpoint},
    txt2imgVae: {...initialVae},
    img2imgVae: {...initialVae},
    txt2imgExtraModel: [],
    img2imgExtraModel: [],
    setModel: (model, target) => set((state) => {
        const fitModel: IWorkbenchModel = {
            id: model.id,
            title: model.title,
            type: model.type,
            filename: model.filename,
            weight: 1,
            asNegative: false,
            bannerUrl: model.bannerUrl || null
        }

        switch (fitModel.type) {
            case 'CHECKPOINT':
                if (target === 'txt2img')
                    return {txt2imgCheckpoint: fitModel}
                else if (target === 'img2img')
                    return {img2imgCheckpoint: fitModel}
                break;
            case 'VAE':
                if (target === 'txt2img')
                    return {txt2imgVae: fitModel}
                else if (target === 'img2img')
                    return {img2imgVae: fitModel}
                break;
            default:
                if (target === 'txt2img')
                    return {
                        txt2imgExtraModel: removeDuplicateById(
                            [...state.txt2imgExtraModel, fitModel]
                        )
                    }
                else if (target === 'img2img')
                    return {
                        img2imgExtraModel: removeDuplicateById(
                            [...state.img2imgExtraModel, fitModel]
                        )
                    }
        }
    }),
    deleteModel: (modelId, target) => set((state) => {
        if (target === 'txt2img')
            return {txt2imgExtraModel: removeObjectById(modelId, state.txt2imgExtraModel)}
        else if (target === 'img2img')
            return {img2imgExtraModel: removeObjectById(modelId, state.img2imgExtraModel)}
    }),
    changeModel: (modelId, target, key, value) => set((state) => {
        if (target === 'txt2img')
            return {txt2imgExtraModel: updateObjectInArray(state.txt2imgExtraModel, modelId, key, value)}
        else if (target === 'img2img')
            return {img2imgExtraModel: updateObjectInArray(state.img2imgExtraModel, modelId, key, value)}
    }),
}))


type ITxt2ImgParams = {
    prompt: string;
    steps: number;
    seed: number;
    sampler_name: string;
    cfg_scale: number;
    width: number;
    height: number;
    negative_prompt: string;
    enable_hr: boolean;
    denoising_strength: number;
    n_iter: number;
    hr_scale: number;
    hr_upscaler: string;
    hr_second_pass_steps: number;
    override_settings: {
        sd_model_checkpoint: string;
        sd_vae: string;
        CLIP_stop_at_last_layers: number;
        eta_noise_seed_delta: number;
    };
};

type IImg2ImgParams = {
    prompt: string;
    steps: number;
    seed: number;
    sampler_name: string;
    cfg_scale: number;
    width: number;
    height: number;
    negative_prompt: string;
    denoising_strength: number;
    n_iter: number;
    override_settings: {
        sd_model_checkpoint: string;
        sd_vae: string;
        CLIP_stop_at_last_layers: number;
        eta_noise_seed_delta: number;
    };
    restore_faces: boolean;
    tiling: boolean;
    resize_mode: number;
    mask: string | null;
    mask_blur: number;
    inpainting_fill: number;
    inpaint_full_res: boolean;
    inpaint_full_res_padding: number;
    inpainting_mask_invert: number;
    initial_noise_multiplier: 1 | number;
    init_images: string | string[];

    scaleByOriginal?: boolean;
    scaleNumber?: number;
    allowMask?: boolean;
};

type IExtraParams = {
    resize_mode: number;
    show_extras_results: boolean;
    gfpgan_visibility: number;
    codeformer_visibility: number;
    codeformer_weight: number;
    upscaling_resize: number;
    upscaling_resize_w: number;
    upscaling_resize_h: number;
    upscaling_crop: boolean;
    upscaler_1: string;
    upscaler_2: string;
    extras_upscaler_2_visibility: number;
    upscale_first: boolean;
    image: string;
};

export type IWorkbenchParams = {
    txt2imgParams: ITxt2ImgParams;
    setTxt2imgParams: (txt2imgParams: ITxt2ImgParams) => void;
    img2imgParams: IImg2ImgParams;
    setImg2imgParams: (img2imgParams: IImg2ImgParams) => void;
    extraParams: IExtraParams;
    setExtraParams: (extraParams: IExtraParams) => void;
    generateCount: number,
    setGenerateCount: (generateCount: number) => void,
};


export const useWorkbenchParams = create<IWorkbenchParams>((set) => ({
    txt2imgParams: {
        prompt: "",
        steps: 28,
        seed: -1,
        sampler_name: "Euler a",
        cfg_scale: 7.0,
        width: 512,
        height: 768,
        negative_prompt: "(worst quality:2), (low quality:2), (normal quality:2),",
        enable_hr: true,
        denoising_strength: 0.58,
        n_iter: 1,
        hr_scale: 2.0,
        hr_upscaler: "Latent",
        hr_second_pass_steps: 20,
        override_settings: {
            sd_model_checkpoint: "",
            sd_vae: "ClearVAE_NansLess1.safetensors",
            CLIP_stop_at_last_layers: 2,
            eta_noise_seed_delta: 0,
        },
    },
    setTxt2imgParams: (txt2imgParams: ITxt2ImgParams) => set(() => ({txt2imgParams})),
    img2imgParams: {
        prompt: "",
        steps: 28,
        seed: -1,
        sampler_name: "Euler a",
        cfg_scale: 7.0,
        width: 512,
        height: 768,
        negative_prompt: "(worst quality:2), (low quality:2), (normal quality:2),",
        denoising_strength: 0.58,
        n_iter: 1,
        override_settings: {
            sd_model_checkpoint: "",
            sd_vae: "ClearVAE_NansLess1.safetensors",
            CLIP_stop_at_last_layers: 2,
            eta_noise_seed_delta: 0
        },
        restore_faces: false,
        tiling: false,
        resize_mode: 0,
        mask: null,
        mask_blur: 4,
        inpainting_fill: 1,
        inpaint_full_res: false,
        inpaint_full_res_padding: 32,
        inpainting_mask_invert: 0,
        initial_noise_multiplier: 1,
        init_images: [],

        scaleByOriginal: true,
        scaleNumber: 1,
        allowMask: false,
    },
    setImg2imgParams: (img2imgParams: IImg2ImgParams) => set(() => ({img2imgParams})),
    extraParams: {
        resize_mode: 0,
        show_extras_results: true,
        gfpgan_visibility: 0,
        codeformer_visibility: 0,
        codeformer_weight: 0,
        upscaling_resize: 4.0,
        upscaling_resize_w: 512,
        upscaling_resize_h: 512,
        upscaling_crop: true,
        upscaler_1: "R-ESRGAN 4x+ Anime6B",
        upscaler_2: "None",
        extras_upscaler_2_visibility: 0,
        upscale_first: false,
        image: ''
    },
    setExtraParams: (extraParams: IExtraParams) => set(() => ({extraParams})),
    generateCount: 1,
    setGenerateCount: (generateCount) => set(() => ({generateCount}))
}))


// export type IWorkbenchParams = {
//     txt2imgParams: any,
//     setTxt2imgParams: (txt2imgParams: any) => void,
//     img2imgParams: any,
//     setImg2imgParams: (img2imgParams: any) => void,
//     extraParams: any,
//     setExtraParams: (extraParams: any) => void,
// }
//
// export const useWorkbenchParams = create((set) => ({
//     txt2imgParams: {
//         "prompt": "",
//         "steps": 28,
//         "seed": -1,
//         "sampler_name": "Euler a",
//         "cfg_scale": 7.0,
//         "width": 512,
//         "height": 768,
//         "negative_prompt": "(worst quality:2), (low quality:2), (normal quality:2),",
//         "enable_hr": true,
//         "denoising_strength": 0.58,
//         "n_iter": 1,
//         "hr_scale": 2.0,
//         "hr_upscaler": "Latent",
//         "hr_second_pass_steps": 20,
//         "override_settings": {
//             "sd_model_checkpoint": "",
//             "sd_vae": "ClearVAE_NansLess1.safetensors",
//             "CLIP_stop_at_last_layers": 2,
//             "eta_noise_seed_delta": 0,
//         },
//     },
//     setTxt2imgParams: (txt2imgParams: any) => set(() => ({txt2imgParams})),
//     img2imgParams: {
//         "prompt": "",
//         "steps": 28,
//         "seed": -1,
//         "sampler_name": "Euler a",
//         "cfg_scale": 7.0,
//         "width": 512,
//         "height": 768,
//         "negative_prompt": "(worst quality:2), (low quality:2), (normal quality:2),",
//         "denoising_strength": 0.58,
//         "n_iter": 1,
//         "override_settings": {
//             "sd_model_checkpoint": "",
//             "sd_vae": "ClearVAE_NansLess1.safetensors",
//             "CLIP_stop_at_last_layers": 2,
//             "eta_noise_seed_delta": 0
//         },
//         "restore_faces": false, // 停用人脸修复
//         "tiling": false, // 停用tiling
//         "resize_mode": 0,
//         "mask": "",
//         "mask_blur": 4, // 蒙版边缘模糊
//         "inpainting_fill": 1, // 蒙版区域内容处理
//         "inpaint_full_res": false, // 仅蒙版区域重绘
//         "inpaint_full_res_padding": 32, // 仅蒙版区域重绘下，蒙版边缘预留像素
//         "inpainting_mask_invert": 0, // 蒙版模式，是否反转蒙版
//         // "latent_mask": null, // latent mask，不使用需要留null禁用
//         "init_images": "",
//     },
//     setImg2imgParams: (img2imgParams: any) => set(() => ({img2imgParams})),
//     extraParams: {
//         "resize_mode": 0,
//         "show_extras_results": true,
//         "gfpgan_visibility": 0,
//         "codeformer_visibility": 0,
//         "codeformer_weight": 0,
//         "upscaling_resize": 4.0,
//         "upscaling_resize_w": 512,
//         "upscaling_resize_h": 512,
//         "upscaling_crop": true,
//         "upscaler_1": "R-ESRGAN 4x+ Anime6B",
//         "upscaler_2": "None",
//         "extras_upscaler_2_visibility": 0,
//         "upscale_first": false,
//         "image": ''
//     },
//     setExtraParams: (extraParams: any) => set(() => ({extraParams})),
// }))