import { PropTypes, Component } from 'react';
import { default as fs } from 'fs';
import { appStateStore } from '../stores/AppStateStore';

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
        appStateStore.removeChangeListener(this._onChange);
    }

    _onChange()
    {
        var path  = appStateStore.getState().selectedFilePath;
        if (path) {
            var isDir = fs.statSync(path).isDirectory();
            if (!isDir) {
                try {
                    let modelist = ace.require("ace/ext/modelist");
                    let mode     = modelist.getModeForPath(path).mode
                    this.editor.session.setMode(mode) // mode now contains "ace/mode/javascript".
                    this.editor.setValue(fs.readFileSync(path, 'utf8'), -1);
                } catch(ex) {
                    console.error(ex);
                    this.editor.setValue('');
                }
            }
        }
        else {
            this.editor.setValue('');
        }
    }

    componentDidMount()
    {
        appStateStore.addChangeListener(this._onChange);
        this.editor = ace.edit(this.refs.wrapper);
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme("ace/theme/twilight");
        this.editor.getSession().setMode("ace/mode/jsx");
        this.editor.setDisplayIndentGuides(false);
    }

    render()
    {
        return (<div ref="wrapper" id="editor"/>);
    }
}
