import React from 'react'
import { Card, Timeline, Carousel, Space } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import web1Img from '../../assets/img/dashboard/web1.jpg'
import web2Img from '../../assets/img/dashboard/web2.jpg'
import web3Img from '../../assets/img/dashboard/web3.jpg'
import DemoLine from './DemoLine'
import DemoPie from './DemoPie'
import DemoBar from './DemoBar'
import './s_dashboard.scss'

const Dashboard: React.FC = () => {

  return (
    <div className='dashboard-container grid-row'>
      <div className='grid-col-lg-12 grid-col-xs-24'>
        <Card title="其他練習作品">
          <Timeline
            className='dashboard-timeline'
            items={[
              {
                children: (
                  <>
                    <div>2022/09 ~ 2022/10</div>
                    
                    <a href='https://ayay459547.github.io/vue3_ts/' target='_blank' rel="noreferrer">
                      <Space>
                        <LinkOutlined />
                        <span>Vue3 + TypeScript + ElementUI</span>
                      </Space>
                    </a>
                  </>
                ),
              },
              {
                children: (
                  <>
                    <div>2022/10 ~ 2022/11</div>
                    <a href='https://ayay459547.github.io/nuxt_hotal/' target='_blank' rel="noreferrer">
                      <Space>
                        <LinkOutlined />
                        <span>Vue3 + Nuxt</span>
                      </Space>
                    </a>
                  </>
                ),
              },
              {
                children: (
                  <>
                    <div>2021/05 ~ 2021/05</div>
                    <a href='https://ayay459547.github.io/university_project/' target='_blank' rel="noreferrer">
                      <Space>
                        <LinkOutlined />
                        <span>Vue2 + Vuex</span>
                      </Space>
                    </a>
                  </>
                ),
              },
            ]}
          />
        </Card>
      </div>
      <div className='grid-col-lg-12 grid-col-xs-24'>
        <Card title="其他作品快照">
          <Carousel autoplay className='dashboard-carousel-list'>
            <div className='dashboard-carousel-item'>
              <img src={web1Img} alt="web1" />
            </div>
            <div className='dashboard-carousel-item'>
              <img src={web2Img} alt="web2" />
            </div>
            <div className='dashboard-carousel-item'>
              <img src={web3Img} alt="web3" />
            </div>
          </Carousel>
        </Card>
      </div>

      <div className='grid-col-xl-8 grid-col-lg-12 grid-col-xs-24'>
        <Card title="此專案語言使用比例">
          <DemoPie />
        </Card>
      </div>
      <div className='grid-col-xl-8 grid-col-lg-12 grid-col-xs-24'>
        <Card title="測試圖表(折線圖)">
          <DemoLine />
        </Card>
      </div>
      <div className='grid-col-xl-8 grid-col-lg-24 grid-col-xs-24'>
        <Card title="測試圖表(柱狀圖)">
          <DemoBar />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
