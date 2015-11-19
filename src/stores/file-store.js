/* global ace, fs, jQuery */
import alt from '../alt'
import * as lib from '../lib'
import fileActions from '../actions/file-actions'
import { readJSON5, writeJSON } from '../lib'

var modelist = ace.require("ace/ext/modelist");

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
            handleCheckFile     : fileActions.CHECK_FILE_FOR_MODIFICATIONS
        });

        this.on('init', () => {
            let state = readJSON5('./src/session.json') || { files: [] }
            state.files.forEach(f => {
                console.log(f)
                this.handleFileAdded(f)
            })
            if (state.current) {
                this.handleSetCurrentFile(this.findByPath(state.current).id)
            }
            // this.__is_loaded = true
        })
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
        let json = {
            files: this.files.map(f => {
                return {
                    path: f.path,
                    isPreview: f.isPreview
                }
            }),
            current: this.current ? this.current.path : null
        }
        writeJSON('./src/session.json', json, 4)
    }

    // handlers ------------------------------------------------------------------

    handleFileAdded({ path, isPreview }) {

        // This path is already opened just switch to it insteat of re-opening
        if (path && this.isPathOpened(path)) {
            this.current = this.findByPath(path)
            this.current.isPreview = !!isPreview;
        }
        else {
            let mode = path ? modelist.getModeForPath(path) : 'ace/mode/text';
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
            // console.log(modelist.getModeForPath(path))

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
        })
    }

    handleFileRemoved(id) {
        let idx = this.files.findIndex(f => f.id === id);
        if (idx > -1) {
            let meta = this.files[idx]
            meta.session.removeAllListeners();
            meta.session.destroy();
            this.files.splice(idx, 1);

            if (this.current == meta) {
                this.current = null;
                let len  = this.files.length;
                if (len) {
                    let next = idx - 1;
                    if (next < 0) {
                        next = this.files.length - 1;
                    }
                    if (next >= 0) {
                        next = this.files[next];
                    }

                    if (next) {
                        this.current = next;
                    }
                }
            }
            this.saveToSession()
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
