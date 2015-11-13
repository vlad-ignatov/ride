/* global __dirname, process */
var app           = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc           = require('ipc');

require("babel-core/register");

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// This app uses custom header so we need to make it (un)maximize on dblclick
ipc.on('toggleMaximize', function() {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

// Pass actions from the browser window to the global dispatcher
// on the main process
// ipc.on('handleViewAction', function(event, action) {
//     return AppDispatcher.handleViewAction(action);
// });
//
// ipc.on('registerDispatch', function(event, fn) {
//     return AppDispatcher.register(fn);
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width       : 1200,
        height      : 800,
        show        : false,
        center      : true,
        'min-width' : 400,
        'min-height': 200,
        //   frame       : false,
        'title-bar-style': 'hidden',
        webSecurity : false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true,
        overlayScrollbars: true
    });

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/dst/index.html');

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.show();
});
