require('../style/main.less');
import { Component } from 'react';
import { FileTree  } from './FileTree.jsx';
import Editor from './Editor.jsx';

export default class MainWindow extends Component
{
    render()
    {
        return (
            <div style={{display:'flex', height: '100%', flexDirection: 'column' }}>
                <div className="header" style={{ textAlign: 'center' }}>React Editor</div>
                <div className="main-row">
                    <div className="main-sidebar-left">
                        <FileTree type="dir" path="/" expanded/>
                        <div className="resizer vertical" style={{left: 300}}></div>
                    </div>
                    <div className="main-stage">
                        <div className="main-tabs">
                            <div className="tab active">
                                Tab 1
                            </div>
                            <div className="tab">
                                Tab 2
                            </div>
                        </div>
                        <div className="main-inspector">
                            <Editor/>
                        </div>
                    </div>
                </div>
                <div className="main-status-bar">
                    Status bar
                </div>
            </div>
        );
    }
}
