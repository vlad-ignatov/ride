import alt from '../alt'

class ConfigActions {

    setSidebarWidth(w) {
        this.dispatch(w);
    }

    setSidebarVisible(bVisible) {
        this.dispatch(bVisible);
    }

    toggleSidebarVisible() {
        this.dispatch();
    }

    setEditorTheme(theme) {
        this.dispatch(theme);
    }

    increaseFontSize() {
        this.dispatch();
    }

    decreaseFontSize() {
        this.dispatch();
    }
}

var configActions = alt.createActions(ConfigActions)
export default configActions
