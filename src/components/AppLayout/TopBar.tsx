import React from 'react'
import { useNavigate } from 'react-router-dom'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import LogoSvg from '../../assets/logo.svg'

import routes from '../../router'
import { rm } from '../../utils/storage'

import type { RootState } from '../../store'
import { useSelector } from 'react-redux'

const items: MenuProps['items'] = routes.filter(router => router.position === 'top').map(router => {
  const { title, key, icon = <div></div> } = router

  return {
    label: title,
    key: key,
    icon: icon
  }
})

interface Props {
  current: string
  setCurrent: (key: string) => void
  setBreadcrumbList: (pathList: string[]) => void
}

const AppLayout: React.FC<Props> = ({ current, setCurrent, setBreadcrumbList }) => {
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.user)

  const changeRouter: MenuProps['onClick'] = ({ key, keyPath }) => {
    if (key === 'login') { rm('token') }

    const pathList:string[] = []
    const url = keyPath.reduce((prev, curr) => {
      pathList.unshift(curr)
      return `/${curr}` + prev
    }, '')
    setCurrent(key)
    setBreadcrumbList(pathList)
    navigate(`/${process.env?.REACT_APP_PROJECT_NAME}${url}`)
  }

  return (
    <>
      <div className="logo">
        <img src={LogoSvg} alt="React" className='logo-img'/>
        <h2 className="logo-title">React</h2>
        <div className='logo-user'>{`~ Hi ${userData.username} !!`}</div>
      </div>
      <div className="menu">
        <Menu 
          theme="dark" 
          mode="horizontal" 
          items={items}
          selectedKeys={[current]}
          onClick={changeRouter}
        />
      </div>
    </>
  )
}

export default AppLayout