/* global ipc, ace, remote */
import { PropTypes, Component } from 'react';
// import { default as fs } from 'fs';
// import { stateStore } from '../stores/StateStore';
// import * as lib from '../lib';

import fileStore   from '../stores/file-store'
import configStore from '../stores/config-store'

export default class Editor extends Component
{
    // static propTypes = {
    //     filePath : PropTypes.string
    // };
    //
    // static defaultProps = {
    //     filePath : ''
    // };

    constructor(props)
    {
        super(props);
        this.state = {
            config : configStore.getState()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillUnmount()
    {
        fileStore.unlisten(this._onChange);
        configStore.unlisten(this._onChange);
        // ipc.removeListener('setSyntaxTheme');
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


        let currentFile = fileStore.getState().current;
        if (currentFile) {
            this.editor.setSession(currentFile.session);
        }
        else {
            this.editor.setSession(
                ace.createEditSession('')
            );
        }
    }

    componentDidMount()
    {
        fileStore.listen(this._onChange);
        configStore.listen(this._onChange);
        this.editor = ace.edit(this.refs.wrapper);
        this.editor.$blockScrolling = Infinity;
        // this.editor.setTheme(this.state.config.editor.theme);
        // this.editor.setFontSize(this.state.config.editor.fontSize);
        this._onChange()
        // this.editor.setTheme("ace/theme/twilight");
        // this.editor.setDisplayIndentGuides(false);
        // ipc.on('setSyntaxTheme', theme => {
        //     this.editor.setTheme(theme);
        // });
        // ipc.on('saveFile', lib.saveCurrentFile);
        // ipc.on('saveFileAs', () => {
        //     var dialog = remote.require('dialog');
        //     var path = dialog.showSaveDialog(null, {
        //         title: 'Save As'
        //     });
        //
        //     if (path) {
        //         try {
        //             fs.writeFileSync(path, this.editor.getValue(), 'utf8');
        //         } catch (ex) {
        //             dialog.showMessageBox(null, {
        //                 type: 'error',
        //                 title: 'Error saving file',
        //                 message: ex.message,
        //                 detail: ex.stack
        //             });
        //         }
        //     }
        // });
    }

    render()
    {
        return (<div ref="wrapper" id="editor"/>);
    }
}
