'use strict';

import { PropTypes, Component } from 'react';
import AppActions               from '../actions/AppActions';
import FileTreeActions          from '../actions/FileTreeActions';

export default class TabBrowser extends Component
{
    static propTypes = {
        files        : PropTypes.array,
        selectedPath : PropTypes.string
    };

    constructor()
    {
        super();
    }

    close(path, e)
    {
        e.stopPropagation();
        AppActions.closeFile(path);
    }

    select(path)
    {
        FileTreeActions.select(path);
    }

    render()
    {
        var files = this.props.files.map(f => {
            let file = f.path;
            return (
                <div className={
                        'tab' +
                        (this.props.selectedPath == file ? ' active' : '') +
                        (f.isPreview ? ' preview' : '') +
                        (f.modified ? ' modified' : '')
                    }
                    key={file}
                    title={file}
                    onClick={ this.select.bind(this, file) }>
                    <span className="close-tab icon icon-close"
                        title="Close Tab"
                        onClick={ this.close.bind(this, file) }/>
                    {file.substr(file.lastIndexOf('/') + 1)}
                </div>
            );
        });

        return (<div className="main-tabs">{ files }</div>);
    }
}
