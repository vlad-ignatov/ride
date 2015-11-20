import { PropTypes, Component } from 'react';
import fs                       from 'fs';
import fileActions              from '../actions/file-actions'

export default class FileTreeItem extends Component
{
    static propTypes = {
        path         : PropTypes.string,
        expanded     : PropTypes.bool,
        name         : PropTypes.string,
        type         : PropTypes.string.isRequired,
        level        : PropTypes.number,
        selectedPath : PropTypes.string,
        openFiles    : PropTypes.object
    };

    static TYPE_FILE = 'file';
    static TYPE_DIR  = 'dir';

    static defaultProps = {
        path    : '/',
        expanded: false,
        level   : 0,
        selectedPath : '',
        openFiles : { files: [] }
    };

    constructor(props)
    {
        super(props);
        this.onClick  = this.onClick.bind(this);
        this.dblClick = this.dblClick.bind(this);
        this.state = {
            expanded : props.expanded
        };


        this.state.expanded = props.type === FileTreeItem.TYPE_DIR &&
            props.openFiles.files.some(
                f => f.path && f.path.indexOf(props.path) === 0
            );
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
                <FileTreeItem { ...item } openFiles={ this.props.openFiles } />)
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
        else
            fileActions.previewFile(this.props.path)
    }

    dblClick()
    {
        if (this.props.type == FileTreeItem.TYPE_FILE) {
            fileActions.openFile(this.props.path)
        }
    }

    // componentDidMount()
    // {
    //     console.log(this.refs.li, this.props)
    //     if (jQuery(this.refs.li).is('.selected')) {
    //         this.refs.li.scrollIntoViewIfNeeded();
    //     }
    // }

    render()
    {
        var isDir = this.props.type == FileTreeItem.TYPE_DIR;
        if (this.props.selectedPath === this.props.path) {
            setTimeout(() => { this.refs.li.scrollIntoViewIfNeeded(); });
        }
        return (
            <li key={this.props.path} ref="li" className={
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
