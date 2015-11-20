/* global ReactDOM, ipc, Menu */
import MainWindow       from './components/MainWindow.jsx';
import { default as $ } from 'jquery';
import configActions    from './actions/config-actions';
import fileActions      from './actions/file-actions';
// import { default as Menu } from 'menu';
import remote           from 'remote';

// Proxy comands from the main process app menu to the window
ipc.on('setSyntaxTheme', configActions.setEditorTheme)
ipc.on('toggleFileTree', configActions.toggleSidebarVisible)
ipc.on('fontIncrease'  , configActions.increaseFontSize)
ipc.on('fontDecrease'  , configActions.decreaseFontSize)
ipc.on('saveFile'      , fileActions.save)
ipc.on('openFiles', files => {
    files.forEach(f => fileActions.openFile(f));
});


$(function() {
    $(document).on('selectstart', false);

    ReactDOM.render(<MainWindow />, document.querySelector('.main-wrap'));

    // Left sidebar resizing ----------------------------------------------------
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

    // Toggle maximized state of the window -------------------------------------
    $('.header').on('dblclick', function() {
        ipc.send('toggleMaximize');
    });

    // context menus ------------------------------------------------------------
    window.addEventListener('contextmenu', function(e) {
        if (!e.menuTemplate) {
            e.menuTemplate = []
        }
    }, true);

    window.addEventListener('contextmenu', function(e) {
        if (!e.defaultPrevented && e.menuTemplate) {
            // e.preventDefault();
            setTimeout(() => {
                Menu.buildFromTemplate(e.menuTemplate).popup(
                    remote.getCurrentWindow()
                );
            }, 50)
        }
    }, false);
});
