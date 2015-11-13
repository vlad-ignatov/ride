'use strict';

var Constants     = require('../constants/AppConstants');
var EventEmitter  = require('events').EventEmitter;
var appDispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var FILES = {};


class OpenFilesStore extends EventEmitter
{
    constructor()
    {
        super();

        var store = this;

        this.dispatcherIndex = appDispatcher.register(function(payload) {
            var action = payload.action;
            switch(action.actionType) {
                case Constants.APP_OPEN_FILE:
                    FILES[action.path] = 1;
                    store.emitChange();
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
        return Object.assign({}, FILES);
    }
}

export var openFilesStore = new OpenFilesStore();
