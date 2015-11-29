/* global ace, fs, Async, Dialog */
import alt                      from '../alt'
import * as lib                 from '../lib'
import fileActions              from '../actions/file-actions'
import { readJSON5, writeJSON } from '../lib'

const modelist = ace.require("ace/ext/modelist");

class FilesStore
{
    constructor() {
        this.files = []
        this.current = null

        this.bindListeners({
            handleFileAdded     : fileActions.OPEN_FILE,
            handleFileRemoved   : fileActions.CLOSE_FILE,
            handlePreviewFile   : fileActions.PREVIEW_FILE,
            handleSetCurrentFile: fileActions.SET_CURRENT_FILE,
            handleFileModified  : fileActions.SET_FILE_MODIFIED,
            handleFileUnmodified: fileActions.SET_FILE_UNMODIFIED,
            handleFileMoved     : fileActions.MOVE_FILE,
            handleFileSave      : fileActions.SAVE,
            handleCheckFile     : fileActions.CHECK_FILE_FOR_MODIFICATIONS,
            onCloseAll          : fileActions.CLOSE_ALL,
            onCloseAllBefore    : fileActions.CLOSE_ALL_BEFORE,
            onCloseAllAfter     : fileActions.CLOSE_ALL_AFTER,
            onCloseOthers       : fileActions.CLOSE_OTHERS,
            onCloseSaved        : fileActions.CLOSE_SAVED,
            onNewFile           : fileActions.NEW_FILE,
            onSetMode           : fileActions.SET_MODE
        });

        this.on('init', () => {
            let state = readJSON5('./src/session.json') || { files: [] }
            state.files.forEach(f => {
                // console.log(f)
                this.handleFileAdded(f)
            })
            if (state.current) {
                this.handleSetCurrentFile(this.findByPath(state.current).id)
            }
            // this.__is_loaded = true
        })

        window.addEventListener('beforeunload', () => {
            this.saveToSession();
        }, false);

    }

    isPathOpened(path) {
        return this.files.some(f => f.path == path)
    }

    findAllByPath(path) {
        return this.files.filter(f => f.path == path)
    }

    findByPath(path) {
        return this.findAllByPath(path)[0]
    }

    byId(id) {
        return this.files.filter(f => f.id === id)[0]
    }

    saveToSession() {
        if (this.__ignore_save__) {
            return;
        }
        let json = {
            files: this.files.map(f => {
                return {
                    path: f.path,
                    isPreview: f.isPreview,
                    mode: f.mode,
                    session : {
                        scrollLeft : f.session.getScrollLeft(),
                        scrollTop : f.session.getScrollTop()
                    }
                }
            }),
            current: this.current ? this.current.path : null
        }
        writeJSON('./src/session.json', json, 4)
    }

    // handlers ------------------------------------------------------------------
    onCloseAll() {
        this.files = this.files.filter(f => {
            f.session.removeAllListeners();
            f.session.destroy();
            return false
        })
        this.current = null;
        this.saveToSession()
    }

    onCloseAllBefore(id) {
        var found = false
        this.files = this.files.filter(f => {
            if (found) {
                return true
            }
            if (f.id === id) {
                found = true
                return true
            }
            f.session.removeAllListeners();
            f.session.destroy();
            return false
        })
        this.saveToSession()
    }

    onCloseAllAfter(id) {
        for (let i = this.files.length - 1, f; i >= 0; i--) {
            f = this.files[i]
            if (f.id === id) {
                break;
            }
            this.handleFileRemoved(f.id)
        }
    }

    onCloseOthers(id) {
        // this.__ignore_save__ = true
        this.files = this.files.filter(f => {
            if (f.id === id) {
                return true
            }
            this.handleFileRemoved(f.id)
            // f.session.removeAllListeners();
            // f.session.destroy();
            return false
        })
        // this.__ignore_save__ = false
        this.saveToSession()
    }

    onCloseSaved() {
        for (let i = this.files.length - 1, f; i >= 0; i--) {
            f = this.files[i]
            if (!f.modified) {
                this.handleFileRemoved(f.id)
            }
        }
    }

    /**
     * 1. If no @base is specified it means that the user wants to just open an
     * empty file and decide what to do with it later. That will open new
     * untitled tab which can be editted and eventually saved somewhere.
     * 2. If the @base is provided the user will first be asked to enter a file
     * name then the file will be created and finally opened.
     * @param {String} base - The caontaining directory
     */
    onNewFile(base) {
        if (!base) {
            return this.handleFileAdded({
                path: '',
                isPreview: false
            });
        }

        prompt('Enter file name:', base || '').then(path => {
            Async.series([

                // Check if such file exists
                function checkIfFileExists(cb) {
                    fs.stat(path, function(e) {
                        if (e && e.code == 'ENOENT') {
                            return cb();
                        }

                        // TODO: warn if it does
                        if (Dialog.showMessageBox({
                            type    : 'warning',
                            title   : 'Error',
                            buttons : [ 'Try Again', 'Cancel' ],
                            message : 'The selected file already exists'
                        }) === 1) {
                            cb(new Error('The file exists'));
                        }
                        else {
                            cb('RETRY');
                        }
                    });
                },

                // create the file
                function(cb) {
                    fs.writeFile(path, '', cb);
                }

            ], (err) => {
                if (err) {
                    if (err == 'RETRY') {
                        return this.onNewFile(base);
                    }
                    return console.error(err);
                }

                // open the file
                setTimeout(() => {
                    this.handleFileAdded({
                        path,
                        isPreview: false
                    });
                    this.setState({});
                }, 100);
            });
        });
    }

