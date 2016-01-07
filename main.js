'use strict'

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var MainWindow = null;

app.on('ready', function(){

  MainWindow = new BrowserWindow({height:300, width:300, show:false});

  MainWindow.setMenu(null);

  MainWindow.loadURL("file://"+__dirname+"/app/index.html");

  MainWindow.on( 'closed', function(){
        console.log("i don't like to be closed");
        MainWindow = null;
  }
  )

  MainWindow.show();
}
)

app.on("windows-all-closed", function(){
  app.quit();
})
