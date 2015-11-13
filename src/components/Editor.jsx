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
    }

    render()
    {
        return (<div ref="wrapper" id="editor"/>);
    }
}
