import {Button, Form, Grid, Input, Space, VerificationCode} from "@arco-design/web-react";
import {IconEmail, IconLock, IconSend, IconTag, IconUser} from "@arco-design/web-react/icon";
import useLocale from "@/utils/useLocale";

import locale from './locate';

const initialFormValues = {
    user: '',
    password: '',
}

const Register = () => {
    // 语言包
    const loc = useLocale(locale);

    // form
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            style={{width: "100%"}}
            wrapperCol={{span: 24}}
            initialValues={initialFormValues}
            autoComplete="off"
        >
            <Space direction={"vertical"} size={16} style={{width: "100%"}}>
                <Form.Item
                    style={{width: "100%", marginBottom: "0"}}
                    field={"userName"}
                    extra={loc['register.form.userName.help']}
                    rules={[
                        {required: true, message: loc['form.error.required']}
                    ]}
                >
                    <Input
                        style={{width: "100%"}}
                        prefix={<IconUser/>}
                        placeholder={loc['register.form.userName.placeholder']}
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    style={{width: "100%", marginBottom: "0"}}
                    field={"nickName"}
                    extra={loc['register.form.nickName.help']}
                    rules={[
                        {required: true, message: loc['form.error.required']}
                    ]}
                >
                    <Input
                        style={{width: "100%"}}
                        prefix={<IconTag/>}
                        placeholder={loc['register.form.nickName.placeholder']}
                        allowClear
                    />
                </Form.Item>

                <Form.Item
                    style={{width: "100%", marginBottom: "0"}}
                    field={"email"}
                    rules={[
                        {required: true, message: loc['form.error.required']}
                    ]}
                >
                    <Input
                        style={{width: "100%"}}
                        prefix={<IconEmail/>}
                        placeholder={loc['register.form.email.placeholder']}
                        allowClear
                    />
                </Form.Item>
                <Grid.Row gutter={[16, 16]}>
                    <Grid.Col flex={"shrink"}>
                        <Form.Item
                            style={{width: "100%", marginBottom: "0"}}
                            field={"validateCode"}
                            rules={[
                                {required: true, message: loc['form.error.required']},
                            ]}
                            validateTrigger={['onFinish']}
                        >
                            <VerificationCode
                                style={{minWidth: "256px"}}
                                onChange={v => {
                                    console.log(v)
                                }}
                                onFinish={v => {
                                    console.info('onFinish: ' + v)
                                }}
                            />
                        </Form.Item>
                    </Grid.Col>
                    <Grid.Col flex={"1"}>
                    </Grid.Col>
                    <Grid.Col flex={"shrink"}>
                        <Button type={"primary"} icon={<IconSend/>}>
                            {loc['form.button.sendValidateCode']}
                        </Button>
                    </Grid.Col>
                </Grid.Row>

                <Form.Item
                    style={{width: "100%", marginBottom: "0", marginTop: "4px"}}
                    field={"password"}
                    rules={[
                        {required: true, message: loc['form.error.required']}
                    ]}
                >
                    <Input.Password
                        style={{width: "100%"}}
                        prefix={<IconLock/>}
                        placeholder={loc['register.form.password.placeholder']}
                        allowClear
                        autoComplete={'off'}
                    />
                </Form.Item>
                <Form.Item
                    style={{width: "100%", marginBottom: "0"}}
                    field={"passwordConfirm"}
                    rules={[
                        {required: true, message: loc['form.error.required']}
                    ]}
                >
                    <Input.Password
                        style={{width: "100%"}}
                        prefix={<IconLock/>}
                        placeholder={loc['register.form.passwordConfirm.placeholder']}
                        allowClear
                        autoComplete={'off'}
                    />
                </Form.Item>

                <Form.Item noStyle>
                    <Button type={"primary"} htmlType='submit' long>
                        {loc['register.form.button.register']}
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default Register