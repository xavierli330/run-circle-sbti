import { PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren) {
  if (process.env.TARO_ENV === 'weapp') {
    Taro.cloud.init({
      traceUser: true,
    })
  }
  return children
}

export default App
