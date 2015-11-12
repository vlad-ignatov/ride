/* global fs, DISPATCHER */
import { PropTypes, Component } from 'react';
import FileTreeItem from './FileTreeItem';
import fs       from 'fs';

export class FileTree extends Component
{
    static propTypes = {
        path     : PropTypes.string,
        name     : PropTypes.string,
        expanded : PropTypes.bool
    };

    static defaultProps = {
        path    : '/',
        name    : 'Folder',
        expanded: false
    };

    constructor(...args)
    {
        super(...args);
    }

    render()
    {
        var type = fs.statSync(this.props.path).isDirectory() ?
            FileTreeItem.TYPE_DIR :
            FileTreeItem.TYPE_FILE;

        return (
            <ul className="file-tree">
                <FileTreeItem
                    path={ this.props.path }
                    name={ this.props.name }
                    type={ type }
                    expanded={ this.props.expanded } />
            </ul>
        );
    }
}