    onSetMode({ mode, id }) {
        let item = id ? this.byId(id) : this.current
        if (item) {
            item.mode = mode
            item.session.setMode(mode.mode)
            this.saveToSession()
        }
    }

    handleFileAdded({ path, isPreview, mode, session }) {

        // This path is already opened just switch to it insteat of re-opening
        if (path && this.isPathOpened(path)) {
            this.current = this.findByPath(path)
            this.current.isPreview = !!isPreview;
        }
        else {
            mode = mode || (
                path ? modelist.getModeForPath(path) : 'ace/mode/text'
            );
            let text = '';

            if (path) {
                try {
                    text = fs.readFileSync(path, 'utf8');
                } catch (err) {
                    console.error(err);
                    return;
                }
            }

            let entry = {
                id: lib.uid(),
                path,
                hash: lib.md5(text),
                session : ace.createEditSession(text, mode.mode),
                mode,
                isPreview : !!isPreview,
                modified : false
            }

            if (session) {
                console.log(session)
                entry.session.setScrollLeft(session.scrollLeft)
                entry.session.setScrollTop(session.scrollTop)
            }

            entry.session.on("change", () => {
                fileActions.checkFileForModifications(entry.id)
            });

            // Close the existing reusable session (if any)
            this.files = this.files.filter(o => !o.isPreview)

            this.files.push(entry)

            this.current = entry
        }
        this.saveToSession()
        return this.current
    }

    handlePreviewFile(path) {
        this.handleFileAdded({
            path,
            isPreview: true
        });
    }

    /**
     * Closes the file by removing it from the list of opened files. Check if
     * the file has unsaved changes and for saving if so.
     */
    handleFileRemoved(id) {
        let idx = this.files.findIndex(f => f.id === id);
        if (idx > -1) {
            let meta = this.files[idx];

            // Check for unsaved changes
            if (meta.modified) {
                let action = Dialog.showMessageBox({
                    type    : 'question',
                    title   : 'Error',
                    buttons : [ "Don't Save", 'Cancel', 'Save' ],
                    message : 'This file has changes, do you want to save them?',
                    detail  : 'Your changes will be lost if you close this item without saving.'
                });

                if (action === 1) { // Cancel
                    return;
                }
                else if (action === 2) { // Save

                    // TODO: handle virtual files
                    let text = meta.session.getValue();
                    lib.writeFile(meta.path, text);
                }
            }

            meta.session.removeAllListeners();
            meta.session.destroy();
            this.files.splice(idx, 1);
            if (this.current && this.current.id == meta.id) {
                this.current = null;
                let len  = this.files.length;
                if (len) {
                    let next = idx - 1;
                    if (next < 0) {
                        next = this.files.length - 1;
                    }
                    if (next >= 0 && next < this.files.length) {
                        next = this.files[next];
                    } else {
                        next = null;
                    }
                    this.current = next;
                }
            }
            this.saveToSession();
        }
    }

    handleSetCurrentFile(id) {
        this.current = this.byId(id);
        this.saveToSession()
    }

    handleFileModified(path) {
        this.findAllByPath(path).forEach(f => {
            f.modified = true
        });
    }

    handleFileUnmodified(path) {
        this.findAllByPath(path).forEach(f => {
            f.modified = false
        });
    }

    handleFileMoved({ fromIndex, toIndex }) {
        this.files.splice(toIndex, 0, this.files.splice(fromIndex, 1))
        this.saveToSession()
    }

    handleCheckFile(id) {
        let entry = this.byId(id)
        if (entry.path) {
            this.findAllByPath(entry.path).forEach(f => {
                f.modified = lib.md5(f.session.getValue()) !== f.hash
            })
        }
        else {
            entry.modified = lib.md5(entry.session.getValue()) !== entry.hash
        }
    }

    handleFileSave() {
        if (!this.current) {
            throw new Error('No "current" file to save');
        }

        let text = this.current.session.getValue();
        if (lib.writeFile(this.current.path, text)) {
            this.current.modified = false;
            this.current.hash = lib.md5(text);
            this.current.isPreview = false;
        }
    }
}

var filesStore = alt.createStore(FilesStore, 'FilesStore')


export default filesStore
