/* global alt, $ */
module.exports = {

    setUp: function(callback) {
        this.state = $.extend(true, {}, alt.stores.ConfigStore.getState());
        callback();
    },

    tearDown: function (callback) {
        alt.stores.ConfigStore.config.setState(this.state);
        callback();
    },

    'ConfigActions.setSidebarWidth': function(test) {
        alt.actions.ConfigActions.setSidebarWidth(100);
        test.equal(
            alt.stores.ConfigStore.state.leftSidebar.width,
            100,
            "The sidebar width can be changed in config"
        );
        test.done();
    },

    'ConfigActions.setSidebarVisible': function(test) {
        alt.actions.ConfigActions.setSidebarVisible(false);
        test.ok(
            $('.main-sidebar-left').length === 0,
            "The sidebar width can be hidden via config"
        );
        alt.actions.ConfigActions.setSidebarVisible(true);
        test.ok(
            $('.main-sidebar-left').length === 1,
            "The sidebar width can be shown via config"
        );
        test.done();
    }
};
