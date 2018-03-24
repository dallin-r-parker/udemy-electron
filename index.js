const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(`file://${__dirname}/index.html`)

})

ipcMain.on('video:submit', (evt, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('metadata: ', metadata.format.duration);
        console.log('DURATION: ', metadata.format.duration);
        const {duration} = metadata.format
        mainWindow.webContents.send('video:duration', duration)
    })
})