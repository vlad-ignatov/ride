'use strict';

var AppConstants      = require('../constants/AppConstants');
var FileTreeConstants = require('../constants/FileTreeConstants');
var EventEmitter      = require('events').EventEmitter;
var appDispatcher     = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var FILES = {};
var CURRENT_FILE = null;
var REUSABLE_SESSION = null;


class OpenFilesStore extends EventEmitter
{
    constructor()
    {
        super();

        var store = this;

        this.dispatcherIndex = appDispatcher.register(function(payload) {
            var action = payload.action, path;
            switch(action.actionType) {

                // This is slightly different from open. It loads the selected
                // file in for preview reusable session
                case FileTreeConstants.FILETREE_SELECT_ITEM:
                    path = action.path;
                    let stats;

                    // Check if this file is already opened and switch to it
                    if (FILES[path]) {
                        CURRENT_FILE = path;
                        store.emitChange();
                        break;
                    }

                    // Skip directories
                    try {
                        stats = fs.statSync(path);
                    } catch (ex) {
                        console.error(ex);
                        break;
                    }

                    // If the selection can be previewed
                    if (!stats.isDirectory()) {
                        let modelist = ace.require("ace/ext/modelist");
                        let mode     = modelist.getModeForPath(path).mode;
                        let text     = '';
                        try {
                            text = fs.readFileSync(path, 'utf8');
                        } catch (err) {
                            console.error(err);
                            return;
                        }

                        if (REUSABLE_SESSION) {
                            delete FILES[REUSABLE_SESSION];
                            REUSABLE_SESSION = null;
                        }

                        FILES[path] = ace.createEditSession(text, mode);
                        REUSABLE_SESSION = CURRENT_FILE = path;

                        store.emitChange();
                    }
                break;
                case AppConstants.APP_OPEN_FILE:
                    path = action.path;
                    if (!FILES[path]) {
                        let modelist = ace.require("ace/ext/modelist");
                        let mode     = modelist.getModeForPath(path).mode;
                        let text     = '';
                        try {
                            text = fs.readFileSync(path, 'utf8');
                        } catch (err) {
                            console.error(err);
                            return;
                        }
                        FILES[path] = ace.createEditSession(text, mode);
                    }
                    CURRENT_FILE = path;
                    store.emitChange();
                break;
                case AppConstants.APP_CLOSE_FILE:
                    if (FILES[action.path]) {
                        delete FILES[action.path];
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

    getAll()
    {
        return FILES;
    }

    getCurrent()
    {
        return CURRENT_FILE;
    }
}

export var openFilesStore = new OpenFilesStore();
