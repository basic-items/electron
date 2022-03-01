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
      icon: 'dist/favicon.ico'
    },
    hash: '/defaultWin'
  },
  menuOne: {
    window: {
      width: 400,
      height: 250,
      resizable: false,
      center: true,
      useContentSize: true,
      backgroundColor: '#fff',
      title: '菜单一',
      icon: 'dist/favicon.ico',
      maximizable: false,
      frame: true,
      skipTaskbar: false
    },
    hash: '/menuOne'
  }
}
