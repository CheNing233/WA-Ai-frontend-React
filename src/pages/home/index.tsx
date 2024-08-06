import {Button, Grid, Space} from "@arco-design/web-react";
import {ControlPlatformIcon} from "tdesign-icons-react";
import ImageCard from "@/components/imageCard";
import GridExt from "@/components/gridExt";

const Home = () => {

    const {GridItem} = Grid;

    return (
        <div style={{padding: '32px 48px 32px 48px'}}>
            <GridExt
                cols={{
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 9,
                    xl: 12,
                    xxl: 15,
                }}
                refContainerWidth={true}
                colGap={24}
                rowGap={24}
                style={{width: '100%'}}
                collapsed={true}
                collapsedRows={2}
            >
                <GridItem
                    span={6}
                >
                    <div style={{width: '100%', aspectRatio: '6/4'}}>
                        <div
                            style={{
                                position: 'relative',
                                top: '50%',
                                transform: 'translate(0, -55%)',
                                padding: '24px'
                            }}
                        >
                            <h1 style={{color: 'var(--color-text-1)'}}>欢迎来到 WA，今天想画点什么？</h1>
                            <p style={{color: 'var(--color-text-1)'}}>这里是 WA，一个基于 Stable Diffusion 的 AI
                                生成平台。我们在这里提供免费的图片生成服务，包括文生图、图生图、超分放大等。并提供各式各样的附加模型。如果你有更好的想法或是想加入开发，请及时联系我们。</p>
                            <Space>
                                <Button size={'large'} type={'primary'} shape={'round'}
                                        icon={<ControlPlatformIcon/>}>打开工作台</Button>
                                <Button size={'large'} shape={'round'}>探索所有帖子 {' >'}</Button>
                            </Space>

                        </div>
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1718369431376.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1718249775686.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1717883976272.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1717789813510.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1717103499089.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
                <GridItem
                    span={3}
                >
                    <div style={{position: 'relative', width: '100%', aspectRatio: '3/4.14', overflow: 'hidden'}}>
                        <ImageCard
                            width={'100%'}
                            src={'https://obj.glcn.top/wa-image/1717347981049.png?imageMogr2/auto-orient/thumbnail/1536x1536%3E/format/webp/blur/1x0/quality/100'}
                            // fit={'cover'}
                        />
                    </div>
                </GridItem>
            </GridExt>
        </div>
    )
}

export default Home