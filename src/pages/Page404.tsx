import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page404: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ width: '100%', height: '100%'}} className="flex-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/dashboard')}>Back Home</Button>
        }
      />
    </div>
  )
}

export default Page404