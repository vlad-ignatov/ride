import { PropTypes, Component } from 'react'
import fileActions from '../actions/file-actions'
import fileStore   from '../stores/file-store'

export default class TabBrowser extends Component
{
    static propTypes = {
        files        : PropTypes.array,
        selectedPath : PropTypes.string
    };

    constructor() {
        super()
        this.state = fileStore.getState()
        this.onOpenedFilesChange = this.onOpenedFilesChange.bind(this)
    }

    componentDidMount() {
        fileStore.listen(this.onOpenedFilesChange)
    }

    componentWillUnmount() {
        fileStore.unlisten(this.onOpenedFilesChange)
    }

    onOpenedFilesChange() {
        this.setState(fileStore.getState())
    }

    closeFile(id, e) {
        e.stopPropagation();
        fileActions.closeFile(id);
    }

    setCurrentFile(id) {
        fileActions.setCurrentFile(id);
    }

    render() {
        var files = this.state.files.map(f => {
            let file = f.path;
            return (
                <div className={
                        'tab' +
                        (this.state.current && this.state.current === f ? ' active' : '') +
                        (f.isPreview ? ' preview' : '') +
                        (f.modified ? ' modified' : '')
                    }
                    key={f.id}
                    title={file}
                    onClick={ this.setCurrentFile.bind(this, f.id) }>
                    <span className="close-tab icon icon-close"
                        title="Close Tab"
                        onClick={ this.closeFile.bind(this, f.id) }/>
                    {file.substr(file.lastIndexOf('/') + 1)}
                </div>
            );
        });

        return (<div className="main-tabs">{ files }</div>);
    }
}
