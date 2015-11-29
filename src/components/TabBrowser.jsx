import { Component } from 'react'
import fileActions   from '../actions/file-actions'
import fileStore     from '../stores/file-store'
import path          from 'path'

export default class TabBrowser extends Component
{
    constructor() {
        super()
        this.state = fileStore.getState()
        this.onOpenedFilesChange = this.onOpenedFilesChange.bind(this)
    }

    componentDidMount() {
        fileStore.listen(this.onOpenedFilesChange)
    }

    componentWillUnmount() {
        fileStore.unlisten(this.onOpenedFilesChange)
    }

    onOpenedFilesChange() {
        this.setState(fileStore.getState())
    }

    closeFile(id, e) {
        e.stopPropagation();
        fileActions.closeFile(id);
    }

    setCurrentFile(id, event) {
        if (event) {
            if (event.nativeEvent.which == 3) {
                return false;
            }
            event.preventDefault();
        }
        fileActions.setCurrentFile(id);
    }

    onContextMenu(file, e) {
        // this.setCurrentFile(file.id)
        e.nativeEvent.menuTemplate.push(
            { label: 'Close Tab', click: () => fileActions.closeFile(file.id) },
            { type: 'separator' },
            { label: 'Close Other Tabs', click: () => fileActions.closeOthers(file.id) },
            { label: 'Close Saved Tabs', click: () => fileActions.closeSaved() },
            { label: 'Close Tabs to the Left', click: () => fileActions.closeAllBefore(file.id)},
            { label: 'Close Tabs to the Right', click: () => fileActions.closeAllAfter(file.id)},
            { type: 'separator' },
            { label: 'Close All Tabs', click: () => fileActions.closeAll() }
        );
    }

    getLabel(file) {
        if (!file.path) {
            return file.session.doc.getLine(0) || '*Untitled'
        }
        return path.basename(file.path);
    }

    render() {
        var files = this.state.files.map(f => {
            let file = f.path;
            return (
                <div className={
                        'tab' +
                        (this.state.current && this.state.current === f ? ' active' : '') +
                        (f.isPreview ? ' preview' : '') +
                        (f.modified ? ' modified' : '')
                    }
                    key={f.id}
                    title={file}
                    onMouseDown={ this.setCurrentFile.bind(this, f.id) }
                    onContextMenu={ this.onContextMenu.bind(this, f) }>
                    <span className="close-tab icon icon-close"
                        title="Close Tab"
                        onClick={ this.closeFile.bind(this, f.id) }/>
                    { this.getLabel(f) }
                </div>
            );
        });

        return (<div className="main-tabs">{ files }</div>);
    }
}
