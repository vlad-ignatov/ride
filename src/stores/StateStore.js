'use strict';

var AppConstants      = require('../constants/AppConstants');
var FileTreeConstants = require('../constants/FileTreeConstants');
var EventEmitter      = require('events').EventEmitter;
var appDispatcher     = require('../Dispatcher');

var CHANGE_EVENT = 'change';
var STATE = {
    fileTree: {
        selectedPath: ''
    },
    openFiles: [],
    currentFile: '',
    settings: {
        syntaxTheme: 'ace/theme/twilight',
        leftSidebarWidth: 300
    }
};

/**
 * If the file is already opened just switches to it py setting STATE.currentFile
 * to it's full path.
 */
function openFile(path, isPreview) {

    // TODO: browse for file of the path is empty

    // If already opened just switch to it
    var idx = STATE.openFiles.findIndex(f => f.path === path), stats;
    if (idx > -1) {
        let meta = STATE.openFiles[idx];
        if (meta.path !== STATE.currentFile || !!meta.isPreview !== !!isPreview) {
            STATE.currentFile = meta.path;
            STATE.fileTree.selectedPath = path;
            meta.isPreview = !!isPreview;
            return true; // did switch
        }
        return false; // did nothing
    }

    // Skip directories
    try {
        stats = fs.statSync(path);
        if (stats.isDirectory()) {
            return false;
        }
    }
    catch (ex) {
        console.error(ex);
        return false;
    }

    // Try to read the file
    let text = '';
    try {
        text = fs.readFileSync(path, 'utf8');
    }
    catch (err) {
        console.error(err);
        return false;
    }

    // Detect mode
    let modelist = ace.require("ace/ext/modelist");
    let mode     = modelist.getModeForPath(path).mode;

    // Close the existing reusable session (if any)
    STATE.openFiles = STATE.openFiles.filter(o => !o.isPreview);

    // Create new session and switch to it
    let session  = ace.createEditSession(text, mode);
    STATE.openFiles.push({ path, session, isPreview });
    session.on("change", (event) => {
        appDispatcher.handleViewAction({
            actionType: AppConstants.APP_NOTIFY_FILE_CHANGED,
            path      : path
        });
    });

    // Set the new session as bith current and selected
    STATE.currentFile = path;
    STATE.fileTree.selectedPath = path;

    // Indicates that something has changed
    return true;
}

function closeFile(path) {
    var idx = STATE.openFiles.findIndex(f => f.path === path);
    if (idx > -1) {
        let meta = STATE.openFiles[idx];
        STATE.openFiles.splice(idx, 1);
        let next = idx - 1;
        if (next < 0) {
            next = STATE.openFiles.length - 1;
        }
        if (next >= 0) {
            next = STATE.openFiles[next];
        }
        else {
            next = { path: '' };
        }
        if (meta.path === STATE.currentFile) {
            STATE.currentFile = next.path;
        }
        if (meta.path === STATE.fileTree.selectedPath) {
            STATE.fileTree.selectedPath = next.path;
        }
        return true;
    }
    return false;
}

function previewFile(path) {
    return openFile(path, true);
}

class Store extends EventEmitter
{
    constructor()
    {
        super();

        var store = this;

        this.dispatcherIndex = appDispatcher.register(function(payload) {
            var action = payload.action;
            switch(action.actionType) {

                // This is slightly different from open. It loads the selected
                // file in for preview reusable session
                case FileTreeConstants.FILETREE_SELECT_ITEM:
                    if (previewFile(action.path)) {
                        store.emitChange();
                    }
                break;

                case AppConstants.APP_OPEN_FILE:
                    if (openFile(action.path)) {
                        store.emitChange();
                    }
                break;

                case AppConstants.APP_CLOSE_FILE:
                    if (closeFile(action.path)) {
                        store.emitChange();
                    }
                break;

                case AppConstants.APP_NOTIFY_FILE_CHANGED:
                    var idx = STATE.openFiles.findIndex(f => f.path === action.path);
                    if (idx > -1) {
                        STATE.openFiles[idx].modified = true;
                        store.emitChange();
                    }
                break;
            }

            return true; // No errors. Needed by promise in Dispatcher.
        });
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback)
    {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback)
    {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange()
    {
        this.emit(CHANGE_EVENT);
    }

    getState()
    {
        return STATE;
    }

    getCurrentSession()
    {
        return STATE.openFiles.find(f => f.path === STATE.currentFile);
    }
}

export var stateStore = new Store();
