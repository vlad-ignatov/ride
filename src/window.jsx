import MainWindow from './components/MainWindow.jsx';
import { default as $ } from 'jquery';

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
        });
        return false;
    });

    $('.header').on('dblclick', function() {
        ipc.send('toggleMaximize');
    });
});
