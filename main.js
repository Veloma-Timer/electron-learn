const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
require('update-electron-app')();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('index.html');
}



app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  // macos: 在没有激活的窗口时， 重新创建一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })

});

// windows&linux: 当关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


