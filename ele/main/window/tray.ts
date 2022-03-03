import { app, Tray, Menu, BrowserWindow } from 'electron'
import createWindow from './create'
import { options as allWindow } from './options'

import path from 'path'

let appTray: Tray
export function setTray(): Tray {
  if (appTray) return appTray

  const trayMenuTemplate = [
    {
      label: '菜单一',
      click() {
        createWindow(allWindow.menuOne.window, allWindow.menuOne.hash)
      }
    },
    {
      label: '退出',
      click() {
        app.exit(0)
      }
    }
  ]
  // 创建托盘实例
  const iconPath = path.join(__dirname, '../../build/favicon.png')
  appTray = new Tray(iconPath)

  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate as any)
  appTray.setToolTip('rabbit')

  // 设置托盘菜单
  appTray.setContextMenu(contextMenu)

  return appTray
}

// 创建消息提示默认窗口
let defaultWindow: BrowserWindow
export function createDefaultWindow(): BrowserWindow {
  if (defaultWindow) return defaultWindow

  defaultWindow = createWindow(allWindow.defaultWin.window, allWindow.defaultWin.hash)

  return defaultWindow
}
