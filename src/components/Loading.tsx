import React from 'react'
import { Alert, Spin } from 'antd'

const Loading: React.FC = () => (
  <Spin 
    tip="Loading..."
    size="large" 
    style={{ width: '100%', height: '100%'}}
  >
    {/* <Alert type="info" style={{ width: '100%', height: '100%'}}/> */}
  </Spin>
)

export default Loading