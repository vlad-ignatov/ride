var app      = require('app');
var Menu     = require('menu');
var MenuItem = require('menu-item');
var dialog   = require('dialog');
var fs       = require('fs');

function setMainMenu(mainWindow)
{
    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: function() {
                        var files = dialog.showOpenDialog({
                            properties: [
                                'openFile',
                                // 'openDirectory',
                                'multiSelections'
                            ]
                        });

                        if (files && files.length && mainWindow && mainWindow.webContents) {
                            mainWindow.webContents.send('openFiles', files);
                        }
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('saveFile');
                        }
                    }
                },
                {
                    label: 'Save As',
                    accelerator: 'Shift+CmdOrCtrl+S',
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('saveFileAs');
                        }
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                        }
                    },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
                {
                    label: 'Editor Theme',
                    submenu: [
                        'ambiance',
                        'chaos',
                        'chrome',
                        'clouds',
                        'clouds_midnight',
                        'cobalt',
                        'crimson_editor',
                        'dawn',
                        'dreamweaver',
                        'eclipse',
                        'github',
                        'idle_fingers',
                        'iplastic',
                        'katzenmilch',
                        'kr_theme',
                        'kuroir',
                        'merbivore',
                        'merbivore_soft',
                        'mono_industrial',
                        'monokai',
                        'pastel_on_dark',
                        'solarized_dark',
                        'solarized_light',
                        'sqlserver',
                        'terminal',
                        'textmate',
                        'tomorrow',
                        'tomorrow_night',
                        'tomorrow_night_blue',
                        'tomorrow_night_bright',
                        'tomorrow_night_eighties',
                        'twilight',
                        'vibrant_ink',
                        'xcode'
                    ].map(function(name) {
                        return {
                            label: name,
                            type: 'radio',
                            checked: name == 'twilight',
                            click: function(item, focusedWindow) {
                                if (focusedWindow) {
                                     focusedWindow.webContents.send('setSyntaxTheme', 'ace/theme/' + name);
                                }
                            }
                        };
                    })
                },
                // {
                //     label: 'Editor Settings',
                //     click: function(item, focusedWindow) {
                //         if (focusedWindow) {
                //             focusedWindow.webContents.executeJavaScript('editor.showSettingsMenu();');
                //         }
                //     }
                // }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function() {
                        require('shell').openExternal('http://electron.atom.io')
                    }
                }
            ]
        }
    ];

    if (process.platform == 'darwin') {
        var name = app.getName();
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() { app.quit(); }
                },
            ]
        });
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

exports.setMainMenu = setMainMenu;
