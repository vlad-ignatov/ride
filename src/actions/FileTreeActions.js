import Constants     from '../constants/constants';
import appDispatcher from '../Dispatcher';

module.exports = {

    select(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_SELECT_ITEM,
            path
        });
    },

    expand(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_EXPAND_ITEM,
            path
        });
    },

    collapse(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_COLLAPSE_ITEM,
            path
        });
    },

    toggle(path) {
        appDispatcher.handleViewAction({
            actionType: Constants.FILETREE_TOGGLE_ITEM,
            path
        });
    }

};
