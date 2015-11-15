var Constants     = require('../constants/constants');
var appDispatcher = require('../Dispatcher');

var AppActions = {

    openFile(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_OPEN_FILE,
            path
        });
    },

    closeFile(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_CLOSE_FILE,
            path
        });
    },

    save() {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_SAVE_FILE
        });
    },

    setLeftSidebarWidth(width) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_SET_LEFT_SIDEBAR_WIDTH,
            width
        });
    }

};

module.exports = AppActions;
