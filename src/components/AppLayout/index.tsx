import React, { useState } from 'react'

import { Breadcrumb, Layout, theme } from 'antd'
import LeftSideBar from './LeftSideBar'
import TopBar from './TopBar'
import './s_appLayout.scss'

const { Header, Content } = Layout

type AppLayoutProps = { children: React.ReactNode }

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [current, setCurrent] = useState('dashboard')
  const [breadcrumbList, setBreadcrumbList] = useState(['dashboard'])

  return (
    <Layout className='layout-wrapper'>
      <Header className="layout-header">
        <TopBar 
          current={current} 
          setCurrent={setCurrent} 
          setBreadcrumbList={setBreadcrumbList}
        />
      </Header>

      <Layout>
        <LeftSideBar 
          current={current} 
          setCurrent={setCurrent} 
          setBreadcrumbList={setBreadcrumbList}
        />

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '8px 0' }}>
            {
              breadcrumbList.map(breadcrumb => {
                return <Breadcrumb.Item key={breadcrumb}>{ breadcrumb }</Breadcrumb.Item>
              })
            }
          </Breadcrumb>

          <Content
            style={{
              padding: 8,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              overflowY: 'auto'
            }}
          >
            {props.children ?? 'Content'}
          </Content>
        </Layout>

      </Layout>
    </Layout>
  )
}

export default AppLayout