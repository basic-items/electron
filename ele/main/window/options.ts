import { allWindowType } from '../types'

export const options: allWindowType = {
  defaultWin: {
    window: {
      width: 1200,
      height: 800,
      resizable: true,
      show: true,
      alwaysOnTop: false,
      useContentSize: true,
      frame: true,
      backgroundColor: '#fff',
      icon: 'favicon.ico'
    },
    hash: '/'
  },
  menuOne: {
    window: {
      width: 1000,
      height: 600,
      resizable: false,
      center: true,
      useContentSize: true,
      backgroundColor: '#fff',
      title: '菜单一',
      icon: 'favicon.ico',
      maximizable: false,
      frame: true,
      skipTaskbar: false
    },
    hash: '/webRtc'
  }
}
