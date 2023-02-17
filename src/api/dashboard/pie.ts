import axios from "axios"
import Axios from "axios-https-proxy-fix"

export const getHtml = async () => {
  if (process.env.NODE_ENV === 'development') return
  console.log(process.env.NODE_ENV)

  let response = null
  if (process.env.NODE_ENV === 'production') {
    // response = await axios.get('https://github.com/ayay459547/react-ant-app')
    response = await axios.get('https://github.com/ayay459547/react-ant-app')
  } else {
    // response = await Axios.get('https://github.com/ayay459547/react-ant-app')
    response = await Axios.get('https://goodinfo.tw/tw/ShowK_ChartCompare.asp?STOCK_ID=2884&STOCK_ID1=&CHT_CAT2=DATE')
  }

  console.log(response)
}