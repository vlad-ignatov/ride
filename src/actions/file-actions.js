import alt from '../alt'

class FileActions
{
    openFile(path = '') {
        this.dispatch(path);
    }

    previewFile(path = '') {
        this.dispatch(path);
    }

    closeFile(id) {
        this.dispatch(id);
    }

    setCurrentFile(id) {
        this.dispatch(id);
    }

    setFileModified(path) {
        this.dispatch(path);
    }

    setFileUnmodified(path) {
        this.dispatch(path);
    }

    checkFileForModifications(id) {
        this.dispatch(id);
    }

    moveFile(fromIndex, toIndex) {
        this.dispatch({ fromIndex, toIndex });
    }
}

var filesActions = alt.createActions(FileActions)

export default filesActions
