/* global ReactDOM, ipc */
import MainWindow from './components/MainWindow.jsx';
import { default as $ } from 'jquery';
// import * as lib from './lib';
// import AppActions from './actions/AppActions';
import configActions from './actions/config-actions';



ipc.on('setSyntaxTheme', theme => {
    configActions.setEditorTheme(theme);
});
ipc.on('toggleFileTree', () => {
    configActions.toggleSidebarVisible();
});
ipc.on('fontIncrease', () => {
    configActions.increaseFontSize();
});
ipc.on('fontDecrease', () => {
    configActions.decreaseFontSize();
});
// ipc.on('openFiles', function(files) {
//     files.forEach(f => AppActions.openFile(f));
// });
// ipc.on('toggleFileTree', function() {
//     AppActions.toggleLeftSidebar();
// });




// window.AppActions = AppActions;

$(function() {
    $(document).on('selectstart', false);

    ReactDOM.render(<MainWindow />, document.querySelector('.main-wrap'));

    var leftSidebar = $('.main-sidebar-left');
    leftSidebar.find('> .resizer.vertical')
    .on('mousedown', function(evt) {
        var $resizer = $(this),
            deltaX   = evt.pageX - $resizer.offset().left,
            winWidth = $(window).width(),
            min      = winWidth * 0.1,
            max      = winWidth * 0.9;

        $('html').css('cursor', 'col-resize');
        $('body').css({
            cursor: 'col-resize',
            pointerEvents: 'none'
        });

        $(window)
        .on('mousemove.resizer', function(e) {
            var x = Math.max(Math.min(e.pageX - deltaX, max), min);
            leftSidebar.css({ width: x });
            $resizer.css('left', x);
            return false;
        })
        .one('mouseup.resizer', function() {
            $(window).off('.resizer');
            $('html').css('cursor', 'default');
            $('body').css({
                cursor: 'default',
                pointerEvents: 'auto'
            });
            configActions.setSidebarWidth(leftSidebar.outerWidth());
        });
        return false;
    });

    $('.header').on('dblclick', function() {
        ipc.send('toggleMaximize');
    });
});
