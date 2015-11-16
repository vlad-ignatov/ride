/* global jQuery */
'use strict';

import { default as appDispatcher } from '../Dispatcher';
import { default as ipc           } from 'ipc';
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

        ipc.on('newFile', lib.newFile);

        this.dispatcherIndex = appDispatcher.register(function(payload) {
            var action = payload.action, idx;
            switch(action.actionType) {

            case Constants.FILETREE_TOGGLE:
                STATE.fileTree.visible = !STATE.fileTree.visible;
                store.emitChange();
                break;

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
                idx = STATE.openFiles.findIndex(f => f.path === action.path);
                if (idx > -1) {
                    let meta = STATE.openFiles[idx];
                    let text = meta.session.getValue();
                    meta.modified  = lib.md5(text) !== meta.hash;
                    meta.isPreview = false;
                    // console.log(STATE.openFiles[idx].session)
                    store.emitChange();
                }
                break;

            case Constants.APP_SET_LEFT_SIDEBAR_WIDTH:
                if (action.width !== STATE.leftSidebarWidth) {
                    STATE.leftSidebarWidth = action.width;
                    store.save();
                }
                break;

            case Constants.EVENT_FILE_SAVED:
                idx = STATE.openFiles.findIndex(f => f.path === action.path);
                if (idx > -1) {
                    STATE.openFiles[idx].modified = false;
                    store.emitChange();
                }
                break;
            }

            return true; // No errors. Needed by promise in Dispatcher.
        });
    }

    save()
    {
        var json = jQuery.extend(true, {}, STATE);
        json.openFiles = [];//json.openFiles.map(f => {
        //     f.session = null;
        // });
        localStorage.state = JSON.stringify(json);
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
