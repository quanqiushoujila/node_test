import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import './style.less'
import { login } from '@/api/login'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

class Login extends Component {

  onFinish = (values) => {
    login(values).then(({ data }) => {
      if (data.code === 0) {
        message.success('登录成功')
      } else {
        message.warning('登录失败')
      }
    })
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render () {
    return (
      <div className="form-wrapper">
        <h2 className="title">登录</h2>
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Link to="/register">注册</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login