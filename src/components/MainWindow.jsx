require('../style/main.less');
import { Component } from 'react';
import { FileTree  } from './FileTree';
import Editor        from './Editor';
import TabBrowser    from './TabBrowser';
import { appStateStore  } from '../stores/AppStateStore';

export default class MainWindow extends Component
{
    constructor()
    {
        super();
        this.state = appStateStore.getState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount()
    {
        appStateStore.addChangeListener(this._onChange);
    }

    componentWillUnmount()
    {
        appStateStore.removeChangeListener(this._onChange);
    }

    _onChange()
    {
        this.setState(appStateStore.getState())
    }

    render()
    {
        return (
            <div style={{display:'flex', height: '100%', flexDirection: 'column' }}>
                <div className="header" style={{ textAlign: 'center' }}>React Editor</div>
                <div className="main-row">
                    <div className="main-sidebar-left">
                        <FileTree type="dir" path="/" expanded selectedPath={ this.state.selectedFilePath } />
                        <div className="resizer vertical" style={{left: 300}}></div>
                    </div>
                    <div className="main-stage">
                        <TabBrowser/>
                        <div className="main-inspector">
                            <Editor filePath={ this.state.selectedFilePath }/>
                        </div>
                    </div>
                </div>
                <div className="main-status-bar">
                    { this.state.selectedFilePath || 'ready' }
                </div>
            </div>
        );
    }
}
