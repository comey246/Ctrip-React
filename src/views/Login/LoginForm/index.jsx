import React, {Fragment, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from '@/redux/global/action.js';
import {loginPost, loginGet} from "@/api/login.js";
import {encodePassword} from "@/utils/util.js";
import './index.css'
import { Button, Checkbox, Form, Input,message } from 'antd';

const LoginForm = (props) => {
  const navigate = useNavigate();
    const { setToken} = props;
  const [loading, setLoading] = useState(false);

  useEffect(()=>{

  })

  const onFinish = async (loginForm) => {
    try {
        console.log('Success:', loginForm);
        const {username, password} = loginForm
        setLoading(true);

        const {data:{publicKeyPem}} = await loginGet({username})
        const encryptedBase64 = encodePassword(publicKeyPem,password)
        const data = await loginPost({username,password:encryptedBase64});
        // setToken(data?.access_token);
        // setTabsList([]);
        message.success("登录成功！");
        navigate("/mall");
        console.log('跳转')
		} finally {
			setLoading(false);
		}
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Fragment>
        <div className="loginForm">
        <h2>登陆页面</h2>
        <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </div>
    </Fragment>
 )
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginForm);