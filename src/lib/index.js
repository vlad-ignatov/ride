/* global ace, fs */

import { default as STATE } from '../STATE';
import appDispatcher        from '../Dispatcher';
import * as Constants       from '../constants/constants';

/**
 * If the file is already opened just switches to it py setting STATE.currentFile
 * to it's full path.
 */
export function openFile(path, isPreview) {

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
    session.on("change", () => {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_NOTIFY_FILE_CHANGED,
            path
        });
    });

    // Set the new session as bith current and selected
    STATE.currentFile = path;
    STATE.fileTree.selectedPath = path;

    // Indicates that something has changed
    return true;
}

export function previewFile(path) {
    return openFile(path, true);
}

export function closeFile(path) {
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

// export function setLeftSidebarWidth(width) {
//     appDispatcher.handleViewAction({
//         actionType: Constants.APP_SET_LEFT_SIDEBAR_WIDTH,
//         width
//     });
// }
