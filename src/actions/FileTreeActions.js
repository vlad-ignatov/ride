var Constants     = require('../constants/constants');
var appDispatcher = require('../Dispatcher');

var FileTreeActions = {

    select: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_SELECT_ITEM,
            path      : path
        });
    },

    expand: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_EXPAND_ITEM,
            path      : path
        });
    },

    collapse: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_COLLAPSE_ITEM,
            path      : path
        });
    },

    toggle: function(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_TOGGLE_ITEM,
            path      : path
        });
    }

};

module.exports = FileTreeActions;
