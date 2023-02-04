import React from 'react'
import { Modal, Form, Input, Button, Space, message } from 'antd'
import { createUser } from '../../api/user'
import { responseType } from '../../utils/request'

interface PropsType {
  isShow: boolean
  setIsShow: (status: boolean) => void
  setGetDataCount: (callback: (oddValue: number) => number) => void
}

interface FormType {
  username: string
  age: string
  email: string
  address: string
}

const tailLayout = {
  wrapperCol: { offset: 16, span: 8 }
}

const Create: React.FC<PropsType> = ({ isShow, setIsShow, setGetDataCount }) => {
  const [createForm] = Form.useForm<FormType>()

  const onFinish = async (values: FormType) => {
    const { username = '' , age = '', email = '', address = '' } = values

    await createUser(username, age, email, address).then(response => {
      const { code, msg } = (response as responseType)
      if (code === 200) {
        message.success(msg)
      }
      console.log(response)
    })
    createForm.resetFields()
    setIsShow(false)
    setGetDataCount((oddValue: number) => oddValue + 1)
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    setIsShow(false)
  }

  return  (
    <Modal 
      forceRender
      title="新增使用者" 
      open={isShow}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        name="basic"
        form={createForm}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Create