'use strict';
// TabBrowser.js
import { PropTypes, Component } from 'react';
import { openFilesStore } from '../stores/OpenFilesStore';

export default class TabBrowser extends Component
{
    constructor()
    {
        super();
        this.state = {
            files : {}
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillUnmount()
    {
        openFilesStore.removeChangeListener(this._onChange);
    }

    componentDidMount()
    {
        openFilesStore.addChangeListener(this._onChange);
    }

    _onChange()
    {
        console.log(openFilesStore.getAll())
        this.setState({
            files : openFilesStore.getAll()
        });
    }

    render()
    {
        // console.log(this.state.files);
        var files = [];
        for (let file in this.state.files) {
            files.push(
                <div className="tab" key={file} title={file}>
                    <span className="close-tab icon icon-close" title="Close Tab"/>
                    {file.substr(file.lastIndexOf('/') + 1)}
                </div>
            );
        }
        return (
            <div className="main-tabs">
                { files }
                { /*
                <div className="tab active">
                    Tab 1
                </div>
                <div className="tab">
                    Tab 2
                </div>
                */ }
            </div>
        );
    }
}
