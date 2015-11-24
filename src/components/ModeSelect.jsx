/* global ace */
import { PropTypes, Component } from 'react'
import fileActions from '../actions/file-actions'
var modelist = ace.require("ace/ext/modelist")

export default class ModeSelect extends Component
{
    static propTypes = {
        mode: PropTypes.string
    }

    static defaultProps = {
        mode: 'text'
    }

    onClick(e) {
        e.nativeEvent.menuTemplate = e.nativeEvent.menuTemplate.concat(
            modelist.modes.map(m => {
                return {
                    label: m.caption,
                    click: () => {
                        fileActions.setMode(m)
                    }
                }
            })
        )
    }

    render() {
        return (
            <a onClick={ this.onClick.bind(this) } href="javascript:void 0">
                { this.props.mode }
            </a>
        )
    }
}
