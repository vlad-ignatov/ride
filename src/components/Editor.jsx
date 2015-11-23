/* global ace */
import { Component } from 'react'
import fileStore     from '../stores/file-store'
import configStore   from '../stores/config-store'
import fileActions   from '../actions/file-actions'

export default class Editor extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            config : configStore.getState()
        };
        this._onChange = this._onChange.bind(this)
    }

    componentWillUnmount()
    {
        fileStore.unlisten(this._onChange)
        configStore.unlisten(this._onChange)
    }

    _onChange()
    {
        let cfg = configStore.getState()

        this.editor.setTheme('ace/theme/' + cfg.editor.theme)
        this.editor.setDisplayIndentGuides(false)
        this.editor.setFontSize(this.state.config.editor.fontSize)
        this.editor.setAnimatedScroll(this.state.config.editor.animatedScroll)
        this.editor.setBehavioursEnabled(this.state.config.editor.autoPairing)
        this.editor.setDisplayIndentGuides(this.state.config.editor.displayIndentGuides)
        this.editor.setHighlightActiveLine(this.state.config.editor.highlightActiveLine)
        this.editor.setHighlightGutterLine(this.state.config.editor.highlightGutterLine)
        this.editor.setHighlightSelectedWord(this.state.config.editor.highlightSelectedWord)
        this.editor.setShowPrintMargin(this.state.config.editor.showPrintMargin)
        this.editor.setPrintMarginColumn(this.state.config.editor.printMarginColumn)
        this.editor.setScrollSpeed(this.state.config.editor.scrollSpeed)
        this.editor.setShowFoldWidgets(this.state.config.editor.showFoldWidgets)
        this.editor.setShowInvisibles(this.state.config.editor.showInvisibles)


        let currentFile = fileStore.getState().current
        if (currentFile && currentFile.session) {
            this.editor.setSession(currentFile.session)
        }
        else {
            this.editor.setSession(ace.createEditSession(''))
        }
    }

    componentDidMount()
    {
        fileStore.listen(this._onChange)
        configStore.listen(this._onChange)
        this.editor = ace.edit(this.refs.wrapper)
        this.editor.$blockScrolling = Infinity
        this._onChange()
    }

    onContextMenu(e) {
        e.nativeEvent.menuTemplate.push(
            { label: 'New File', click: () => { fileActions.newFile() } }
        )
    }

    render()
    {
        return (<div ref="wrapper" id="editor" onContextMenu={ this.onContextMenu }/>)
    }
}
