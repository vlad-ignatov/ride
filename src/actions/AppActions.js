var Constants = require('../constants/AppConstants');
var appDispatcher = require('../Dispatcher');

var AppActions = {

    openFile: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.APP_OPEN_FILE,
            path      : path
        });
    }

};

module.exports = AppActions;
