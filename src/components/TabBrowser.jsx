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
        this._draggedTab = null
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
            // event.preventDefault();
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

    // DnD ---------------------------------------------------------------------
    
    /**
     * Given a x and y coortinates compute the insert index of the dragged tab.
     * Returns -1 if the coordinates cannot result in meaningfull index.
     */
    getDropIndex(x, y) {
        let index = -1;
        
        // First look for any DIV that contains the coordinates
        let tab = document.elementFromPoint(x, y);
        while (tab && tab.nodeName != 'DIV') {
            tab = tab.parentElement;
        }

        // If such div is found it must be valid tab div
        if (tab && tab.matches('.main-tabs > .tab')) {
            
            // Increment the index if x is in the right half of the tab 
            let width  = tab.offsetWidth;
            let left   = tab.offsetLeft;
            let layerX = x - left - this.refs.wrapper.parentElement.offsetLeft;
            if (layerX > width / 2) {
                index += 1;
            }
            
            // Use the tab's index
            while (tab.previousSibling) {
                tab = tab.previousSibling;
                index++;
            } 
            
            // Exclude the positions before and after the current tab
            let curIdx = this.state.files.indexOf(this.state.current);
            if (curIdx === index || curIdx + 1 === index) {
                index = -1;
            }
        }

        return index;
    }

    onDragStart(id, event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/custom', id);
        this._draggedTab = id
    }

    onDragOver(id, event) {
        let dragID = event.dataTransfer.getData('text/custom')
        if (dragID === id) {
            this.refs.dropPreview.style.display = 'none'
            return true
        }

        event.preventDefault();
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';

        let index = this.getDropIndex(event.pageX, event.pageY)
        if (index > -1) {

            let tabs = this.refs.wrapper.querySelectorAll('div.tab')
            let last = false
            if (index > tabs.length - 1) {
                index = tabs.length - 1
                last  = true
            }

            let div    = tabs[index]
            let left   = div.offsetLeft
            let tx     = left

            if (last) {
                tx += div.offsetWidth
            }

            this.refs.dropPreview.style.display = 'block'
            this.refs.dropPreview.style.transform = `translateX(${tx}px)`
        }
        else {
            this.refs.dropPreview.style.display = 'none'
        }
    }

    onDragLeave() {
        this.refs.dropPreview.style.display = 'none'
    }

    onDragEnd() {
        this.refs.dropPreview.style.display = 'none'
    }

    onDrop(id, event) {
        event.stopPropagation();
        event.preventDefault();
        let dragID    = event.dataTransfer.getData('text/custom')
        let dropIndex = this.getDropIndex(event.pageX, event.pageY)
        fileActions.moveFile({
            id: dragID,
            toIndex: dropIndex
        })
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
                    draggable
                    key={f.id}
                    title={file}
                    data-id={ f.id }
                    onMouseDown={ this.setCurrentFile.bind(this, f.id) }
                    onContextMenu={ this.onContextMenu.bind(this, f) }
                    onDragStart={ this.onDragStart.bind(this, f.id) }
                    onDragOver={ this.onDragOver.bind(this, f.id) }
                    onDragLeave={ this.onDragLeave.bind(this) }
                    onDrop={ this.onDrop.bind(this, f.id) }
                    onDragEnd={ this.onDragEnd.bind(this) }>

                    <span className="close-tab icon icon-close"
                        title="Close Tab"
                        onClick={ this.closeFile.bind(this, f.id) }/>
                    { this.getLabel(f) }
                </div>
            );
        });

        return (
            <div className="main-tabs" ref="wrapper">
                <div className="preview-insert"
                    ref="dropPreview"
                    style={{ display: 'none' }}/>
                { files }
            </div>
        );
    }
}
