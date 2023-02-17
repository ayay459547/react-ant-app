import React, { createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, Button, Input, Form, FormInstance } from 'antd'
import { AuthForm } from '../../interface/auth'
import './s_login.scss'
import LogoSvg from '../../assets/logo.svg'
import LoginSvg from '../../assets/login.svg'
import { useAuth } from '../../utils/hook'
 
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const formRef = createRef<FormInstance>()
  const { login } = useAuth()

  const submit = (form: AuthForm) => {
    const { account = '' , password = '' } = form
    login(account, password)
    navigate(`/${process.env?.REACT_APP_PROJECT_NAME}/dashboard`)
  }

  return (
    <div className='login-container'>
      <div className="login-left">
        <img src={LoginSvg} alt="login" className='login-img'/>
      </div>

      <div className="login-right">
        <Form 
          ref={formRef} 
          {...layout} 
          className="login-form"
          initialValues={{ account: 'admin', password: 'admin' }}
          onFinish={submit}
        >
          <Form.Item {...tailLayout}>
            <img src={LogoSvg} alt="React" className='login-logo'/>
            <h3 className='login-title c-ma-clear'>Login</h3>
          </Form.Item>

          <Form.Item 
            label="帳號" 
            name="account" 
            rules={[
              { type: 'string', required: true }
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
            label="密碼" 
            name="password"
            rules={[
              { type: 'string', required: true }
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="default" htmlType="reset">
                清除
              </Button>
              <Button type="primary" htmlType="submit">
                登入
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
