var Constants     = require('../constants/constants');
var appDispatcher = require('../Dispatcher');

var AppActions = {

    openFile: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_OPEN_FILE,
            path      : path
        });
    },

    closeFile: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_CLOSE_FILE,
            path      : path
        });
    },

    save: function() {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_SAVE_FILE,
            path      : path
        });
    }

};

module.exports = AppActions;
