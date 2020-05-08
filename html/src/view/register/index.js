import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import './style.less'
import { register } from '@/api/login'
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
  state = {
    form: {
      username: '',
      password: ''
    }
  }
  onFinish = (values) => {
    register(values).then(({ data }) => {
      if (data.code === 0) {
        message.success('注册成功')
      }
    })
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render () {
    let { form } = this.state
    return (
      <div className="form-wrapper">
        <h2 className="title">注册</h2>
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
            label="真实名称"
            name="realname"
            rules={[{ required: true, message: '请输入真实名称' }]}>
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
              注册
            </Button>
            <Link to="/login">登录</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login