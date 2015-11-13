import { PropTypes, Component } from 'react';
import fs                       from 'fs';
import FileTreeActions          from '../actions/FileTreeActions';
import AppActions               from '../actions/AppActions';

export default class FileTreeItem extends Component
{
    static propTypes = {
        path     : PropTypes.string,
        expanded : PropTypes.bool,
        name     : PropTypes.string,
        type     : PropTypes.string.isRequired,
        level    : PropTypes.number,
        selectedPath : PropTypes.string
    };

    static TYPE_FILE = 'file';
    static TYPE_DIR  = 'dir';

    static defaultProps = {
        path    : '/',
        expanded: false,
        level   : 0,
        selectedPath : ''
    };

    constructor(props)
    {
        super(props);
        this.onClick  = this.onClick.bind(this);
        this.dblClick = this.dblClick.bind(this);
        this.state = {
            expanded : props.expanded
        };
    }

    getChildren()
    {
        var isDir = this.props.type == FileTreeItem.TYPE_DIR;
        if (this.state.expanded && isDir) {
            var files, items = [];

            try {
                files = fs.readdirSync(this.props.path);
            } catch (ex) {
                console.error(ex);
            }

            for (var i in files){
                var path = (this.props.path == '/' ? '' : this.props.path) + '/' + files[i],
                    stats;
                try {
                    stats = fs.statSync(path);
                } catch (ex) {
                    console.error(ex);
                    break;
                }
                items.push({
                    name : files[i],
                    level: this.props.level + 1,
                    selectedPath: this.props.selectedPath,
                    path,
                    key  : path,
                    type : stats.isDirectory() ?
                        FileTreeItem.TYPE_DIR :
                        FileTreeItem.TYPE_FILE
                });
            }

            // TODO: alpha sort too
            items.sort((a, b) => (
                (a.type == FileTreeItem.TYPE_DIR ? 0 : 1) -
                (b.type == FileTreeItem.TYPE_DIR ? 0 : 1)
            ));

            return (<ul>{ items.map(item => (
                <FileTreeItem { ...item } />)
            ) }</ul>);
        }

        return null;
    }

    onClick(e)
    {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.type == FileTreeItem.TYPE_DIR) {
            this.setState({
                expanded : !this.state.expanded
            });
        }
        // else {
            // DISPATCHER.emit('selectfile', this.props.path);
        // }
        FileTreeActions.select(this.props.path);
    }

    dblClick(e)
    {
        if (this.props.type == FileTreeItem.TYPE_FILE) {
            AppActions.openFile(this.props.path);
        }
    }

    render()
    {
        var isDir = this.props.type == FileTreeItem.TYPE_DIR;
        return (
            <li key={this.props.path} className={
                    this.props.type + (this.state.expanded ? ' expanded' : '') +
                    (this.props.selectedPath === this.props.path ? ' selected' : '')
                }>
                <div onClick={ this.onClick }
                     onDoubleClick={ this.dblClick }
                     style={{ paddingLeft: this.props.level * 18, opacity: this.props.name.indexOf('.') === 0 ? 0.5 : 1 }}
                     tabIndex="0">
                     <span className={ 'icon ' + (
                        isDir ?
                            this.state.expanded ?
                                'icon-folder-open' :
                                'icon-folder' :
                            'icon-file-text2'
                    ) }/>
                    { this.props.name || this.props.path }
                </div>
                { this.getChildren() }
            </li>
        );
    }
}
