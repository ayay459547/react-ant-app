import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'

import routes from '../../router'

const { Sider } = Layout

const items: MenuProps['items'] = routes.filter(router => router.position === 'left').map(router => {
    const { title, key, icon = <div></div>, children = [] } = router

    const base = {
      label: title,
      key: key,
      icon: icon,
    }
    return children.length > 0 ? {
      ...base,
      children: children.map(subRouter => {
        const { key: subKey, title: subTitle} = subRouter

        return {
          label: subTitle,
          key: subKey,
        }
      })
    } : base
  },
)

interface Props {
  current: string
  setCurrent: (key: string) => void
  setBreadcrumbList: (pathList: string[]) => void
}
const LeftSideBar: React.FC<Props> = ({ current, setCurrent, setBreadcrumbList }) => {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  const changeRouter: MenuProps['onClick'] = ({ key, keyPath }) => {
    const pathList:string[] = []
    const url = keyPath.reduce((prev, curr) => {
      pathList.unshift(curr)
      return `/${curr}` + prev
    }, '')
    setCurrent(key)
    setBreadcrumbList(pathList)
    navigate(`/${process.env?.REACT_APP_PROJECT_NAME}${url}`)
  }

  return  (
    <Sider 
      width={200} 
      style={{ background: colorBgContainer }}
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        selectedKeys={[current]}
        onClick={changeRouter}
      />
    </Sider>
  )
}

export default LeftSideBar