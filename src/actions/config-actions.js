import alt from '../alt'

class ConfigActions {

    constructor() {
        this.generateActions(
            'reload',
            'save',
            'mixin',
            'setSidebarWidth',
            'setSidebarVisible',
            'toggleSidebarVisible',
            'setEditorTheme',
            'increaseFontSize',
            'decreaseFontSize'
        );
    }

    invoke(commandId, ...args) {
        this.dispatch({
            commandId,
            args
        });
    }
}

var configActions = alt.createActions(ConfigActions)
export default configActions
