import React, { useEffect } from 'react'
import { Modal, Form, Input, Button, Space } from 'antd'
import { db } from '../../indexedDB'

interface PropsType {
  inputValue: string
  updateId: number
  isShow: boolean
  resetTemp: () => void
}

interface FormType {
  title: string
}

const tailLayout = {
  wrapperCol: { offset: 16, span: 8 }
}

const EditList: React.FC<PropsType> = (props) => {
  const { inputValue, updateId, isShow, resetTemp } = props

  const [editForm] = Form.useForm<FormType>()

  useEffect(() => {
    editForm.setFieldsValue({ title: inputValue })
  }, [inputValue, isShow])

  const onFinish = (values: FormType) => {
    const { title = '' } = values
    db.chatList.update(updateId, { title })

    editForm.resetFields()
    resetTemp()
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    resetTemp()
  }

  return  (
    <Modal 
      forceRender
      title="編輯Title" 
      open={isShow}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        name="basic"
        form={editForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
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

export default EditList