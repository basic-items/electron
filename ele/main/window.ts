import { app, BrowserWindow } from 'electron'
import { join } from 'path'
let win: BrowserWindow

export default function createWin() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    useContentSize: true,
    frame: true, // 显示标题栏
    center: true,
    focusable: true,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      preload: join(__dirname, '../../ele/preload/index.js'),
      nativeWindowOpen: true,
      webviewTag: true
    }
  })
  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../render/index.html'))
  } else {
    win?.loadURL(`http://localhost:${process.env.PORT}`) // vite 启动的服务器地址
  }

  // @ts-ignore
  if (process.env.NODE_ENV === 'development') win.openDevTools()

  win.setMenu(null)
}