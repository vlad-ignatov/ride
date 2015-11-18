import alt from '../alt'
import configActions from '../actions/config-actions'

class ConfigStore
{
    constructor() {
        this.leftSidebar = {
            visible: true,
            width: 300
        };

        this.editor = {
            theme : 'ace/theme/twilight',
            fontSize: 14
        }

        this.bindListeners({
            handleSetSidebarWidth      : configActions.SET_SIDEBAR_WIDTH,
            handleSetSidebarVisible    : configActions.SET_SIDEBAR_VISIBLE,
            handleToggleSidebarVisible : configActions.TOGGLE_SIDEBAR_VISIBLE,
            handleSetEditorTheme       : configActions.SET_EDITOR_THEME,
            handleIncreaseFontSize     : configActions.INCREASE_FONT_SIZE,
            handleDecreaseFontSize     : configActions.DECREASE_FONT_SIZE
        })
    }

    handleSetSidebarWidth(w) {
        this.leftSidebar.width = w
    }

    handleSetSidebarVisible(on) {
        this.leftSidebar.visible = on
    }

    handleToggleSidebarVisible() {
        this.leftSidebar.visible = !this.leftSidebar.visible
    }

    handleSetEditorTheme(theme) {
        this.editor.theme = theme
    }

    handleIncreaseFontSize() {
        this.editor.fontSize = Math.min(this.editor.fontSize + 1, 50);
    }

    handleDecreaseFontSize() {
        this.editor.fontSize = Math.max(this.editor.fontSize - 1, 8);
    }
}

var configStore = alt.createStore(ConfigStore, 'ConfigStore')
export default configStore
