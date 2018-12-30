const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')
const url = require('url')

let win

function createWindow () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({ width: 800, height: 600, frame: false })
  // win.setMenu(null)
  // win.webContents.openDevTools({mode:'undocked'})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'view/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
