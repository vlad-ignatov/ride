require('../style/main.less');
import { Component  } from 'react';
import { FileTree   } from './FileTree';
import   Editor       from './Editor';
import   TabBrowser   from './TabBrowser';
import { stateStore } from '../stores/StateStore';
import   AppActions   from '../actions/AppActions';

export default class MainWindow extends Component
{
    constructor()
    {
        super();
        this.state = stateStore.getState();
        this._onChange = this._onChange.bind(this);
        ipc.on('openFiles', function(files) {
            files.forEach(f => AppActions.openFile(f));
        });
    }

    componentDidMount()
    {
        stateStore.addChangeListener(this._onChange);
    }

    componentWillUnmount()
    {
        stateStore.removeChangeListener(this._onChange);
    }

    _onChange()
    {
        this.setState(stateStore.getState());
    }

    render()
    {
        return (
            <div style={{display:'flex', height: '100%', flexDirection: 'column' }}>
                <div className="header" style={{ textAlign: 'center' }}>React Editor</div>
                <div className="main-row">
                    <div className="main-sidebar-left">
                        <FileTree type="dir"
                            path={ ENV.HOME }
                            name={ ENV.HOME }
                            selectedPath={ this.state.fileTree.selectedPath }
                            expanded />
                        <div className="resizer vertical" style={{left: 300}}></div>
                    </div>
                    <div className="main-stage">
                        <TabBrowser selectedPath={ this.state.currentFile } files={ this.state.openFiles }/>
                        <div className="main-inspector">
                            <Editor filePath={ this.state.currentFile }/>
                        </div>
                    </div>
                </div>
                <div className="main-status-bar">
                    { this.state.fileTree.selectedPath || 'Nothing selected' }
                </div>
            </div>
        );
    }
}
