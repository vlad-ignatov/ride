'use strict';

var AppConstants      = require('../constants/AppConstants');
var FileTreeConstants = require('../constants/FileTreeConstants');
var EventEmitter      = require('events').EventEmitter;
var appDispatcher     = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var SATE = {
    selectedFilePath: ''
};


class AppStateStore extends EventEmitter
{
    constructor()
    {
        super();

        var store = this;

        this.dispatcherIndex = appDispatcher.register(function(payload) {
            var action = payload.action;
            var text;

            switch(action.actionType) {
                case FileTreeConstants.FILETREE_SELECT_ITEM:
                    SATE.selectedFilePath = action.path;
                    store.emitChange();
                break;
                case AppConstants.APP_CLOSE_FILE:
                    if (SATE.selectedFilePath == action.path) {
                        SATE.selectedFilePath = '';
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
        return Object.assign({}, SATE);
    }
}

export var appStateStore = new AppStateStore();
