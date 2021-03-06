/* global ReactDOM, ipc, Menu */
import MainWindow       from './components/MainWindow.jsx'
import { default as $ } from 'jquery'
import configActions    from './actions/config-actions'
import fileActions      from './actions/file-actions'
import remote           from 'remote'
import alt              from './alt'

window.alt = alt;

// Proxy comands from the main process app to the window
// ------------------------------------------------------------------------------
ipc.on('setSyntaxTheme', configActions.setEditorTheme);
ipc.on('toggleFileTree', configActions.toggleSidebarVisible);
ipc.on('fontIncrease'  , configActions.increaseFontSize);
ipc.on('fontDecrease'  , configActions.decreaseFontSize);
ipc.on('saveFile'      , fileActions.save);
ipc.on('openFiles', files => {
    files.forEach(f => fileActions.openFile(f));
});
ipc.on('fluxAction', function(actionsClass, actionName, ...rest) {
    console.log('fluxAction handler args: ', arguments);
    try {
        alt.actions[actionsClass][actionName](...rest);
    } catch (ex) {
        console.error(ex);
    }
});

$(function() {
    $(document).on('selectstart', false);

    ReactDOM.render(<MainWindow />, document.querySelector('.main-wrap'));

    // Load all the extension packages that are interested in working with the
    // borwser window
    // ------------------------------------------------------------------------------
    var pkg = require('../package.json');
    for (var name in pkg.ride.packages) {
        let ext;
        try {
            ext = require('../node_modules/' + name + '/ride-main-window.js');
            if (typeof ext == 'function') {
                ext.call(window);
            }
        } catch (ex) {
            console.error(ex);
        }
    }

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

    // native context menus and popup menus -------------------------------------
    window.addEventListener('contextmenu', function(e) {
        if (!e.menuTemplate) {
            e.menuTemplate = [];
        }
    }, true);

    window.addEventListener('click', function(e) {
        if (!e.menuTemplate) {
            e.menuTemplate = [];
        }
    }, true);

    window.addEventListener('contextmenu', function(e) {
        if (!e.defaultPrevented && e.menuTemplate && e.menuTemplate.length) {
            // setTimeout(() => {
                Menu.buildFromTemplate(e.menuTemplate).popup(
                    remote.getCurrentWindow()
                );
            // }, 50);
        }
    }, false);

    window.addEventListener('click', function(e) {
        if (!e.defaultPrevented && e.menuTemplate && e.menuTemplate.length) {
            e.preventDefault();
            setTimeout(() => {
                Menu.buildFromTemplate(e.menuTemplate).popup(
                    remote.getCurrentWindow()
                );
            }, 50);
        }
    }, false);

    // Prompt ------------------------------------------------------------------
    window.prompt = function prompt(msg, value) {
        return new Promise(function(resolve, reject) {
            var $prompt = $('#prompt');
            if (!$prompt.length) {
                $prompt = $(
                    `<div id="prompt" class="dialog" style="display: none">
                        <div class="prompt-message"></div>
                        <input type="text"/>
                    </div>`
                )
                .css({
                    position: 'absolute',
                    zIndex  : 1000,
                    top     : 60,
                    left    : '20%',
                    width   : '60%'
                })
                .appendTo('.main-stage');
            }

            $prompt.find('.prompt-message').html(msg || '');
            $prompt.show();
            $prompt.find('input')
            .val(value || '')
            .one('blur', function() {
                $(this).off();
                $prompt.hide();
                reject('No path selected');
            })
            .on('keydown', function(e) {
                var val = this.value.trim();
                if (val && e.keyCode == 13) {
                    $(this).off().trigger('blur');
                    $prompt.hide();
                    resolve(val);
                }
                else if (e.keyCode == 27) {
                    $(this).off().trigger('blur');
                    $prompt.hide();
                    reject('Action canceled');
                }
            });

            setTimeout(() => {
                let input = $prompt.find('input').trigger('focus'),
                    len   = input.val().length;
                input[0].selectionStart = len;
                input[0].selectionEnd = len;
                input.trigger('click');
            }, 20);
        });
    };

});
