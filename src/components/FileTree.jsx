import { PropTypes, Component } from 'react';
import FileTreeItem from './FileTreeItem';
import fs       from 'fs';

/**
 * This is just a wrapper arround recursive structure of FileTreeItem
 * components. It creates the outer-most UL element, reads the root directory
 * and passes the state down the tree.
 */
export class FileTree extends Component
{
    static propTypes = {
        path         : PropTypes.string,
        name         : PropTypes.string,
        expanded     : PropTypes.bool,
        selectedPath : PropTypes.string,
        openFiles    : PropTypes.object
    };

    static defaultProps = {
        path    : '/',
        name    : 'Folder',
        expanded: false,
        selectedPath : ''
    };

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
                    expanded={ this.props.expanded }
                    selectedPath={ this.props.selectedPath }
                    openFiles={ this.props.openFiles } />
            </ul>
        );
    }
}
