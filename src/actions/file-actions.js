import alt from '../alt'

class FileActions
{
    constructor() {
        this.generateActions(
            'closeFile',
            'setCurrentFile',
            'setFileModified',
            'setFileUnmodified',
            'checkFileForModifications',
            'save'
        );
    }

    openFile(path = '') {
        this.dispatch({ path });
    }

    previewFile(path = '') {
        this.dispatch(path);
    }

    moveFile(fromIndex, toIndex) {
        this.dispatch({ fromIndex, toIndex });
    }
}

var filesActions = alt.createActions(FileActions)

export default filesActions
