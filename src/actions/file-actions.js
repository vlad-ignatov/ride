import alt from '../alt'

class FileActions
{
    constructor() {
        this.generateActions(
            'closeFile',
            'closeAll',
            'closeAllBefore',
            'closeAllAfter',
            'closeOthers',
            'closeSaved',
            'setCurrentFile',
            'setFileModified',
            'setFileUnmodified',
            'checkFileForModifications',
            'save',
            'newFile',
            'moveFile'
        );
    }

    openFile(path = '') {
        this.dispatch({ path });
    }

    previewFile(path = '') {
        this.dispatch(path);
    }

    setMode(mode, id) {
        this.dispatch({ mode, id });
    }
}

var filesActions = alt.createActions(FileActions)

export default filesActions
