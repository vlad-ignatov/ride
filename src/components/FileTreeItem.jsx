import { PropTypes, Component } from 'react';
import fs                       from 'fs';

export default class FileTreeItem extends Component
{
    static propTypes = {
        path     : PropTypes.string,
        expanded : PropTypes.bool,
        name     : PropTypes.string,
        type     : PropTypes.string.isRequired,
        level    : PropTypes.number,
    };

    static TYPE_FILE = 'file';
    static TYPE_DIR  = 'dir';

    static defaultProps = {
        path    : '/',
        expanded: false,
        level   : 0,
    };

    constructor(props)
    {
        super(props);
        this.mouseDwn = this.mouseDwn.bind(this);
        this.state = {
            expanded : props.expanded
        };
    }

    getChildren()
    {
        var isDir = this.props.type == FileTreeItem.TYPE_DIR;
        if (this.state.expanded && isDir) {
            var files = fs.readdirSync(this.props.path),
                items = [];

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

            console.log(items);

            return (<ul>{ items.map(item => (
                <FileTreeItem { ...item } />)
            ) }</ul>);
        }

        return null;
    }

    mouseDwn(e)
    {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.type == FileTreeItem.TYPE_DIR) {
            this.setState({
                expanded : !this.state.expanded
            });
        }
        else {
            // DISPATCHER.emit('selectfile', this.props.path);
        }
    }

    render()
    {
        var isDir = this.props.type == FileTreeItem.TYPE_DIR;
        return (
            <li key={this.props.path} className={
                    this.props.type + (this.state.expanded ? ' expanded' : '')
                }>
                <div onClick={ this.mouseDwn } style={{ paddingLeft: this.props.level * 18 }} tabIndex="0">
                    { (isDir ? '📂' : '📄') +  this.props.name || this.props.path }
                </div>
                { this.getChildren() }
            </li>
        );
    }
}
