// Modules to control application life and create native browser window
import {app, BrowserWindow, BrowserView} from 'electron'
import * as path from 'path'
import * as fs from 'fs'

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    frame:false,
    backgroundColor: '#454647',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the https://web.kamihq.com of the app.
  mainWindow.webContents.loadURL('https://web.kamihq.com');

  // add cumstom css
  mainWindow.webContents.on('dom-ready',(e) => {
    let pathToCSS = path.join(__static,'/css/style.css');
    fs.readFile(pathToCSS,'utf-8',function(error, data){
      if(!error){
        let formData = data.replace(/\s{2,10}/g,'').trim()
        e.sender.insertCSS(formData)
        e.sender.insertH
      }
    })
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
