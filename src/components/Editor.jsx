import { PropTypes, Component } from 'react';
import { default as fs } from 'fs';
import { stateStore } from '../stores/StateStore';

export default class Editor extends Component
{
    static propTypes = {
        filePath : PropTypes.string
    };

    static defaultProps = {
        filePath : ''
    };

    constructor(props)
    {
        super(props);
        this.state = {
            filePath : props.filePath || ''
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillUnmount()
    {
        stateStore.removeChangeListener(this._onChange);
        ipc.removeListener('setSyntaxTheme');
    }

    _onChange()
    {
        var state = stateStore.getCurrentSession();
        if (state) {
            this.editor.setSession(state.session);
        }
        else {
            this.editor.setValue('');
        }
    }

    componentDidMount()
    {
        stateStore.addChangeListener(this._onChange);
        this.editor = ace.edit(this.refs.wrapper);
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme("ace/theme/twilight");
        this.editor.setDisplayIndentGuides(false);
        ipc.on('setSyntaxTheme', theme => {
            this.editor.setTheme(theme);
        });
        ipc.on('saveFile', () => {
            var state = stateStore.getCurrentSession();
            if (state && state.path) {
                try {
                    fs.writeFileSync( state.path, state.session.getValue(), 'utf8');
                } catch (ex) {
                    remote.require('dialog').showMessageBox(null, {
                        type: 'error',
                        title: 'Error saving file',
                        message: ex.message,
                        detail: ex.stack
                    });
                }
            }
        });
        ipc.on('saveFileAs', () => {
            var dialog = remote.require('dialog');
            var path = dialog.showSaveDialog(null, {
                title: 'Save As'
            });

            if (path) {
                try {
                    fs.writeFileSync(path, this.editor.getValue(), 'utf8');
                } catch (ex) {
                    dialog.showMessageBox(null, {
                        type: 'error',
                        title: 'Error saving file',
                        message: ex.message,
                        detail: ex.stack
                    });
                }
            }
        });
    }

    render()
    {
        return (<div ref="wrapper" id="editor"/>);
    }
}
