/* global ace */

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
