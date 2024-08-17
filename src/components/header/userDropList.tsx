import {Avatar, Button, Card, Divider, Menu, Message, Space, Statistic} from "@arco-design/web-react";
import {ThunderIcon, WalletIcon} from "tdesign-icons-react";
import {IconShareExternal} from "@arco-design/web-react/icon";
import clipboard from "@/utils/clipboard";
import {useHistory} from "react-router-dom";
import {IUser, useUser} from "@/store/user";
import authentication from "@/utils/authentication";
import PermissionWrapper from "@/components/permissionWrapper";

const UserDropList = () => {
    const history = useHistory();

    const userLogged = useUser((state: IUser) => state.userLogged)
    const userPerms = useUser((state: IUser) => state.userPerms)

    const result = authentication({
        requiredPermissions: [{resource: 'user', actions: ['fuck']}],
        oneOfPerm: false
    }, userPerms)
    console.log("authentication", result)

    const handleClickMenu = (key: string) => {
        console.log(key)
        switch (key){
            case 'log':
                if (userLogged){
                    // TODO 退出登录
                } else {
                    history.push('/login')
                }
                break;
        }
    }

    return (
        <Menu style={{maxHeight: '900px'}} onClickMenuItem={handleClickMenu}>
            <Menu.Item style={{height: '48px', margin: '6px 0 8px 0'}} key='avatar'>
                <Space align={'center'} style={{marginTop: '4px'}}>
                    <Avatar shape={'circle'}>
                        WA
                    </Avatar>
                    <Divider style={{margin: '0 0 0 0'}} type='vertical'/>
                    <h4 style={{margin: '0 0 0 0'}}>
                        请先登录 {'>'}
                    </h4>
                </Space>
            </Menu.Item>
            <Divider style={{margin: '0 0 0 0'}} type='horizontal'/>
            <Card>
                <Space style={{width: '100%'}} direction={'vertical'} align={'center'}>
                    <Space size={16}>
                        <Statistic
                            title={"已购算力"}
                            prefix={<ThunderIcon/>}
                            value={0}
                        />
                        <Divider style={{margin: '0 0 0 0'}} type='vertical'/>
                        <Statistic
                            title={"每日赠送"}
                            prefix={<ThunderIcon/>}
                            value={0}
                        />
                    </Space>
                    <Button.Group>
                        <Button
                            icon={<IconShareExternal/>}
                            type={'primary'}
                            shape={'round'}
                            onClick={() => {
                                clipboard('https://wa.glcn.top/')
                                    .then(() => {
                                        Message.success('本站链接已复制到剪贴板');
                                    })
                                    .catch((err) => {
                                        Message.error('本站链接复制失败，原因：' + err);
                                    })
                            }}
                        >
                            分享
                        </Button>
                        <Button icon={<WalletIcon/>} type={'primary'} shape={'round'}>
                            充值
                        </Button>
                    </Button.Group>
                </Space>
            </Card>

            <Divider style={{margin: '0 0 0 0'}} type='horizontal'/>

            <Menu.Item key='profile'>个人资料</Menu.Item>
            <Menu.Item key='favourites'>我的收藏</Menu.Item>
            <Menu.Item key='images'>我的图片</Menu.Item>
            <Menu.Item key='posts'>我的帖子</Menu.Item>

            <Divider style={{margin: '0 0 0 0'}} type='horizontal'/>

            <PermissionWrapper
                required={{
                    requiredPermissions: [{resource: 'user', actions: ['login', 'register']}],
                    oneOfPerm: true
                }}
                backup={<Menu.Item key='log' disabled={true}>登录已禁用</Menu.Item>}
            >
                <Menu.Item key='log'>
                    {userLogged ? '退出登录' : '登录'}
                </Menu.Item>
            </PermissionWrapper>
        </Menu>
    )
}

export default UserDropList