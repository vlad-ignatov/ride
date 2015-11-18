/* global fs, jQuery */
import alt from '../alt'
import configActions from '../actions/config-actions'
import { readJSON5, writeJSON } from '../lib'

var FILE = './src/config.json';
var INTERNAL_SAVE = false;

function write(state) {
    INTERNAL_SAVE = true;
    writeJSON(FILE, state, 4)
    INTERNAL_SAVE = false;
}

class ConfigStore
{
    static config = {

        /**
         * setState is used internally by Alt to set the state. You can override
         * this to provide your own setState implementation. Internally, setState
         * is an alias for Object.assign. setState must return an object.
         */
        setState(currentState: Object, nextState: Object): Object
        {
            let state = jQuery.extend(true, currentState, nextState)
            write(state)
            return state
        }
    }

    constructor() {

        var watcher;

        this.bindListeners({
            handleInvoke               : configActions.INVOKE,
            handleSetSidebarWidth      : configActions.SET_SIDEBAR_WIDTH,
            handleSetSidebarVisible    : configActions.SET_SIDEBAR_VISIBLE,
            handleToggleSidebarVisible : configActions.TOGGLE_SIDEBAR_VISIBLE,
            handleSetEditorTheme       : configActions.SET_EDITOR_THEME,
            handleIncreaseFontSize     : configActions.INCREASE_FONT_SIZE,
            handleDecreaseFontSize     : configActions.DECREASE_FONT_SIZE
        })

        this.on('init', () => {
            watcher = fs.watch(FILE, (event) => {
                if (event == 'change' && !INTERNAL_SAVE) {
                    this.setState(readJSON5(FILE))
                }
            })
        })

        window.addEventListener('beforeunload', () => {
            if (watcher) {
                watcher.close()
            }
        }, false);
    }

    handleInvoke({ commandId, args }) {
        return this[commandId](...args);
    }

    handleSetSidebarWidth(width) {
        this.setState({
            leftSidebar: {
                width
            }
        })
    }

    handleSetSidebarVisible(visible) {
        this.setState({
            leftSidebar: {
                visible
            }
        })
    }

    handleToggleSidebarVisible() {
        this.setState({
            leftSidebar: {
                visible: !this.leftSidebar.visible
            }
        })
    }

    handleSetEditorTheme(theme) {
        this.setState({
            editor : {
                theme
            }
        })
    }

    handleIncreaseFontSize() {
        this.setState({
            editor: {
                fontSize: Math.min(this.editor.fontSize + 1, 50)
            }
        })
    }

    handleDecreaseFontSize() {
        this.setState({
            editor: {
                fontSize: Math.max(this.editor.fontSize - 1, 6)
            }
        })
    }
}

var configStore = alt.createStore(ConfigStore, 'ConfigStore')

alt.bootstrap(JSON.stringify({
    ConfigStore: readJSON5(FILE)
}));

export default configStore
