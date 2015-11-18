/* global ace, fs */
import alt from '../alt'
import * as lib from '../lib'
import fileActions from '../actions/file-actions'

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
            handleCheckFile     : fileActions.CHECK_FILE_FOR_MODIFICATIONS
        });
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

    // handlers ------------------------------------------------------------------

    handleFileAdded(path) {

        // This path is already opened just switch to it insteat of re-opening
        if (path && this.isPathOpened(path)) {
            this.current = this.findByPath(path)
        }
        else {
            let mode = path ? modelist.getModeForPath(path).mode : 'ace/mode/text';
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
                session : ace.createEditSession(text, mode),
                isPreview : false,
                modified : false
            }

            entry.session.on("change", () => {
                fileActions.checkFileForModifications(entry.id);
            });

            // console.log(entry.session);

            this.files.push(entry)

            this.current = entry
        }
        return this.current
    }

    handlePreviewFile(path) {
        let entry = this.handleFileAdded(path)
        entry.isPreview = true
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
        }
    }

    handleSetCurrentFile(id) {
        this.current = this.byId(id);
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
}

var filesStore = alt.createStore(FilesStore, 'FilesStore')

export default filesStore