const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const log = require("electron-log");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
    },
  });

  win.loadFile("index.html");

  win.webContents.on("render-process-gone", (_, detail) => {
    log.error("render-process-gone");
    log.error(detail);
  });
};

app.whenReady().then(() => {
  createWindow();
});
