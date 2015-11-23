/* global ace, fs */

// import { default as STATE  } from '../STATE';
// import appDispatcher         from '../Dispatcher';
// import * as Constants        from '../constants/constants';
// var remote  = require('remote');
var fs = require('fs');
var Crypto = require('crypto');


var uid = (function() {
    var uid_counter = 1;
    return function() {
        return 'uid_' + uid_counter++;
    };
})();

function md5(str) {
    return Crypto.createHash('md5').update(str).digest("hex");
}
/**
 * If the file is already opened just switches to it py setting STATE.currentFile
 * to it's full path.
 */
// export function openFile(path, isPreview) {
//
//     // TODO: browse for file of the path is empty
//
//     // If already opened just switch to it
//     var idx = STATE.openFiles.findIndex(f => f.path === path), stats;
//     if (idx > -1) {
//         let meta = STATE.openFiles[idx];
//         if (meta.path !== STATE.currentFile || !!meta.isPreview !== !!isPreview) {
//             STATE.currentFile = meta.path;
//             STATE.fileTree.selectedPath = path;
//             meta.isPreview = !!isPreview;
//             return true; // did switch
//         }
//         return false; // did nothing
//     }
//
//     // Skip directories
//     try {
//         stats = fs.statSync(path);
//         if (stats.isDirectory()) {
//             return false;
//         }
//     }
//     catch (ex) {
//         console.error(ex);
//         return false;
//     }
//
//     // Try to read the file
//     let text = '';
//     try {
//         text = fs.readFileSync(path, 'utf8');
//     }
//     catch (err) {
//         console.error(err);
//         return false;
//     }
//
//     // Detect mode
//     let modelist = ace.require("ace/ext/modelist");
//     let mode     = modelist.getModeForPath(path).mode;
//
//     // Close the existing reusable session (if any)
//     STATE.openFiles = STATE.openFiles.filter(o => !o.isPreview);
//
//     // Create new session and switch to it
//     let session  = ace.createEditSession(text, mode);
//     let hash = md5(text);
//     STATE.openFiles.push({ path, session, isPreview, hash });
//     session.on("change", () => {
//         appDispatcher.handleViewAction({
//             actionType: Constants.APP_NOTIFY_FILE_CHANGED,
//             path
//         });
//     });
//
//     // Set the new session as bith current and selected
//     STATE.currentFile = path;
//     STATE.fileTree.selectedPath = path;
//
//     // Indicates that something has changed
//     return true;
// }
//
// export function previewFile(path) {
//     return openFile(path, true);
// }

// function newFile() {
//     // Create new session and switch to it
//     let path = '';
//     let session  = ace.createEditSession('', 'ace/mode/text');
//     let hash = md5('');
//     STATE.openFiles.push({
//         path,
//         session,
//         isPreview : true,
//         hash
//     });
//     session.on("change", () => {
//         appDispatcher.handleViewAction({
//             actionType: Constants.APP_NOTIFY_FILE_CHANGED,
//             path
//         });
//     });
//
//     // Set the new session as bith current and selected
//     STATE.currentFile = path;
//     STATE.fileTree.selectedPath = path;
//
//     // Indicates that something has changed
//     return true;
// }

function writeFile(path, contents, encoding) {
    if (path) {
        try {
            fs.writeFileSync( path, contents, encoding || 'utf8');
            return true;
        } catch (ex) {
            // remote.require('dialog').showMessageBox(null, {
            //     type   : 'error',
            //     title  : 'Error writing file',
            //     message: ex.message,
            //     detail : ex.stack
            // });
            console.error(ex);
        }
    }
    return false;
}

function readJSON5(path) {
    try {
        var input = fs.readFileSync(path, 'utf8');
        input = input.replace(/\/\/.*?$/gm, '');
        input = input.replace(/\/\*.*?\*\//g, '');
        return JSON.parse(input);
    }
    catch(ex) {
        console.error(ex);
    }
    return null;
}

function writeJSON(path, json, pretty) {
    try {
        fs.writeFileSync(path, JSON.stringify(json, null, pretty || 0), 'utf8');
    }
    catch(ex) {
        console.error(ex);
    }
}


module.exports = {
    writeJSON : writeJSON,
    readJSON5 : readJSON5,
    writeFile : writeFile,
    md5 : md5,
    uid : uid
};
