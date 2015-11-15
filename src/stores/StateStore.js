/* global jQuery */
'use strict';

import { default as appDispatcher } from '../Dispatcher';
import * as lib       from '../lib';
import StoreBase      from './StoreBase';
import STATE          from '../STATE';
import * as Constants from '../constants/constants';

class Store extends StoreBase
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
            case Constants.FILETREE_SELECT_ITEM:
                if (lib.previewFile(action.path)) {
                    store.emitChange();
                }
                break;

            case Constants.APP_OPEN_FILE:
                if (lib.openFile(action.path)) {
                    store.save();
                }
                break;

            case Constants.APP_CLOSE_FILE:
                if (lib.closeFile(action.path)) {
                    store.save();
                }
                break;

            case Constants.APP_NOTIFY_FILE_CHANGED:
                var idx = STATE.openFiles.findIndex(f => f.path === action.path);
                if (idx > -1) {
                    STATE.openFiles[idx].modified = true;
                    store.save();
                }
                break;

            case Constants.APP_SET_LEFT_SIDEBAR_WIDTH:
                if (action.width !== STATE.leftSidebarWidth) {
                    STATE.leftSidebarWidth = action.width;
                    store.save();
                }
                break;
            }

            return true; // No errors. Needed by promise in Dispatcher.
        });
    }

    save()
    {
        localStorage.state = JSON.stringify(STATE);
        this.emitChange();
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
