import React from 'react'
import { useNavigate } from 'react-router-dom'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import LogoSvg from '../../assets/logo.svg'

import routes from '../../router'

const items: MenuProps['items'] = routes.filter(router => router.position === 'top').map(router => {
  const { title, key, icon = <div></div>} = router

  return {
    label: title,
    key: key,
    icon: icon
    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = (index * 4 + j + 1) as number
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   }
    // })
  }
},
)

interface Props {
  current: string
  setCurrent: (key: string) => void
  setBreadcrumbList: (pathList: string[]) => void
}
const AppLayout: React.FC<Props> = ({ current, setCurrent, setBreadcrumbList }) => {
  const navigate = useNavigate()

  const changeRouter: MenuProps['onClick'] = ({ key, keyPath }) => {
    const pathList:string[] = []
    const url = keyPath.reduce((prev, curr) => {
      pathList.unshift(curr)
      return `/${curr}` + prev
    }, '')
    setCurrent(key)
    setBreadcrumbList(pathList)
    navigate(url)
  }

  return (
    <>
      <div className="logo">
        <img src={LogoSvg} alt="React" className='logo-img'/>
        <h2 className="logo-title">React</h2>
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