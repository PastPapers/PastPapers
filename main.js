'use strict'

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var MainWindow = null;

app.on('ready', function(){

  MainWindow = new BrowserWindow({height:470, width:700, show:false });

  MainWindow.setMenu(null);

  MainWindow.loadURL("file://"+__dirname+"/app/index.html");
  MainWindow.on( 'closed', function(){
        MainWindow = null;
  }
  )

  MainWindow.show();
}
)

app.on("windows-all-closed", function(){
  app.quit();
})
