/* global __dirname */
var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var MenusManager  = require('./src/MenusManager.js');

require("babel-core/register");

// Report crashes to our server.
require('crash-reporter').start();

// Load all the extension packages that are interested in working with the
// main process
// ------------------------------------------------------------------------------
var pkg = require('./package.json');
for (var name in pkg.ride.packages) {
    var ext
    try {
        ext = require('./node_modules/' + name + '/ride-main-process.js')
    } catch (err) {
        // ignore
    }
    if (typeof ext == 'function') {
        ext.call(this)
    }
}

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
        'title-bar-style': 'hidden',
        webSecurity : false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true
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

    MenusManager.setMainMenu(mainWindow);

    mainWindow.show();
});
