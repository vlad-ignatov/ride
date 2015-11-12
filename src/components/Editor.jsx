import { PropTypes, Component } from 'react';

export default class Editor extends Component
{
    componentDidMount()
    {
        var editor = ace.edit(this.refs.wrapper);
        editor.setTheme("ace/theme/twilight");
        editor.getSession().setMode("ace/mode/jsx");
        editor.setDisplayIndentGuides(false);
    }

    render()
    {
        return (
            <div ref="wrapper" id="editor"></div>
        );
    }
}
