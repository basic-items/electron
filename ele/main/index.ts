import '../common/patch'
import { app, BrowserWindow } from 'electron'
import createWin from './window'
import './config'

// 准备就绪后执行
app.whenReady().then(createWin)

// 当完成初始化时触发
app.on('ready', () => { console.log('ready') })

// 当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
  console.log('window-all-closed')
  if (process.platform !== 'darwin') app.quit()
})

// 开始关闭窗口之前触发
app.on('before-quit', () => { console.log('before-quit') })

// 窗口关闭 应用程序将退出时触发
app.on('will-quit', () => { console.log('will-quit') })

// 应用程序退出时发出
app.on('quit', () => { console.log('quit') })

// 应用程序退出时发出
app.on('quit', () => { console.log('quit') })

// 窗口失去焦点时发
app.on('browser-window-blur', () => { console.log('browser-window-blur') })

// 窗口获得焦点时发出
app.on('browser-window-focus', () => { console.log('browser-window-focus') })

// 创建新的窗口时发出
app.on('browser-window-created', () => { console.log('browser-window-created') })

// 证书验证失败的时候发出
app.on('certificate-error', () => { console.log('certificate-error') })

// 证书被请求的时候发出
app.on('select-client-certificate', () => { console.log('select-client-certificate') })

// 要进行基本身份验证时触发
app.on('login', () => { console.log('login') })

// 每当有 GPU 信息更新时触发
app.on('gpu-info-update', () => { console.log('gpu-info-update') })

// 渲染器进程意外消失时触发 通常因为进程崩溃或被杀死
app.on('render-process-gone', () => { console.log('render-process-gone') })

// 子进程意外消失时触发 通常因为进程崩溃或被杀死 子进程不包括渲染器进程。
app.on('child-process-gone', () => { console.log('child-process-gone') })

// 每当有 GPU 信息更新时触发
app.on('gpu-info-update', () => { console.log('gpu-info-update') })

// 每当有 GPU 信息更新时触发
app.on('gpu-info-update', () => { console.log('gpu-info-update') })

app.on('activate', () => {
  console.log('activate')
  if (BrowserWindow.getAllWindows().length === 0) createWin()
})
