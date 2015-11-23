/* global ENV */
require('../style/main.less');
import { Component  } from 'react';
import { FileTree   } from './FileTree';
import   Editor       from './Editor';
import   TabBrowser   from './TabBrowser';
import   ModeSelect   from './ModeSelect';
import   fileStore    from '../stores/file-store';
import   configStore  from '../stores/config-store';

export default class MainWindow extends Component
{
    constructor() {
        super();
        this.state = {
            config : configStore.getState(),
            openFiles : fileStore.getState()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        fileStore.listen(this._onChange);
        configStore.listen(this._onChange);
    }

    componentWillUnmount() {
        fileStore.unlisten(this._onChange);
        configStore.unlisten(this._onChange);
    }

    _onChange() {
        this.setState({
            config    : configStore.getState(),
            openFiles : fileStore.getState()
        });
    }

    render()
    {
        return (
            <div style={{display:'flex', height: '100%', flexDirection: 'column' }}>
                <div className="header" style={{ textAlign: 'center' }}>React Editor</div>
                <div className="main-row">
                    {this.state.config.leftSidebar.visible ?
                        <div className="main-sidebar-left" style={{ width: this.state.config.leftSidebar.width }}>
                            <FileTree type="dir"
                                path={ ENV.HOME }
                                name={ ENV.HOME }
                                openFiles={ this.state.openFiles }
                                selectedPath={ this.state.openFiles.current ? this.state.openFiles.current.path : '' }
                                expanded />
                            <div className="resizer vertical" style={{ left: this.state.config.leftSidebar.width }}/>
                        </div>:
                        ''
                    }
                    <div className="main-stage">
                        <TabBrowser/>
                        <div className="main-inspector">
                            { this.state.openFiles.current ? <Editor/> : '' }
                        </div>
                    </div>
                </div>
                <div className="main-status-bar" style={{display:'flex', flexDirection: 'row' }}>
                    <span>
                        { this.state.openFiles.current ? this.state.openFiles.current.path : 'Nothing selected' }
                    </span>
                    <span style={{ flex: 1}}/>
                    <ModeSelect mode={
                        this.state.openFiles.current ?
                            this.state.openFiles.current.mode.caption :
                            ''
                    }/>
                </div>
            </div>
        );
    }
}
