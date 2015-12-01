/* global alt, $ */
module.exports = {
    
    setUp(callback) {
        this._state = $.extend(true, {}, alt.stores.ConfigStore.getState());
        callback();
    },

    tearDown(callback) {
        alt.stores.ConfigStore.state.setState(this._state);
        callback();
    },

    setSidebarWidth(test) {
        alt.actions.ConfigActions.setSidebarVisible(true);
        alt.actions.ConfigActions.setSidebarWidth(100);
        test.equal(
            alt.stores.ConfigStore.state.leftSidebar.width,
            100,
            "The sidebar width can be changed in config"
        );
        test.done();
    },

    setSidebarVisible(test) {
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
    },

    increaseFontSize(test) {
        var base = alt.stores.ConfigStore.state.editor.fontSize;
        alt.actions.ConfigActions.increaseFontSize();
        test.ok(alt.stores.ConfigStore.state.editor.fontSize === base + 1);
        test.done();
    },

    decreaseFontSize(test) {
        var base = alt.stores.ConfigStore.state.editor.fontSize;
        alt.actions.ConfigActions.decreaseFontSize();
        test.ok(alt.stores.ConfigStore.state.editor.fontSize === base - 1);
        test.done();
    },
    
    setEditorTheme(test) {
        var tasks = [
            'ambiance',
            'chaos',
            'chrome',
            'clouds',
            'clouds_midnight',
            'cobalt',
            'crimson_editor',
            'dawn',
            'dreamweaver',
            'eclipse',
            'github',
            'idle_fingers',
            'iplastic',
            'katzenmilch',
            'kr_theme',
            'kuroir',
            'merbivore',
            'merbivore_soft',
            'mono_industrial',
            'monokai',
            'pastel_on_dark',
            'solarized_dark',
            'solarized_light',
            'sqlserver',
            'terminal',
            'textmate',
            'tomorrow',
            'tomorrow_night',
            'tomorrow_night_blue',
            'tomorrow_night_bright',
            'tomorrow_night_eighties',
            'twilight',
            'vibrant_ink',
            'xcode'
        ].map(theme => (cb) => {
            alt.actions.ConfigActions.setEditorTheme(theme);
            test.ok(alt.stores.ConfigStore.state.editor.theme === theme);
            setTimeout(cb, 300);
        });
        
        function run() {
            if (tasks.length) {
                tasks.shift()(run);
            } else {
                test.done();
            }
        }
        
        run();
    }
};
