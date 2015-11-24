/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _MainWindow = __webpack_require__(2);

	var _MainWindow2 = _interopRequireDefault(_MainWindow);

	var _jquery = __webpack_require__(34);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _configActions = __webpack_require__(26);

	var _configActions2 = _interopRequireDefault(_configActions);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	var _remote = __webpack_require__(35);

	var _remote2 = _interopRequireDefault(_remote);

	var _alt = __webpack_require__(8);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* global ReactDOM, ipc, Menu */

	window.alt = _alt2.default;

	// Proxy comands from the main process app to the window
	// ------------------------------------------------------------------------------
	ipc.on('setSyntaxTheme', _configActions2.default.setEditorTheme);
	ipc.on('toggleFileTree', _configActions2.default.toggleSidebarVisible);
	ipc.on('fontIncrease', _configActions2.default.increaseFontSize);
	ipc.on('fontDecrease', _configActions2.default.decreaseFontSize);
	ipc.on('saveFile', _fileActions2.default.save);
	ipc.on('openFiles', function (files) {
	    files.forEach(function (f) {
	        return _fileActions2.default.openFile(f);
	    });
	});
	ipc.on('fluxAction', function (actionsClass, actionName) {
	    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        rest[_key - 2] = arguments[_key];
	    }

	    console.log('fluxAction handler args: ', arguments);
	    try {
	        var _alt$actions$actionsC;

	        (_alt$actions$actionsC = _alt2.default.actions[actionsClass])[actionName].apply(_alt$actions$actionsC, rest);
	    } catch (ex) {
	        console.error(ex);
	    }
	});

	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('selectstart', false);

	    ReactDOM.render(React.createElement(_MainWindow2.default, null), document.querySelector('.main-wrap'));

	    // Load all the extension packages that are interested in working with the
	    // borwser window
	    // ------------------------------------------------------------------------------
	    var pkg = __webpack_require__(36);
	    for (var name in pkg.ride.packages) {
	        var ext = undefined;
	        try {
	            ext = __webpack_require__(37)("./" + name + '/ride-main-window.js');
	            if (typeof ext == 'function') {
	                ext.call(window);
	            }
	        } catch (ex) {
	            console.error(ex);
	        }
	    }

	    // Left sidebar resizing ----------------------------------------------------
	    var leftSidebar = (0, _jquery2.default)('.main-sidebar-left');
	    leftSidebar.find('> .resizer.vertical').on('mousedown', function (evt) {
	        var $resizer = (0, _jquery2.default)(this),
	            deltaX = evt.pageX - $resizer.offset().left,
	            winWidth = (0, _jquery2.default)(window).width(),
	            min = winWidth * 0.1,
	            max = winWidth * 0.9;

	        (0, _jquery2.default)('html').css('cursor', 'col-resize');
	        (0, _jquery2.default)('body').css({
	            cursor: 'col-resize',
	            pointerEvents: 'none'
	        });

	        (0, _jquery2.default)(window).on('mousemove.resizer', function (e) {
	            var x = Math.max(Math.min(e.pageX - deltaX, max), min);
	            leftSidebar.css({ width: x });
	            $resizer.css('left', x);
	            return false;
	        }).one('mouseup.resizer', function () {
	            (0, _jquery2.default)(window).off('.resizer');
	            (0, _jquery2.default)('html').css('cursor', 'default');
	            (0, _jquery2.default)('body').css({
	                cursor: 'default',
	                pointerEvents: 'auto'
	            });
	            _configActions2.default.setSidebarWidth(leftSidebar.outerWidth());
	        });
	        return false;
	    });

	    // Toggle maximized state of the window -------------------------------------
	    (0, _jquery2.default)('.header').on('dblclick', function () {
	        ipc.send('toggleMaximize');
	    });

	    // native context menus and popup menus -------------------------------------
	    window.addEventListener('contextmenu', function (e) {
	        if (!e.menuTemplate) {
	            e.menuTemplate = [];
	        }
	    }, true);

	    window.addEventListener('click', function (e) {
	        if (!e.menuTemplate) {
	            e.menuTemplate = [];
	        }
	    }, true);

	    window.addEventListener('contextmenu', function (e) {
	        if (!e.defaultPrevented && e.menuTemplate && e.menuTemplate.length) {
	            setTimeout(function () {
	                Menu.buildFromTemplate(e.menuTemplate).popup(_remote2.default.getCurrentWindow());
	            }, 50);
	        }
	    }, false);

	    window.addEventListener('click', function (e) {
	        if (!e.defaultPrevented && e.menuTemplate && e.menuTemplate.length) {
	            e.preventDefault();
	            setTimeout(function () {
	                Menu.buildFromTemplate(e.menuTemplate).popup(_remote2.default.getCurrentWindow());
	            }, 50);
	        }
	    }, false);
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _FileTree = __webpack_require__(4);

	var _Editor = __webpack_require__(21);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _TabBrowser = __webpack_require__(27);

	var _TabBrowser2 = _interopRequireDefault(_TabBrowser);

	var _ModeSelect = __webpack_require__(28);

	var _ModeSelect2 = _interopRequireDefault(_ModeSelect);

	var _fileStore = __webpack_require__(22);

	var _fileStore2 = _interopRequireDefault(_fileStore);

	var _configStore = __webpack_require__(25);

	var _configStore2 = _interopRequireDefault(_configStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* global ENV */
	__webpack_require__(29);

	var MainWindow = (function (_Component) {
	    _inherits(MainWindow, _Component);

	    function MainWindow() {
	        _classCallCheck(this, MainWindow);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainWindow).call(this));

	        _this.state = {
	            config: _configStore2.default.getState(),
	            openFiles: _fileStore2.default.getState()
	        };
	        _this._onChange = _this._onChange.bind(_this);
	        return _this;
	    }

	    _createClass(MainWindow, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _fileStore2.default.listen(this._onChange);
	            _configStore2.default.listen(this._onChange);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _fileStore2.default.unlisten(this._onChange);
	            _configStore2.default.unlisten(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            this.setState({
	                config: _configStore2.default.getState(),
	                openFiles: _fileStore2.default.getState()
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { style: { display: 'flex', height: '100%', flexDirection: 'column' } },
	                React.createElement(
	                    'div',
	                    { className: 'header', style: { textAlign: 'center' } },
	                    'React Editor'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-row' },
	                    this.state.config.leftSidebar.visible ? React.createElement(
	                        'div',
	                        { className: 'main-sidebar-left', style: { width: this.state.config.leftSidebar.width } },
	                        React.createElement(_FileTree.FileTree, { type: 'dir',
	                            path: ENV.HOME,
	                            name: ENV.HOME,
	                            openFiles: this.state.openFiles,
	                            selectedPath: this.state.openFiles.current ? this.state.openFiles.current.path : '',
	                            expanded: true }),
	                        React.createElement('div', { className: 'resizer vertical', style: { left: this.state.config.leftSidebar.width } })
	                    ) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'main-stage' },
	                        React.createElement(_TabBrowser2.default, null),
	                        React.createElement(
	                            'div',
	                            { className: 'main-inspector' },
	                            this.state.openFiles.current ? React.createElement(_Editor2.default, null) : ''
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-status-bar', style: { display: 'flex', flexDirection: 'row' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        this.state.openFiles.current ? this.state.openFiles.current.path : 'Nothing selected'
	                    ),
	                    React.createElement('span', { style: { flex: 1 } }),
	                    React.createElement(_ModeSelect2.default, { mode: this.state.openFiles.current ? this.state.openFiles.current.mode.caption : '' })
	                )
	            );
	        }
	    }]);

	    return MainWindow;
	})(_react.Component);

	exports.default = MainWindow;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FileTree = undefined;

	var _react = __webpack_require__(3);

	var _FileTreeItem = __webpack_require__(5);

	var _FileTreeItem2 = _interopRequireDefault(_FileTreeItem);

	var _fs = __webpack_require__(6);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * This is just a wrapper arround recursive structure of FileTreeItem
	 * components. It creates the outer-most UL element, reads the root directory
	 * and passes the state down the tree.
	 */

	var FileTree = exports.FileTree = (function (_Component) {
	    _inherits(FileTree, _Component);

	    function FileTree() {
	        _classCallCheck(this, FileTree);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(FileTree).apply(this, arguments));
	    }

	    _createClass(FileTree, [{
	        key: 'render',
	        value: function render() {
	            var type = _fs2.default.statSync(this.props.path).isDirectory() ? _FileTreeItem2.default.TYPE_DIR : _FileTreeItem2.default.TYPE_FILE;

	            return React.createElement(
	                'ul',
	                { className: 'file-tree' },
	                React.createElement(_FileTreeItem2.default, {
	                    path: this.props.path,
	                    name: this.props.name,
	                    type: type,
	                    expanded: this.props.expanded,
	                    selectedPath: this.props.selectedPath,
	                    openFiles: this.props.openFiles })
	            );
	        }
	    }]);

	    return FileTree;
	})(_react.Component);

	FileTree.propTypes = {
	    path: _react.PropTypes.string,
	    name: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool,
	    selectedPath: _react.PropTypes.string,
	    openFiles: _react.PropTypes.object
	};
	FileTree.defaultProps = {
	    path: '/',
	    name: 'Folder',
	    expanded: false,
	    selectedPath: ''
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _fs = __webpack_require__(6);

	var _fs2 = _interopRequireDefault(_fs);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FileTreeItem = (function (_Component) {
	    _inherits(FileTreeItem, _Component);

	    function FileTreeItem(props) {
	        _classCallCheck(this, FileTreeItem);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FileTreeItem).call(this, props));

	        _this3.onClick = _this3.onClick.bind(_this3);
	        _this3.dblClick = _this3.dblClick.bind(_this3);
	        _this3.state = {
	            expanded: props.expanded
	        };

	        _this3.state.expanded = props.type === FileTreeItem.TYPE_DIR && props.openFiles.files.some(function (f) {
	            return f.path && f.path.indexOf(props.path) === 0;
	        });
	        return _this3;
	    }

	    _createClass(FileTreeItem, [{
	        key: 'getChildren',
	        value: function getChildren() {
	            var _this = this;

	            var isDir = this.props.type == FileTreeItem.TYPE_DIR;
	            if (this.state.expanded && isDir) {
	                var files,
	                    items = [];

	                try {
	                    files = _fs2.default.readdirSync(this.props.path);
	                } catch (ex) {
	                    console.error(ex);
	                }

	                for (var i in files) {
	                    var path = (this.props.path == '/' ? '' : this.props.path) + '/' + files[i],
	                        stats;
	                    try {
	                        stats = _fs2.default.statSync(path);
	                    } catch (ex) {
	                        console.error(ex);
	                        break;
	                    }
	                    items.push({
	                        name: files[i],
	                        level: this.props.level + 1,
	                        selectedPath: this.props.selectedPath,
	                        path: path,
	                        key: path,
	                        type: stats.isDirectory() ? FileTreeItem.TYPE_DIR : FileTreeItem.TYPE_FILE
	                    });
	                }

	                // TODO: alpha sort too
	                items.sort(function (a, b) {
	                    return (a.type == FileTreeItem.TYPE_DIR ? 0 : 1) - (b.type == FileTreeItem.TYPE_DIR ? 0 : 1);
	                });

	                return React.createElement(
	                    'ul',
	                    null,
	                    items.map(function (item) {
	                        return React.createElement(FileTreeItem, _extends({}, item, { openFiles: _this.props.openFiles }));
	                    })
	                );
	            }

	            return null;
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            if (this.props.type == FileTreeItem.TYPE_DIR) {
	                this.setState({
	                    expanded: !this.state.expanded
	                });
	            } else _fileActions2.default.previewFile(this.props.path);
	        }
	    }, {
	        key: 'dblClick',
	        value: function dblClick() {
	            if (this.props.type == FileTreeItem.TYPE_FILE) {
	                _fileActions2.default.openFile(this.props.path);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var isDir = this.props.type == FileTreeItem.TYPE_DIR;
	            if (this.props.selectedPath === this.props.path) {
	                setTimeout(function () {
	                    _this2.refs.li.scrollIntoViewIfNeeded();
	                });
	            }
	            return React.createElement(
	                'li',
	                { key: this.props.path, ref: 'li', className: this.props.type + (this.state.expanded ? ' expanded' : '') + (this.props.selectedPath === this.props.path ? ' selected' : '') },
	                React.createElement(
	                    'div',
	                    { onClick: this.onClick,
	                        onDoubleClick: this.dblClick,
	                        style: { paddingLeft: this.props.level * 18, opacity: this.props.name.indexOf('.') === 0 ? 0.5 : 1 },
	                        tabIndex: '0' },
	                    React.createElement('span', { className: 'icon ' + (isDir ? this.state.expanded ? 'icon-folder-open' : 'icon-folder' : 'icon-file-text2') }),
	                    this.props.name || this.props.path
	                ),
	                this.getChildren()
	            );
	        }
	    }]);

	    return FileTreeItem;
	})(_react.Component);

	exports.default = FileTreeItem;
	FileTreeItem.propTypes = {
	    path: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool,
	    name: _react.PropTypes.string,
	    type: _react.PropTypes.string.isRequired,
	    level: _react.PropTypes.number,
	    selectedPath: _react.PropTypes.string,
	    openFiles: _react.PropTypes.object
	};
	FileTreeItem.TYPE_FILE = 'file';
	FileTreeItem.TYPE_DIR = 'dir';
	FileTreeItem.defaultProps = {
	    path: '/',
	    expanded: false,
	    level: 0,
	    selectedPath: '',
	    openFiles: { files: [] }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = fs;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _alt = __webpack_require__(8);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FileActions = (function () {
	    function FileActions() {
	        _classCallCheck(this, FileActions);

	        this.generateActions('closeFile', 'closeAll', 'closeAllBefore', 'closeAllAfter', 'closeOthers', 'closeSaved', 'setCurrentFile', 'setFileModified', 'setFileUnmodified', 'checkFileForModifications', 'save', 'newFile');
	    }

	    _createClass(FileActions, [{
	        key: 'openFile',
	        value: function openFile() {
	            var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            this.dispatch({ path: path });
	        }
	    }, {
	        key: 'previewFile',
	        value: function previewFile() {
	            var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            this.dispatch(path);
	        }
	    }, {
	        key: 'moveFile',
	        value: function moveFile(fromIndex, toIndex) {
	            this.dispatch({ fromIndex: fromIndex, toIndex: toIndex });
	        }
	    }, {
	        key: 'setMode',
	        value: function setMode(mode, id) {
	            this.dispatch({ mode: mode, id: id });
	        }
	    }]);

	    return FileActions;
	})();

	var filesActions = _alt2.default.createActions(FileActions);

	exports.default = filesActions;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(9);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var alt = new _alt2.default(); /** Just creates and exports the alt singleton instance */

	exports.default = alt;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* global window */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _bind = Function.prototype.bind;

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _flux = __webpack_require__(10);

	var _utilsStateFunctions = __webpack_require__(13);

	var StateFunctions = _interopRequireWildcard(_utilsStateFunctions);

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	var _store = __webpack_require__(15);

	var store = _interopRequireWildcard(_store);

	var _utilsAltUtils = __webpack_require__(16);

	var utils = _interopRequireWildcard(_utilsAltUtils);

	var _actions = __webpack_require__(20);

	var _actions2 = _interopRequireDefault(_actions);

	var Alt = (function () {
	  function Alt() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Alt);

	    this.config = config;
	    this.serialize = config.serialize || JSON.stringify;
	    this.deserialize = config.deserialize || JSON.parse;
	    this.dispatcher = config.dispatcher || new _flux.Dispatcher();
	    this.batchingFunction = config.batchingFunction || function (callback) {
	      return callback();
	    };
	    this.actions = { global: {} };
	    this.stores = {};
	    this.storeTransforms = config.storeTransforms || [];
	    this.trapAsync = false;
	    this._actionsRegistry = {};
	    this._initSnapshot = {};
	    this._lastSnapshot = {};
	  }

	  _createClass(Alt, [{
	    key: 'dispatch',
	    value: function dispatch(action, data, details) {
	      var _this = this;

	      this.batchingFunction(function () {
	        var id = Math.random().toString(18).substr(2, 16);

	        // support straight dispatching of FSA-style actions
	        if (action.hasOwnProperty('type') && action.hasOwnProperty('payload')) {
	          var fsaDetails = {
	            id: action.type,
	            namespace: action.type,
	            name: action.type
	          };
	          return _this.dispatcher.dispatch(utils.fsa(id, action.type, action.payload, fsaDetails));
	        }

	        if (action.id && action.dispatch) {
	          return utils.dispatch(id, action, data, _this);
	        }

	        return _this.dispatcher.dispatch(utils.fsa(id, action, data, details));
	      });
	    }
	  }, {
	    key: 'createUnsavedStore',
	    value: function createUnsavedStore(StoreModel) {
	      var key = StoreModel.displayName || '';
	      store.createStoreConfig(this.config, StoreModel);
	      var Store = store.transformStore(this.storeTransforms, StoreModel);

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);
	    }
	  }, {
	    key: 'createStore',
	    value: function createStore(StoreModel, iden) {
	      var key = iden || StoreModel.displayName || StoreModel.name || '';
	      store.createStoreConfig(this.config, StoreModel);
	      var Store = store.transformStore(this.storeTransforms, StoreModel);

	      /* istanbul ignore next */
	      if (false) delete this.stores[key];

	      if (this.stores[key] || !key) {
	        if (this.stores[key]) {
	          utils.warn('A store named ' + key + ' already exists, double check your store ' + 'names or pass in your own custom identifier for each store');
	        } else {
	          utils.warn('Store name was not specified');
	        }

	        key = utils.uid(this.stores, key);
	      }

	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      var storeInstance = fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);

	      this.stores[key] = storeInstance;
	      StateFunctions.saveInitialSnapshot(this, key);

	      return storeInstance;
	    }
	  }, {
	    key: 'generateActions',
	    value: function generateActions() {
	      var actions = { name: 'global' };

	      for (var _len3 = arguments.length, actionNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        actionNames[_key3] = arguments[_key3];
	      }

	      return this.createActions(actionNames.reduce(function (obj, action) {
	        obj[action] = utils.dispatchIdentity;
	        return obj;
	      }, actions));
	    }
	  }, {
	    key: 'createAction',
	    value: function createAction(name, implementation, obj) {
	      return (0, _actions2['default'])(this, 'global', name, implementation, obj);
	    }
	  }, {
	    key: 'createActions',
	    value: function createActions(ActionsClass) {
	      var _arguments2 = arguments,
	          _this2 = this;

	      var exportObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var actions = {};
	      var key = utils.uid(this._actionsRegistry, ActionsClass.displayName || ActionsClass.name || 'Unknown');

	      if (fn.isFunction(ActionsClass)) {
	        var _len4, argsForConstructor, _key4;

	        (function () {
	          fn.assign(actions, utils.getInternalMethods(ActionsClass, true));

	          var ActionsGenerator = (function (_ActionsClass) {
	            _inherits(ActionsGenerator, _ActionsClass);

	            function ActionsGenerator() {
	              _classCallCheck(this, ActionsGenerator);

	              for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                args[_key5] = arguments[_key5];
	              }

	              _get(Object.getPrototypeOf(ActionsGenerator.prototype), 'constructor', this).apply(this, args);
	            }

	            _createClass(ActionsGenerator, [{
	              key: 'generateActions',
	              value: function generateActions() {
	                for (var _len6 = arguments.length, actionNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	                  actionNames[_key6] = arguments[_key6];
	                }

	                actionNames.forEach(function (actionName) {
	                  actions[actionName] = utils.dispatchIdentity;
	                });
	              }
	            }]);

	            return ActionsGenerator;
	          })(ActionsClass);

	          for (_len4 = _arguments2.length, argsForConstructor = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	            argsForConstructor[_key4 - 2] = _arguments2[_key4];
	          }

	          fn.assign(actions, new (_bind.apply(ActionsGenerator, [null].concat(_toConsumableArray(argsForConstructor))))());
	        })();
	      } else {
	        fn.assign(actions, ActionsClass);
	      }

	      this.actions[key] = this.actions[key] || {};

	      fn.eachObject(function (actionName, action) {
	        if (!fn.isFunction(action)) {
	          return;
	        }

	        // create the action
	        exportObj[actionName] = (0, _actions2['default'])(_this2, key, actionName, action, exportObj);

	        // generate a constant
	        var constant = utils.formatAsConstant(actionName);
	        exportObj[constant] = exportObj[actionName].id;
	      }, [actions]);
	      return exportObj;
	    }
	  }, {
	    key: 'takeSnapshot',
	    value: function takeSnapshot() {
	      for (var _len7 = arguments.length, storeNames = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        storeNames[_key7] = arguments[_key7];
	      }

	      var state = StateFunctions.snapshot(this, storeNames);
	      fn.assign(this._lastSnapshot, state);
	      return this.serialize(state);
	    }
	  }, {
	    key: 'rollback',
	    value: function rollback() {
	      StateFunctions.setAppState(this, this.serialize(this._lastSnapshot), function (storeInst) {
	        storeInst.lifecycle('rollback');
	        storeInst.emitChange();
	      });
	    }
	  }, {
	    key: 'recycle',
	    value: function recycle() {
	      for (var _len8 = arguments.length, storeNames = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        storeNames[_key8] = arguments[_key8];
	      }

	      var initialSnapshot = storeNames.length ? StateFunctions.filterSnapshots(this, this._initSnapshot, storeNames) : this._initSnapshot;

	      StateFunctions.setAppState(this, this.serialize(initialSnapshot), function (storeInst) {
	        storeInst.lifecycle('init');
	        storeInst.emitChange();
	      });
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      var state = this.serialize(StateFunctions.snapshot(this));
	      this.recycle();
	      return state;
	    }
	  }, {
	    key: 'bootstrap',
	    value: function bootstrap(data) {
	      StateFunctions.setAppState(this, data, function (storeInst, state) {
	        storeInst.lifecycle('bootstrap', state);
	        storeInst.emitChange();
	      });
	    }
	  }, {
	    key: 'prepare',
	    value: function prepare(storeInst, payload) {
	      var data = {};
	      if (!storeInst.displayName) {
	        throw new ReferenceError('Store provided does not have a name');
	      }
	      data[storeInst.displayName] = payload;
	      return this.serialize(data);
	    }

	    // Instance type methods for injecting alt into your application as context

	  }, {
	    key: 'addActions',
	    value: function addActions(name, ActionsClass) {
	      for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
	        args[_key9 - 2] = arguments[_key9];
	      }

	      this.actions[name] = Array.isArray(ActionsClass) ? this.generateActions.apply(this, ActionsClass) : this.createActions.apply(this, [ActionsClass].concat(args));
	    }
	  }, {
	    key: 'addStore',
	    value: function addStore(name, StoreModel) {
	      for (var _len10 = arguments.length, args = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
	        args[_key10 - 2] = arguments[_key10];
	      }

	      this.createStore.apply(this, [StoreModel, name].concat(args));
	    }
	  }, {
	    key: 'getActions',
	    value: function getActions(name) {
	      return this.actions[name];
	    }
	  }, {
	    key: 'getStore',
	    value: function getStore(name) {
	      return this.stores[name];
	    }
	  }], [{
	    key: 'debug',
	    value: function debug(name, alt) {
	      var key = 'alt.js.org';
	      if (typeof window !== 'undefined') {
	        window[key] = window[key] || [];
	        window[key].push({ name: name, alt: alt });
	      }
	      return alt;
	    }
	  }]);

	  return Alt;
	})();

	exports['default'] = Alt;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(11)


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(12);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.setAppState = setAppState;
	exports.snapshot = snapshot;
	exports.saveInitialSnapshot = saveInitialSnapshot;
	exports.filterSnapshots = filterSnapshots;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	function setAppState(instance, data, onStore) {
	  var obj = instance.deserialize(data);
	  fn.eachObject(function (key, value) {
	    var store = instance.stores[key];
	    if (store) {
	      (function () {
	        var config = store.StoreModel.config;

	        var state = store.state;
	        if (config.onDeserialize) obj[key] = config.onDeserialize(value) || value;
	        if (fn.isMutableObject(state)) {
	          fn.eachObject(function (k) {
	            return delete state[k];
	          }, [state]);
	          fn.assign(state, obj[key]);
	        } else {
	          store.state = obj[key];
	        }
	        onStore(store, store.state);
	      })();
	    }
	  }, [obj]);
	}

	function snapshot(instance) {
	  var storeNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	  var stores = storeNames.length ? storeNames : Object.keys(instance.stores);
	  return stores.reduce(function (obj, storeHandle) {
	    var storeName = storeHandle.displayName || storeHandle;
	    var store = instance.stores[storeName];
	    var config = store.StoreModel.config;

	    store.lifecycle('snapshot');
	    var customSnapshot = config.onSerialize && config.onSerialize(store.state);
	    obj[storeName] = customSnapshot ? customSnapshot : store.getState();
	    return obj;
	  }, {});
	}

	function saveInitialSnapshot(instance, key) {
	  var state = instance.deserialize(instance.serialize(instance.stores[key].state));
	  instance._initSnapshot[key] = state;
	  instance._lastSnapshot[key] = state;
	}

	function filterSnapshots(instance, state, stores) {
	  return stores.reduce(function (obj, store) {
	    var storeName = store.displayName || store;
	    if (!state[storeName]) {
	      throw new ReferenceError(storeName + ' is not a valid store');
	    }
	    obj[storeName] = state[storeName];
	    return obj;
	  }, {});
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isMutableObject = isMutableObject;
	exports.isPromise = isPromise;
	exports.eachObject = eachObject;
	exports.assign = assign;
	var isFunction = function isFunction(x) {
	  return typeof x === 'function';
	};

	exports.isFunction = isFunction;

	function isMutableObject(target) {
	  var Ctor = target.constructor;

	  return !!target && typeof target === 'object' && !Object.isFrozen(target) && Object.prototype.toString.call(target) === '[object Object]' && isFunction(Ctor) && (Ctor instanceof Ctor || target.type === 'AltStore');
	}

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	function eachObject(f, o) {
	  o.forEach(function (from) {
	    Object.keys(Object(from)).forEach(function (key) {
	      f(key, from[key]);
	    });
	  });
	}

	function assign(target) {
	  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    source[_key - 1] = arguments[_key];
	  }

	  eachObject(function (key, value) {
	    return target[key] = value;
	  }, source);
	  return target;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _bind = Function.prototype.bind;

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports.createStoreConfig = createStoreConfig;
	exports.transformStore = transformStore;
	exports.createStoreFromObject = createStoreFromObject;
	exports.createStoreFromClass = createStoreFromClass;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsAltUtils = __webpack_require__(16);

	var utils = _interopRequireWildcard(_utilsAltUtils);

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	var _AltStore = __webpack_require__(17);

	var _AltStore2 = _interopRequireDefault(_AltStore);

	var _StoreMixin = __webpack_require__(19);

	var _StoreMixin2 = _interopRequireDefault(_StoreMixin);

	function doSetState(store, storeInstance, state) {
	  if (!state) {
	    return;
	  }

	  var config = storeInstance.StoreModel.config;

	  var nextState = fn.isFunction(state) ? state(storeInstance.state) : state;

	  storeInstance.state = config.setState.call(store, storeInstance.state, nextState);

	  if (!store.alt.dispatcher.isDispatching()) {
	    store.emitChange();
	  }
	}

	function createPrototype(proto, alt, key, extras) {
	  return fn.assign(proto, _StoreMixin2['default'], {
	    displayName: key,
	    alt: alt,
	    dispatcher: alt.dispatcher,
	    preventDefault: function preventDefault() {
	      this.getInstance().preventDefault = true;
	    },
	    boundListeners: [],
	    lifecycleEvents: {},
	    actionListeners: {},
	    actionListenerHandlers: {},
	    publicMethods: {},
	    handlesOwnErrors: false
	  }, extras);
	}

	function createStoreConfig(globalConfig, StoreModel) {
	  StoreModel.config = fn.assign({
	    getState: function getState(state) {
	      if (Array.isArray(state)) {
	        return state.slice();
	      } else if (fn.isMutableObject(state)) {
	        return fn.assign({}, state);
	      }

	      return state;
	    },
	    setState: function setState(currentState, nextState) {
	      if (fn.isMutableObject(nextState)) {
	        return fn.assign(currentState, nextState);
	      }
	      return nextState;
	    }
	  }, globalConfig, StoreModel.config);
	}

	function transformStore(transforms, StoreModel) {
	  return transforms.reduce(function (Store, transform) {
	    return transform(Store);
	  }, StoreModel);
	}

	function createStoreFromObject(alt, StoreModel, key) {
	  var storeInstance = undefined;

	  var StoreProto = createPrototype({}, alt, key, fn.assign({
	    getInstance: function getInstance() {
	      return storeInstance;
	    },
	    setState: function setState(nextState) {
	      doSetState(this, storeInstance, nextState);
	    }
	  }, StoreModel));

	  // bind the store listeners
	  /* istanbul ignore else */
	  if (StoreProto.bindListeners) {
	    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.bindListeners);
	  }
	  /* istanbul ignore else */
	  if (StoreProto.observe) {
	    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.observe(alt));
	  }

	  // bind the lifecycle events
	  /* istanbul ignore else */
	  if (StoreProto.lifecycle) {
	    fn.eachObject(function (eventName, event) {
	      _StoreMixin2['default'].on.call(StoreProto, eventName, event);
	    }, [StoreProto.lifecycle]);
	  }

	  // create the instance and fn.assign the public methods to the instance
	  storeInstance = fn.assign(new _AltStore2['default'](alt, StoreProto, StoreProto.state !== undefined ? StoreProto.state : {}, StoreModel), StoreProto.publicMethods, {
	    displayName: key,
	    config: StoreModel.config
	  });

	  return storeInstance;
	}

	function createStoreFromClass(alt, StoreModel, key) {
	  var storeInstance = undefined;
	  var config = StoreModel.config;

	  // Creating a class here so we don't overload the provided store's
	  // prototype with the mixin behaviour and I'm extending from StoreModel
	  // so we can inherit any extensions from the provided store.

	  var Store = (function (_StoreModel) {
	    _inherits(Store, _StoreModel);

	    function Store() {
	      _classCallCheck(this, Store);

	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).apply(this, args);
	    }

	    return Store;
	  })(StoreModel);

	  createPrototype(Store.prototype, alt, key, {
	    type: 'AltStore',
	    getInstance: function getInstance() {
	      return storeInstance;
	    },
	    setState: function setState(nextState) {
	      doSetState(this, storeInstance, nextState);
	    }
	  });

	  for (var _len = arguments.length, argsForClass = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    argsForClass[_key - 3] = arguments[_key];
	  }

	  var store = new (_bind.apply(Store, [null].concat(argsForClass)))();

	  if (config.bindListeners) store.bindListeners(config.bindListeners);
	  if (config.datasource) store.registerAsync(config.datasource);

	  storeInstance = fn.assign(new _AltStore2['default'](alt, store, store.state !== undefined ? store.state : store, StoreModel), utils.getInternalMethods(StoreModel), config.publicMethods, { displayName: key });

	  return storeInstance;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getInternalMethods = getInternalMethods;
	exports.warn = warn;
	exports.uid = uid;
	exports.formatAsConstant = formatAsConstant;
	exports.dispatchIdentity = dispatchIdentity;
	exports.fsa = fsa;
	exports.dispatch = dispatch;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	/*eslint-disable*/
	var builtIns = Object.getOwnPropertyNames(NoopClass);
	var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);
	/*eslint-enable*/

	function getInternalMethods(Obj, isProto) {
	  var excluded = isProto ? builtInProto : builtIns;
	  var obj = isProto ? Obj.prototype : Obj;
	  return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
	    if (excluded.indexOf(m) !== -1) {
	      return value;
	    }

	    value[m] = obj[m];
	    return value;
	  }, {});
	}

	function warn(msg) {
	  /* istanbul ignore else */
	  /*eslint-disable*/
	  if (typeof console !== 'undefined') {
	    console.warn(new ReferenceError(msg));
	  }
	  /*eslint-enable*/
	}

	function uid(container, name) {
	  var count = 0;
	  var key = name;
	  while (Object.hasOwnProperty.call(container, key)) {
	    key = name + String(++count);
	  }
	  return key;
	}

	function formatAsConstant(name) {
	  return name.replace(/[a-z]([A-Z])/g, function (i) {
	    return i[0] + '_' + i[1].toLowerCase();
	  }).toUpperCase();
	}

	function dispatchIdentity(x) {
	  for (var _len = arguments.length, a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    a[_key - 1] = arguments[_key];
	  }

	  this.dispatch(a.length ? [x].concat(a) : x);
	}

	function fsa(id, type, payload, details) {
	  return {
	    type: type,
	    payload: payload,
	    meta: _extends({
	      dispatchId: id
	    }, details),

	    id: id,
	    action: type,
	    data: payload,
	    details: details
	  };
	}

	function dispatch(id, actionObj, payload, alt) {
	  var data = actionObj.dispatch(payload);
	  if (data === undefined) return null;

	  var type = actionObj.id;
	  var namespace = type;
	  var name = type;
	  var details = { id: type, namespace: namespace, name: name };

	  var dispatchLater = function dispatchLater(x) {
	    return alt.dispatch(type, x, details);
	  };

	  if (fn.isFunction(data)) return data(dispatchLater, alt);

	  // XXX standardize this
	  return alt.dispatcher.dispatch(fsa(id, type, data, details));
	}

	/* istanbul ignore next */
	function NoopClass() {}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	var _transmitter = __webpack_require__(18);

	var _transmitter2 = _interopRequireDefault(_transmitter);

	var AltStore = (function () {
	  function AltStore(alt, model, state, StoreModel) {
	    var _this = this;

	    _classCallCheck(this, AltStore);

	    var lifecycleEvents = model.lifecycleEvents;
	    this.transmitter = (0, _transmitter2['default'])();
	    this.lifecycle = function (event, x) {
	      if (lifecycleEvents[event]) lifecycleEvents[event].push(x);
	    };
	    this.state = state;

	    this.alt = alt;
	    this.preventDefault = false;
	    this.displayName = model.displayName;
	    this.boundListeners = model.boundListeners;
	    this.StoreModel = StoreModel;
	    this.reduce = model.reduce || function (x) {
	      return x;
	    };

	    var output = model.output || function (x) {
	      return x;
	    };

	    this.emitChange = function () {
	      return _this.transmitter.push(output(_this.state));
	    };

	    var handleDispatch = function handleDispatch(f, payload) {
	      try {
	        return f();
	      } catch (e) {
	        if (model.handlesOwnErrors) {
	          _this.lifecycle('error', {
	            error: e,
	            payload: payload,
	            state: _this.state
	          });
	          return false;
	        }

	        throw e;
	      }
	    };

	    fn.assign(this, model.publicMethods);

	    // Register dispatcher
	    this.dispatchToken = alt.dispatcher.register(function (payload) {
	      _this.preventDefault = false;

	      _this.lifecycle('beforeEach', {
	        payload: payload,
	        state: _this.state
	      });

	      var actionHandlers = model.actionListeners[payload.action];

	      if (actionHandlers || model.otherwise) {
	        var result = undefined;

	        if (actionHandlers) {
	          result = handleDispatch(function () {
	            return actionHandlers.filter(Boolean).every(function (handler) {
	              return handler.call(model, payload.data, payload.action) !== false;
	            });
	          }, payload);
	        } else {
	          result = handleDispatch(function () {
	            return model.otherwise(payload.data, payload.action);
	          }, payload);
	        }

	        if (result !== false && !_this.preventDefault) _this.emitChange();
	      }

	      if (model.reduce) {
	        handleDispatch(function () {
	          var value = model.reduce(_this.state, payload);
	          if (value !== undefined) _this.state = value;
	        }, payload);
	        if (!_this.preventDefault) _this.emitChange();
	      }

	      _this.lifecycle('afterEach', {
	        payload: payload,
	        state: _this.state
	      });
	    });

	    this.lifecycle('init');
	  }

	  _createClass(AltStore, [{
	    key: 'listen',
	    value: function listen(cb) {
	      var _this2 = this;

	      if (!fn.isFunction(cb)) throw new TypeError('listen expects a function');
	      this.transmitter.subscribe(cb);
	      return function () {
	        return _this2.unlisten(cb);
	      };
	    }
	  }, {
	    key: 'unlisten',
	    value: function unlisten(cb) {
	      this.lifecycle('unlisten');
	      this.transmitter.unsubscribe(cb);
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      return this.StoreModel.config.getState.call(this, this.state);
	    }
	  }]);

	  return AltStore;
	})();

	exports['default'] = AltStore;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	function transmitter() {
	  var subscriptions = [];

	  var unsubscribe = function unsubscribe(onChange) {
	    var id = subscriptions.indexOf(onChange);
	    if (id >= 0) subscriptions.splice(id, 1);
	  };

	  var subscribe = function subscribe(onChange) {
	    subscriptions.push(onChange);
	    var dispose = function dispose() {
	      return unsubscribe(onChange);
	    };
	    return { dispose: dispose };
	  };

	  var push = function push(value) {
	    subscriptions.forEach(function (subscription) {
	      return subscription(value);
	    });
	  };

	  return { subscribe: subscribe, push: push, unsubscribe: unsubscribe };
	}

	module.exports = transmitter;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _transmitter = __webpack_require__(18);

	var _transmitter2 = _interopRequireDefault(_transmitter);

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	var StoreMixin = {
	  waitFor: function waitFor() {
	    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	      sources[_key] = arguments[_key];
	    }

	    if (!sources.length) {
	      throw new ReferenceError('Dispatch tokens not provided');
	    }

	    var sourcesArray = sources;
	    if (sources.length === 1) {
	      sourcesArray = Array.isArray(sources[0]) ? sources[0] : sources;
	    }

	    var tokens = sourcesArray.map(function (source) {
	      return source.dispatchToken || source;
	    });

	    this.dispatcher.waitFor(tokens);
	  },

	  exportAsync: function exportAsync(asyncMethods) {
	    this.registerAsync(asyncMethods);
	  },

	  registerAsync: function registerAsync(asyncDef) {
	    var _this = this;

	    var loadCounter = 0;

	    var asyncMethods = fn.isFunction(asyncDef) ? asyncDef(this.alt) : asyncDef;

	    var toExport = Object.keys(asyncMethods).reduce(function (publicMethods, methodName) {
	      var desc = asyncMethods[methodName];
	      var spec = fn.isFunction(desc) ? desc(_this) : desc;

	      var validHandlers = ['success', 'error', 'loading'];
	      validHandlers.forEach(function (handler) {
	        if (spec[handler] && !spec[handler].id) {
	          throw new Error(handler + ' handler must be an action function');
	        }
	      });

	      publicMethods[methodName] = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        var state = _this.getInstance().getState();
	        var value = spec.local && spec.local.apply(spec, [state].concat(args));
	        var shouldFetch = spec.shouldFetch ? spec.shouldFetch.apply(spec, [state].concat(args))
	        /*eslint-disable*/
	        : value == null;
	        /*eslint-enable*/
	        var intercept = spec.interceptResponse || function (x) {
	          return x;
	        };

	        var makeActionHandler = function makeActionHandler(action, isError) {
	          return function (x) {
	            var fire = function fire() {
	              loadCounter -= 1;
	              action(intercept(x, action, args));
	              if (isError) throw x;
	            };
	            return _this.alt.trapAsync ? function () {
	              return fire();
	            } : fire();
	          };
	        };

	        // if we don't have it in cache then fetch it
	        if (shouldFetch) {
	          loadCounter += 1;
	          /* istanbul ignore else */
	          if (spec.loading) spec.loading(intercept(null, spec.loading, args));
	          return spec.remote.apply(spec, [state].concat(args)).then(makeActionHandler(spec.success), makeActionHandler(spec.error, 1));
	        }

	        // otherwise emit the change now
	        _this.emitChange();
	        return value;
	      };

	      return publicMethods;
	    }, {});

	    this.exportPublicMethods(toExport);
	    this.exportPublicMethods({
	      isLoading: function isLoading() {
	        return loadCounter > 0;
	      }
	    });
	  },

	  exportPublicMethods: function exportPublicMethods(methods) {
	    var _this2 = this;

	    fn.eachObject(function (methodName, value) {
	      if (!fn.isFunction(value)) {
	        throw new TypeError('exportPublicMethods expects a function');
	      }

	      _this2.publicMethods[methodName] = value;
	    }, [methods]);
	  },

	  emitChange: function emitChange() {
	    this.getInstance().emitChange();
	  },

	  on: function on(lifecycleEvent, handler) {
	    if (lifecycleEvent === 'error') this.handlesOwnErrors = true;
	    var bus = this.lifecycleEvents[lifecycleEvent] || (0, _transmitter2['default'])();
	    this.lifecycleEvents[lifecycleEvent] = bus;
	    return bus.subscribe(handler.bind(this));
	  },

	  bindAction: function bindAction(symbol, handler) {
	    if (!symbol) {
	      throw new ReferenceError('Invalid action reference passed in');
	    }
	    if (!fn.isFunction(handler)) {
	      throw new TypeError('bindAction expects a function');
	    }

	    if (handler.length > 1) {
	      throw new TypeError('Action handler in store ' + this.displayName + ' for ' + ((symbol.id || symbol).toString() + ' was defined with ') + 'two parameters. Only a single parameter is passed through the ' + 'dispatcher, did you mean to pass in an Object instead?');
	    }

	    // You can pass in the constant or the function itself
	    var key = symbol.id ? symbol.id : symbol;
	    this.actionListeners[key] = this.actionListeners[key] || [];
	    this.actionListenerHandlers[key] = this.actionListenerHandlers[key] || [];

	    if (this.actionListenerHandlers[key].indexOf(handler) === -1) {
	      this.actionListenerHandlers[key].push(handler);
	      this.actionListeners[key].push(handler.bind(this));
	    }

	    this.boundListeners.push(key);
	  },

	  bindActions: function bindActions(actions) {
	    var _this3 = this;

	    fn.eachObject(function (action, symbol) {
	      var matchFirstCharacter = /./;
	      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
	        return 'on' + x[0].toUpperCase();
	      });

	      if (_this3[action] && _this3[assumedEventHandler]) {
	        // If you have both action and onAction
	        throw new ReferenceError('You have multiple action handlers bound to an action: ' + (action + ' and ' + assumedEventHandler));
	      }

	      var handler = _this3[action] || _this3[assumedEventHandler];
	      if (handler) {
	        _this3.bindAction(symbol, handler);
	      }
	    }, [actions]);
	  },

	  bindListeners: function bindListeners(obj) {
	    var _this4 = this;

	    fn.eachObject(function (methodName, symbol) {
	      var listener = _this4[methodName];

	      if (!listener) {
	        throw new ReferenceError(methodName + ' defined but does not exist in ' + _this4.displayName);
	      }

	      if (Array.isArray(symbol)) {
	        symbol.forEach(function (action) {
	          _this4.bindAction(action, listener);
	        });
	      } else {
	        _this4.bindAction(symbol, listener);
	      }
	    }, [obj]);
	  }
	};

	exports['default'] = StoreMixin;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = makeAction;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsFunctions = __webpack_require__(14);

	var fn = _interopRequireWildcard(_utilsFunctions);

	var _utilsAltUtils = __webpack_require__(16);

	var utils = _interopRequireWildcard(_utilsAltUtils);

	var AltAction = (function () {
	  function AltAction(alt, id, action, actions, actionDetails) {
	    _classCallCheck(this, AltAction);

	    this.id = id;
	    this._dispatch = action.bind(this);
	    this.actions = actions;
	    this.actionDetails = actionDetails;
	    this.alt = alt;
	  }

	  _createClass(AltAction, [{
	    key: 'dispatch',
	    value: function dispatch(data) {
	      this.dispatched = true;
	      this.alt.dispatch(this.id, data, this.actionDetails);
	    }
	  }]);

	  return AltAction;
	})();

	function makeAction(alt, namespace, name, implementation, obj) {
	  var id = utils.uid(alt._actionsRegistry, namespace + '.' + name);
	  alt._actionsRegistry[id] = 1;

	  var data = { id: id, namespace: namespace, name: name };

	  // Wrap the action so we can provide a dispatch method
	  var newAction = new AltAction(alt, id, implementation, obj, data);

	  var dispatch = function dispatch(payload) {
	    return alt.dispatch(id, payload, data);
	  };

	  // the action itself
	  var action = function action() {
	    newAction.dispatched = false;
	    var result = newAction._dispatch.apply(newAction, arguments);
	    // async functions that return promises should not be dispatched
	    if (!newAction.dispatched && result !== undefined && !fn.isPromise(result)) {
	      if (fn.isFunction(result)) {
	        result(dispatch, alt);
	      } else {
	        dispatch(result);
	      }
	    }

	    return result;
	  };
	  action.defer = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    setTimeout(function () {
	      newAction._dispatch.apply(null, args);
	    });
	  };
	  action.id = id;
	  action.data = data;

	  // ensure each reference is unique in the namespace
	  var container = alt.actions[namespace];
	  var namespaceId = utils.uid(container, name);
	  container[namespaceId] = action;

	  return action;
	}

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _fileStore = __webpack_require__(22);

	var _fileStore2 = _interopRequireDefault(_fileStore);

	var _configStore = __webpack_require__(25);

	var _configStore2 = _interopRequireDefault(_configStore);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global ace */

	var Editor = (function (_Component) {
	    _inherits(Editor, _Component);

	    function Editor(props) {
	        _classCallCheck(this, Editor);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).call(this, props));

	        _this.state = {
	            config: _configStore2.default.getState()
	        };
	        _this._onChange = _this._onChange.bind(_this);
	        return _this;
	    }

	    _createClass(Editor, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _fileStore2.default.unlisten(this._onChange);
	            _configStore2.default.unlisten(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            var cfg = _configStore2.default.getState();

	            this.editor.setTheme('ace/theme/' + cfg.editor.theme);
	            this.editor.setDisplayIndentGuides(false);
	            this.editor.setFontSize(this.state.config.editor.fontSize);
	            this.editor.setAnimatedScroll(this.state.config.editor.animatedScroll);
	            this.editor.setBehavioursEnabled(this.state.config.editor.autoPairing);
	            this.editor.setDisplayIndentGuides(this.state.config.editor.displayIndentGuides);
	            this.editor.setHighlightActiveLine(this.state.config.editor.highlightActiveLine);
	            this.editor.setHighlightGutterLine(this.state.config.editor.highlightGutterLine);
	            this.editor.setHighlightSelectedWord(this.state.config.editor.highlightSelectedWord);
	            this.editor.setShowPrintMargin(this.state.config.editor.showPrintMargin);
	            this.editor.setPrintMarginColumn(this.state.config.editor.printMarginColumn);
	            this.editor.setScrollSpeed(this.state.config.editor.scrollSpeed);
	            this.editor.setShowFoldWidgets(this.state.config.editor.showFoldWidgets);
	            this.editor.setShowInvisibles(this.state.config.editor.showInvisibles);

	            var currentFile = _fileStore2.default.getState().current;
	            if (currentFile && currentFile.session) {
	                this.editor.setSession(currentFile.session);
	            } else {
	                this.editor.setSession(ace.createEditSession(''));
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _fileStore2.default.listen(this._onChange);
	            _configStore2.default.listen(this._onChange);
	            this.editor = ace.edit(this.refs.wrapper);
	            this.editor.$blockScrolling = Infinity;
	            this._onChange();
	        }
	    }, {
	        key: 'onContextMenu',
	        value: function onContextMenu(e) {
	            e.nativeEvent.menuTemplate.push({ label: 'New File', click: function click() {
	                    _fileActions2.default.newFile();
	                } });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', { ref: 'wrapper', id: 'editor', onContextMenu: this.onContextMenu });
	        }
	    }]);

	    return Editor;
	})(_react.Component);

	exports.default = Editor;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /* global ace, fs */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _alt = __webpack_require__(8);

	var _alt2 = _interopRequireDefault(_alt);

	var _lib = __webpack_require__(23);

	var lib = _interopRequireWildcard(_lib);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var modelist = ace.require("ace/ext/modelist");

	var FilesStore = (function () {
	    function FilesStore() {
	        var _this = this;

	        _classCallCheck(this, FilesStore);

	        this.files = [];
	        this.current = null;

	        this.bindListeners({
	            handleFileAdded: _fileActions2.default.OPEN_FILE,
	            handleFileRemoved: _fileActions2.default.CLOSE_FILE,
	            handlePreviewFile: _fileActions2.default.PREVIEW_FILE,
	            handleSetCurrentFile: _fileActions2.default.SET_CURRENT_FILE,
	            handleFileModified: _fileActions2.default.SET_FILE_MODIFIED,
	            handleFileUnmodified: _fileActions2.default.SET_FILE_UNMODIFIED,
	            handleFileMoved: _fileActions2.default.MOVE_FILE,
	            handleFileSave: _fileActions2.default.SAVE,
	            handleCheckFile: _fileActions2.default.CHECK_FILE_FOR_MODIFICATIONS,
	            onCloseAll: _fileActions2.default.CLOSE_ALL,
	            onCloseAllBefore: _fileActions2.default.CLOSE_ALL_BEFORE,
	            onCloseAllAfter: _fileActions2.default.CLOSE_ALL_AFTER,
	            onCloseOthers: _fileActions2.default.CLOSE_OTHERS,
	            onCloseSaved: _fileActions2.default.CLOSE_SAVED,
	            onNewFile: _fileActions2.default.NEW_FILE,
	            onSetMode: _fileActions2.default.SET_MODE
	        });

	        this.on('init', function () {
	            var state = (0, _lib.readJSON5)('./src/session.json') || { files: [] };
	            state.files.forEach(function (f) {
	                // console.log(f)
	                _this.handleFileAdded(f);
	            });
	            if (state.current) {
	                _this.handleSetCurrentFile(_this.findByPath(state.current).id);
	            }
	            // this.__is_loaded = true
	        });
	    }

	    _createClass(FilesStore, [{
	        key: 'isPathOpened',
	        value: function isPathOpened(path) {
	            return this.files.some(function (f) {
	                return f.path == path;
	            });
	        }
	    }, {
	        key: 'findAllByPath',
	        value: function findAllByPath(path) {
	            return this.files.filter(function (f) {
	                return f.path == path;
	            });
	        }
	    }, {
	        key: 'findByPath',
	        value: function findByPath(path) {
	            return this.findAllByPath(path)[0];
	        }
	    }, {
	        key: 'byId',
	        value: function byId(id) {
	            return this.files.filter(function (f) {
	                return f.id === id;
	            })[0];
	        }
	    }, {
	        key: 'saveToSession',
	        value: function saveToSession() {
	            if (this.__ignore_save__) {
	                return;
	            }
	            var json = {
	                files: this.files.map(function (f) {
	                    return {
	                        path: f.path,
	                        isPreview: f.isPreview,
	                        mode: f.mode
	                    };
	                }),
	                current: this.current ? this.current.path : null
	            };
	            (0, _lib.writeJSON)('./src/session.json', json, 4);
	        }

	        // handlers ------------------------------------------------------------------

	    }, {
	        key: 'onCloseAll',
	        value: function onCloseAll() {
	            this.files = this.files.filter(function (f) {
	                f.session.removeAllListeners();
	                f.session.destroy();
	                return false;
	            });
	            this.current = null;
	            this.saveToSession();
	        }
	    }, {
	        key: 'onCloseAllBefore',
	        value: function onCloseAllBefore(id) {
	            var found = false;
	            this.files = this.files.filter(function (f) {
	                if (found) {
	                    return true;
	                }
	                if (f.id === id) {
	                    found = true;
	                    return true;
	                }
	                f.session.removeAllListeners();
	                f.session.destroy();
	                return false;
	            });
	            this.saveToSession();
	        }
	    }, {
	        key: 'onCloseAllAfter',
	        value: function onCloseAllAfter(id) {
	            for (var i = this.files.length - 1, f; i >= 0; i--) {
	                f = this.files[i];
	                if (f.id === id) {
	                    break;
	                }
	                this.handleFileRemoved(f.id);
	            }
	        }
	    }, {
	        key: 'onCloseOthers',
	        value: function onCloseOthers(id) {
	            var _this2 = this;

	            // this.__ignore_save__ = true
	            this.files = this.files.filter(function (f) {
	                if (f.id === id) {
	                    return true;
	                }
	                _this2.handleFileRemoved(f.id);
	                // f.session.removeAllListeners();
	                // f.session.destroy();
	                return false;
	            });
	            // this.__ignore_save__ = false
	            this.saveToSession();
	        }
	    }, {
	        key: 'onCloseSaved',
	        value: function onCloseSaved() {
	            for (var i = this.files.length - 1, f; i >= 0; i--) {
	                f = this.files[i];
	                if (!f.modified) {
	                    this.handleFileRemoved(f.id);
	                }
	            }
	        }
	    }, {
	        key: 'onNewFile',
	        value: function onNewFile() {
	            this.handleFileAdded({
	                path: '',
	                isPreview: true
	            });
	        }
	    }, {
	        key: 'onSetMode',
	        value: function onSetMode(_ref) {
	            var mode = _ref.mode;
	            var id = _ref.id;

	            var item = id ? this.byId(id) : this.current;
	            if (item) {
	                item.mode = mode;
	                item.session.setMode(mode.mode);
	                this.saveToSession();
	            }
	        }
	    }, {
	        key: 'handleFileAdded',
	        value: function handleFileAdded(_ref2) {
	            var _this3 = this;

	            var path = _ref2.path;
	            var isPreview = _ref2.isPreview;
	            var mode = _ref2.mode;

	            // This path is already opened just switch to it insteat of re-opening
	            if (path && this.isPathOpened(path)) {
	                this.current = this.findByPath(path);
	                this.current.isPreview = !!isPreview;
	            } else {
	                var _ret = (function () {
	                    mode = mode || (path ? modelist.getModeForPath(path) : 'ace/mode/text');
	                    var text = '';

	                    if (path) {
	                        try {
	                            text = fs.readFileSync(path, 'utf8');
	                        } catch (err) {
	                            console.error(err);
	                            return {
	                                v: undefined
	                            };
	                        }
	                    }

	                    var entry = {
	                        id: lib.uid(),
	                        path: path,
	                        hash: lib.md5(text),
	                        session: ace.createEditSession(text, mode.mode),
	                        mode: mode,
	                        isPreview: !!isPreview,
	                        modified: false
	                    };
	                    // console.log(modelist.getModeForPath(path))

	                    entry.session.on("change", function () {
	                        _fileActions2.default.checkFileForModifications(entry.id);
	                    });

	                    // Close the existing reusable session (if any)
	                    _this3.files = _this3.files.filter(function (o) {
	                        return !o.isPreview;
	                    });

	                    _this3.files.push(entry);

	                    _this3.current = entry;
	                })();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	            this.saveToSession();
	            return this.current;
	        }
	    }, {
	        key: 'handlePreviewFile',
	        value: function handlePreviewFile(path) {
	            this.handleFileAdded({
	                path: path,
	                isPreview: true
	            });
	        }
	    }, {
	        key: 'handleFileRemoved',
	        value: function handleFileRemoved(id) {
	            var idx = this.files.findIndex(function (f) {
	                return f.id === id;
	            });
	            if (idx > -1) {
	                var meta = this.files[idx];
	                meta.session.removeAllListeners();
	                meta.session.destroy();
	                this.files.splice(idx, 1);
	                if (this.current && this.current.id == meta.id) {
	                    this.current = null;
	                    var len = this.files.length;
	                    if (len) {
	                        var next = idx - 1;
	                        if (next < 0) {
	                            next = this.files.length - 1;
	                        }
	                        if (next >= 0 && next < this.files.length) {
	                            next = this.files[next];
	                        } else {
	                            next = null;
	                        }
	                        this.current = next;
	                    }
	                }
	            }
	            this.saveToSession();
	        }
	    }, {
	        key: 'handleSetCurrentFile',
	        value: function handleSetCurrentFile(id) {
	            this.current = this.byId(id);
	            this.saveToSession();
	        }
	    }, {
	        key: 'handleFileModified',
	        value: function handleFileModified(path) {
	            this.findAllByPath(path).forEach(function (f) {
	                f.modified = true;
	            });
	        }
	    }, {
	        key: 'handleFileUnmodified',
	        value: function handleFileUnmodified(path) {
	            this.findAllByPath(path).forEach(function (f) {
	                f.modified = false;
	            });
	        }
	    }, {
	        key: 'handleFileMoved',
	        value: function handleFileMoved(_ref3) {
	            var fromIndex = _ref3.fromIndex;
	            var toIndex = _ref3.toIndex;

	            this.files.splice(toIndex, 0, this.files.splice(fromIndex, 1));
	            this.saveToSession();
	        }
	    }, {
	        key: 'handleCheckFile',
	        value: function handleCheckFile(id) {
	            var entry = this.byId(id);
	            if (entry.path) {
	                this.findAllByPath(entry.path).forEach(function (f) {
	                    f.modified = lib.md5(f.session.getValue()) !== f.hash;
	                });
	            } else {
	                entry.modified = lib.md5(entry.session.getValue()) !== entry.hash;
	            }
	        }
	    }, {
	        key: 'handleFileSave',
	        value: function handleFileSave() {
	            if (!this.current) {
	                throw new Error('No "current" file to save');
	            }

	            var text = this.current.session.getValue();
	            if (lib.writeFile(this.current.path, text)) {
	                this.current.modified = false;
	                this.current.hash = lib.md5(text);
	                this.current.isPreview = false;
	            }
	        }
	    }]);

	    return FilesStore;
	})();

	var filesStore = _alt2.default.createStore(FilesStore, 'FilesStore');

	exports.default = filesStore;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global ace, fs */

	var fs = __webpack_require__(6);
	var Crypto = __webpack_require__(24);

	var uid = (function () {
	    var uid_counter = 1;
	    return function () {
	        return 'uid_' + uid_counter++;
	    };
	})();

	function md5(str) {
	    return Crypto.createHash('md5').update(str).digest("hex");
	}

	function writeFile(path, contents, encoding) {
	    if (path) {
	        try {
	            fs.writeFileSync(path, contents, encoding || 'utf8');
	            return true;
	        } catch (ex) {
	            // remote.require('dialog').showMessageBox(null, {
	            //     type   : 'error',
	            //     title  : 'Error writing file',
	            //     message: ex.message,
	            //     detail : ex.stack
	            // });
	            console.error(ex);
	        }
	    }
	    return false;
	}

	function readJSON5(path) {
	    try {
	        var input = fs.readFileSync(path, 'utf8');
	        input = input.replace(/\/\/.*?$/gm, '');
	        input = input.replace(/\/\*.*?\*\//g, '');
	        return JSON.parse(input);
	    } catch (ex) {
	        console.error(ex);
	    }
	    return null;
	}

	function writeJSON(path, json, pretty) {
	    try {
	        fs.writeFileSync(path, JSON.stringify(json, null, pretty || 0), 'utf8');
	    } catch (ex) {
	        console.error(ex);
	    }
	}

	module.exports = {
	    writeJSON: writeJSON,
	    readJSON5: readJSON5,
	    writeFile: writeFile,
	    md5: md5,
	    uid: uid
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = Crypto;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /* global fs, jQuery */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _alt = __webpack_require__(8);

	var _alt2 = _interopRequireDefault(_alt);

	var _configActions = __webpack_require__(26);

	var _configActions2 = _interopRequireDefault(_configActions);

	var _lib = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FILE = './src/config.json';
	var INTERNAL_SAVE = false;

	function write(state) {
	    INTERNAL_SAVE = true;
	    (0, _lib.writeJSON)(FILE, state, 4);
	    INTERNAL_SAVE = false;
	}

	var ConfigStore = (function () {
	    function ConfigStore() {
	        var _this = this;

	        _classCallCheck(this, ConfigStore);

	        var watcher;

	        this.bindListeners({
	            handleInvoke: _configActions2.default.INVOKE,
	            handleSetSidebarWidth: _configActions2.default.SET_SIDEBAR_WIDTH,
	            handleSetSidebarVisible: _configActions2.default.SET_SIDEBAR_VISIBLE,
	            handleToggleSidebarVisible: _configActions2.default.TOGGLE_SIDEBAR_VISIBLE,
	            handleSetEditorTheme: _configActions2.default.SET_EDITOR_THEME,
	            handleIncreaseFontSize: _configActions2.default.INCREASE_FONT_SIZE,
	            handleDecreaseFontSize: _configActions2.default.DECREASE_FONT_SIZE
	        });

	        this.on('init', function () {
	            watcher = fs.watch(FILE, function (event) {
	                if (event == 'change' && !INTERNAL_SAVE) {
	                    _this.setState((0, _lib.readJSON5)(FILE));
	                }
	            });
	        });

	        window.addEventListener('beforeunload', function () {
	            if (watcher) {
	                watcher.close();
	            }
	        }, false);
	    }

	    _createClass(ConfigStore, [{
	        key: 'handleInvoke',
	        value: function handleInvoke(_ref) {
	            var commandId = _ref.commandId;
	            var args = _ref.args;

	            return this[commandId].apply(this, _toConsumableArray(args));
	        }
	    }, {
	        key: 'handleSetSidebarWidth',
	        value: function handleSetSidebarWidth(width) {
	            this.setState({
	                leftSidebar: {
	                    width: width
	                }
	            });
	        }
	    }, {
	        key: 'handleSetSidebarVisible',
	        value: function handleSetSidebarVisible(visible) {
	            this.setState({
	                leftSidebar: {
	                    visible: visible
	                }
	            });
	        }
	    }, {
	        key: 'handleToggleSidebarVisible',
	        value: function handleToggleSidebarVisible() {
	            this.setState({
	                leftSidebar: {
	                    visible: !this.leftSidebar.visible
	                }
	            });
	        }
	    }, {
	        key: 'handleSetEditorTheme',
	        value: function handleSetEditorTheme(theme) {
	            this.setState({
	                editor: {
	                    theme: theme
	                }
	            });
	        }
	    }, {
	        key: 'handleIncreaseFontSize',
	        value: function handleIncreaseFontSize() {
	            this.setState({
	                editor: {
	                    fontSize: Math.min(this.editor.fontSize + 1, 50)
	                }
	            });
	        }
	    }, {
	        key: 'handleDecreaseFontSize',
	        value: function handleDecreaseFontSize() {
	            this.setState({
	                editor: {
	                    fontSize: Math.max(this.editor.fontSize - 1, 6)
	                }
	            });
	        }
	    }]);

	    return ConfigStore;
	})();

	ConfigStore.config = {

	    /**
	     * setState is used internally by Alt to set the state. You can override
	     * this to provide your own setState implementation. Internally, setState
	     * is an alias for Object.assign. setState must return an object.
	     */

	    setState: function setState(currentState, nextState) {
	        var state = jQuery.extend(true, currentState, nextState);
	        write(state);
	        return state;
	    }
	};

	var configStore = _alt2.default.createStore(ConfigStore, 'ConfigStore');

	_alt2.default.bootstrap(JSON.stringify({
	    ConfigStore: (0, _lib.readJSON5)(FILE)
	}));

	exports.default = configStore;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _alt = __webpack_require__(8);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConfigActions = (function () {
	    function ConfigActions() {
	        _classCallCheck(this, ConfigActions);

	        this.generateActions('reload', 'save', 'mixin', 'setSidebarWidth', 'setSidebarVisible', 'toggleSidebarVisible', 'setEditorTheme', 'increaseFontSize', 'decreaseFontSize');
	    }

	    _createClass(ConfigActions, [{
	        key: 'invoke',
	        value: function invoke(commandId) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            this.dispatch({
	                commandId: commandId,
	                args: args
	            });
	        }
	    }]);

	    return ConfigActions;
	})();

	var configActions = _alt2.default.createActions(ConfigActions);
	exports.default = configActions;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	var _fileStore = __webpack_require__(22);

	var _fileStore2 = _interopRequireDefault(_fileStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabBrowser = (function (_Component) {
	    _inherits(TabBrowser, _Component);

	    function TabBrowser() {
	        _classCallCheck(this, TabBrowser);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TabBrowser).call(this));

	        _this2.state = _fileStore2.default.getState();
	        _this2.onOpenedFilesChange = _this2.onOpenedFilesChange.bind(_this2);
	        return _this2;
	    }

	    _createClass(TabBrowser, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _fileStore2.default.listen(this.onOpenedFilesChange);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _fileStore2.default.unlisten(this.onOpenedFilesChange);
	        }
	    }, {
	        key: 'onOpenedFilesChange',
	        value: function onOpenedFilesChange() {
	            this.setState(_fileStore2.default.getState());
	        }
	    }, {
	        key: 'closeFile',
	        value: function closeFile(id, e) {
	            e.stopPropagation();
	            _fileActions2.default.closeFile(id);
	        }
	    }, {
	        key: 'setCurrentFile',
	        value: function setCurrentFile(id) {
	            _fileActions2.default.setCurrentFile(id);
	        }
	    }, {
	        key: 'onContextMenu',
	        value: function onContextMenu(file, e) {
	            this.setCurrentFile(file.id);
	            e.nativeEvent.menuTemplate.push({ label: 'Close Tab', click: function click() {
	                    return _fileActions2.default.closeFile(file.id);
	                } }, { type: 'separator' }, { label: 'Close Other Tabs', click: function click() {
	                    return _fileActions2.default.closeOthers(file.id);
	                } }, { label: 'Close Saved Tabs', click: function click() {
	                    return _fileActions2.default.closeSaved();
	                } }, { label: 'Close Tabs to the Left', click: function click() {
	                    return _fileActions2.default.closeAllBefore(file.id);
	                } }, { label: 'Close Tabs to the Right', click: function click() {
	                    return _fileActions2.default.closeAllAfter(file.id);
	                } }, { type: 'separator' }, { label: 'Close All Tabs', click: function click() {
	                    return _fileActions2.default.closeAll();
	                } });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var files = this.state.files.map(function (f) {
	                var file = f.path;
	                return React.createElement(
	                    'div',
	                    { className: 'tab' + (_this.state.current && _this.state.current === f ? ' active' : '') + (f.isPreview ? ' preview' : '') + (f.modified ? ' modified' : ''),
	                        key: f.id,
	                        title: file,
	                        onMouseDown: _this.setCurrentFile.bind(_this, f.id),
	                        onContextMenu: _this.onContextMenu.bind(_this, f) },
	                    React.createElement('span', { className: 'close-tab icon icon-close',
	                        title: 'Close Tab',
	                        onClick: _this.closeFile.bind(_this, f.id) }),
	                    file.substr(file.lastIndexOf('/') + 1)
	                );
	            });

	            return React.createElement(
	                'div',
	                { className: 'main-tabs' },
	                files
	            );
	        }
	    }]);

	    return TabBrowser;
	})(_react.Component);

	exports.default = TabBrowser;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _fileActions = __webpack_require__(7);

	var _fileActions2 = _interopRequireDefault(_fileActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global ace */

	var modelist = ace.require("ace/ext/modelist");

	var ModeSelect = (function (_Component) {
	    _inherits(ModeSelect, _Component);

	    function ModeSelect() {
	        _classCallCheck(this, ModeSelect);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ModeSelect).apply(this, arguments));
	    }

	    _createClass(ModeSelect, [{
	        key: 'onClick',
	        value: function onClick(e) {
	            e.nativeEvent.menuTemplate = e.nativeEvent.menuTemplate.concat(modelist.modes.map(function (m) {
	                return {
	                    label: m.caption,
	                    click: function click() {
	                        _fileActions2.default.setMode(m);
	                    }
	                };
	            }));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'a',
	                { onClick: this.onClick.bind(this), href: 'javascript:void 0' },
	                this.props.mode
	            );
	        }
	    }]);

	    return ModeSelect;
	})(_react.Component);

	exports.default = ModeSelect;
	ModeSelect.propTypes = {
	    mode: _react.PropTypes.string
	};
	ModeSelect.defaultProps = {
	    mode: 'text'
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n}\nhtml {\n  overflow: hidden;\n  height: 100%;\n  background: #2F3129;\n  color: #797A75;\n}\nbody {\n  font: menu;\n  background: #2F3129;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  cursor: default;\n  color: #797A75;\n  -webkit-app-region: drag;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n}\n@font-face {\n  font-family: 'icomoon';\n  src: url(" + __webpack_require__(32) + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n.icon {\n  font-family: 'icomoon';\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.icon-cancel:before {\n  content: \"\\E205\";\n}\n.icon-close:before {\n  content: \"\\E209\";\n}\n.icon-folder:before {\n  content: \"\\F07B\";\n}\n.icon-folder-open:before {\n  content: \"\\F07C\";\n}\n.icon-folder-o:before {\n  content: \"\\F114\";\n}\n.icon-folder-open-o:before {\n  content: \"\\F115\";\n}\n.icon-pencil-square:before {\n  content: \"\\F14B\";\n}\n.icon-file-text2:before {\n  content: \"\\E900\";\n}\n.icon-radio-checked2:before {\n  content: \"\\E901\";\n}\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n::-webkit-scrollbar-button {\n  width: 0px;\n  height: 0px;\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(200, 200, 200, 0.1);\n  border-radius: 5px;\n  box-shadow: 0 0 1px 0px rgba(255, 255, 255, 0.16) inset;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(200, 200, 200, 0.3);\n  width: 12px;\n  height: 12px;\n}\n::-webkit-scrollbar-thumb:active {\n  background: rgba(200, 200, 200, 0.5);\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n/*::-webkit-scrollbar-track:hover {\n  background: rgba(200, 200, 200, 0.05);\n}\n::-webkit-scrollbar-track:active {\n  background: #333333;\n}*/\n::-webkit-scrollbar-corner {\n  background: transparent;\n}\n/*div, iframe {\n    box-shadow: 0 0 0 0.5px #CCC;\n}*/\n.main-wrap {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.main-row {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  background: #1E1F18;\n  -webkit-app-region: no-drag;\n}\n.main-sidebar-left {\n  padding: 3px;\n  width: 300px;\n  border-right: 1px solid rgba(0, 0, 0, 0.4);\n  overflow: overlay;\n  position: relative;\n}\n.main-stage {\n  display: flex;\n  flex: 5;\n  flex-direction: column;\n  position: relative;\n}\n.main-tabs {\n  display: flex;\n  flex-direction: row;\n  height: 2.2em;\n  background: linear-gradient(#1E1F1A, #272822);\n  position: relative;\n  padding-bottom: 3px;\n}\n.main-tabs::after {\n  content: '';\n  height: 3px;\n  display: block;\n  background: #2F3129;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  width: 100%;\n  margin-top: -3px;\n  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.5);\n  z-index: 3;\n}\n.main-tabs .tab {\n  flex: 1;\n  position: relative;\n  z-index: 2;\n  padding: 4px 8px;\n  max-width: 40%;\n  border-radius: 3px 3px 0 0;\n  box-shadow: 0px -1px 0px 1px #1E1F18, 0 1px 2px -2px rgba(255, 255, 255, 0.5) inset, 0 -17px 16px -7px rgba(0, 0, 0, 0.2) inset;\n  margin: 1px 2px 0 0;\n  background: #2F3129;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-shadow: 0px -1px 0px #000;\n}\n.main-tabs .tab:hover {\n  background: #34372e;\n  color: #fff;\n}\n.main-tabs .tab.active {\n  box-shadow: 0px -1px 0px 1px #1E1F18, 0 2px 1px -2px rgba(255, 255, 255, 0.8) inset, 0 10px 0 -8px rgba(255, 135, 0, 0.4) inset, 0 -17px 16px -7px rgba(0, 0, 0, 0.2) inset;\n  background: linear-gradient(#4a4d40, #3c3f35);\n  color: #fff;\n  z-index: 4;\n}\n.main-tabs .tab.preview {\n  font-style: italic;\n  text-shadow: none;\n}\n.main-tabs .tab.modified {\n  color: orange;\n}\n.main-tabs .tab .close-tab {\n  float: right;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 2px;\n  margin: 1px -3px auto 3px;\n  font-size: 14px;\n  line-height: 16px;\n  text-align: center;\n  padding: 0;\n  position: relative;\n  z-index: 2;\n  opacity: 0.5;\n  color: rgba(255, 255, 255, 0.4);\n  transition: all 0.2s;\n}\n.main-tabs .tab .close-tab:hover {\n  background: rgba(0, 0, 0, 0.3);\n  color: #fff;\n  opacity: 1;\n}\n.main-tabs .tab .close-tab:active {\n  box-shadow: 1px 1px 2px #000 inset;\n}\n.main-tabs .tab.modified .close-tab:not(:hover) {\n  opacity: 1;\n}\n.main-tabs .tab.modified .close-tab:not(:hover)::before {\n  content: '\\F14B';\n  color: orange;\n  text-shadow: 0px 0px 1px #000;\n}\n.main-frame {\n  display: flex;\n  flex: 5;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  box-sizing: border-box;\n}\n.main-inspector {\n  display: flex;\n  flex: 5;\n  position: relative;\n  background: #272822;\n}\n.main-sidebar-right {\n  display: flex;\n  padding: 4px;\n  flex: 2;\n  border-left: 1px solid rgba(255, 255, 255, 0.1);\n  overflow: auto;\n}\n.main-status-bar {\n  display: flex;\n  padding: 0 4px 1px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  -webkit-app-region: drag;\n}\n.header {\n  height: 23px;\n  line-height: 22px;\n  font-size: 14px;\n  text-shadow: 0 0 1px #000;\n  color: #ccc;\n  border-bottom: 1px solid #111;\n  position: relative;\n  z-index: 5;\n}\n#editor {\n  position: absolute;\n  border-top: 1px solid #000;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-font-smoothing: subpixel-antialiased;\n  font-family: \"Roboto Mono\", \"Source Code Pro\", Menlo;\n  text-rendering: optimizeLegibility;\n  font-size: 14px;\n}\n#editor.ace_dark {\n  font-weight: 300;\n  text-shadow: 0 0.5px 0.5px #000000;\n  /*opacity: 0.8;*/\n}\n#editor.ace-ambiance .ace_gutter {\n  color: #000 !important;\n  font-weight: 400;\n}\n#editor.ace-ambiance .ace_marker-layer .ace_selected-word {\n  border-width: 1px;\n}\n#editor .ace_comment {\n  font-weight: 400;\n  letter-spacing: 0.025ex;\n}\n#editor.ace-twilight .ace_fold {\n  background-color: #2f3129;\n  border-color: #ab8657;\n}\n.file-tree,\n.file-tree ul {\n  margin: 0;\n  padding: 0;\n  display: table;\n  min-width: 100%;\n}\n.file-tree .icon {\n  display: inline-block;\n  vertical-align: top;\n  width: 20px;\n  height: 20px;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: left;\n  margin-right: 4px;\n}\n.file-tree .icon.icon-folder-open,\n.file-tree .icon.icon-folder {\n  color: rgba(169, 142, 76, 0.7);\n}\n.file-tree .icon.icon-file-text2 {\n  color: rgba(141, 163, 171, 0.7);\n}\n.file-tree li {\n  white-space: nowrap;\n  display: block;\n  min-width: 100%;\n}\n.file-tree li > div {\n  min-width: 100%;\n  display: inline-block;\n  padding-right: 4px;\n  position: relative;\n  z-index: 2;\n  border-radius: 2px;\n  line-height: 20px;\n}\n.file-tree li > div:before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 5px;\n  border-color: transparent;\n  border-style: inset inset inset solid;\n  position: relative;\n  display: inline-block;\n  margin: 0px 3px 0px 9px;\n}\n.file-tree li.dir > div:before {\n  border-color: transparent transparent transparent #666;\n}\n.file-tree li.expanded > div:before {\n  border-color: #666 transparent transparent transparent;\n  border-style: solid inset inset inset;\n  margin: 6px 6px -3px 6px;\n}\n.file-tree li > div:hover {\n  background: rgba(0, 0, 0, 0.2);\n  text-shadow: 0 1px 1px #000;\n  box-shadow: 0 0 1px 0 #000;\n}\n.file-tree li > div:focus {\n  outline: none;\n}\n.file-tree li.selected > div {\n  background: rgba(255, 255, 255, 0.1);\n  box-shadow: 0 0 1px 0 #000;\n  outline: none;\n  color: #FFF;\n  text-shadow: 0 1px 1px #000;\n}\n.file-tree li.selected > div .icon-folder-open,\n.file-tree li.selected > div .icon-folder {\n  color: rgba(169, 142, 76, 0.9);\n}\n.file-tree li.selected > div .icon-file-text2 {\n  color: rgba(141, 163, 171, 0.9);\n}\n.resizer {\n  position: fixed;\n  pointer-events: auto;\n  z-index: 1000;\n}\n.resizer.vertical {\n  cursor: col-resize;\n  width: 6px;\n  top: 0;\n  bottom: 0;\n}\n.resizer.horizontal {\n  cursor: row-resize;\n  height: 6px;\n  left: 0;\n  right: 0;\n}\n.filetree-toolbar {\n  box-shadow: 0 1px 5px 0 #000;\n}\n.btn {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n}\n.pull-right {\n  float: right;\n}\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,d09GRgABAAAAAAoAAAsAAAAACbQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIOM2NtYXAAAAFoAAAAfAAAAHzEKL0KZ2FzcAAAAeQAAAAIAAAACAAAABBnbHlmAAAB7AAABaAAAAWg06s3nmhlYWQAAAeMAAAANgAAADYIPxXjaGhlYQAAB8QAAAAkAAAAJAgFBBdobXR4AAAH6AAAADQAAAA0KW4BbGxvY2EAAAgcAAAAHAAAABwF0gd6bWF4cAAACDgAAAAgAAAAIAAUAGluYW1lAAAIWAAAAYYAAAGGmUoJ+3Bvc3QAAAngAAAAIAAAACAAAwAAAAMDvgGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8UsDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAGAAAAAUABAAAwAEAAEAIOIF4gnpAfB88RXxS//9//8AAAAAACDiBeIJ6QDwe/EU8Uv//f//AAH/4x3/HfwXBg+NDvYOwQADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAIAVgABA6oDVQALABwAAAEnNycHJwcXBxc3FwMyFxYVFAcGIyInJjU0NzYzAtaamjyamjyamjyampqwfX19fbCwfX19fbABEZqaPJqaPJqaPJqaAoB9fbCwfX19fbCwfX0AAAABANYAgQMqAtUACwAAAQcXBycHJzcnNxc3Ayru7jzu7jzu7jzu7gKZ7u487u487u487u4ABgBA/8ADwAPAABkAIgA5AEgAVwBmAAABLgEnLgEnLgEjISIGFREUFjMhMjY1ETQmJyceARcjNR4BFxMUBiMhIiY1ETQ2MzA6AjEVFBY7AREnISImNTQ2MyEyFhUUBiM1ISImNTQ2MyEyFhUUBiM1ISImNTQ2MyEyFhUUBiMDlhEtGRozFycpC/4QIS8vIQLgIS8OHIUXJQ2aESkXbwkH/SAHCQkHm7qbEw3goP5ADRMTDQHADRMTDf5ADRMTDQHADRMTDf5ADRMTDQHADRMTDQLbFzMaGS0RHA4vIfygIS8vIQJwCyknNhcpEZoNJRf8/wcJCQcDYAcJ4A0T/ZBwEw0NExMNDROAEw0NExMNDROAEw0NExMNDRMAAAACAAD/wAQAA8AAFAAhAAABIg4CFRQeAjMyPgI1NC4CIxEiJjU0NjMyFhUUBiMCAGq7i1BQi7tqaruLUFCLu2o1S0s1NUtLNQPAUIu7amq7i1BQi7tqaruLUP2ASzU1S0s1NUsAAQAAAEkDtwNuABoAAAERFAcGIyEiJyY1ETQ3NjsBMhcWHQEhMhcWFQO3JiY0/Uk1JSYmJTW3NCYmAYA0JiYCW/5uNCYmJiY0AiU0JiYmJjQTJSY1AAAAAAIAAABJBDIDbgAYADQAAAEUDwEGBwYjISInJjU0PwE2NzYzITIXFhUnFSEiBwYPATQnNDURNDc2OwEyFxYdASEyFxYVBDISwBksLCb9khMPDxHAGSwtJQJuExAPxP4kNTs7I8MBJiU1tzQmJgE3NCYmAZcSFOIdFRQIBxESFOIdFRQIBxHEWxsbKeYCBQUCAiU0JiYmJjQTJSY1AAIAAABJA7cDbgAeADkAACURNCcmIyEiJyY9ATQnJisBIgcGFREUFxYzITI3NjUTERQHBiMhIicmNRE0NzY7ATIXFh0BITIXFhUDbhAQF/5uFxAQEBAXtxcQEBAQFwK3FxAQSSYmNP1JNSUmJiU1tzQmJgGANCYmyQGSFxAQEBAXJRcQEBAQF/3bFxAQEBAXAZL+bjQmJiYmNAIlNCYmJiY0EyUmNQAAAAMAAABJBEMDbgAUADAAVQAAATQjISIHBg8BBhUUMyEyNzY/ATY1JSE1NCcmIyEiJyY9ATQnJisBIgcGFRE3Njc2MwUUDwEGBwYjISInJjURNDc2OwEyFxYdASEyFxYdATMyFxYXFhUD+h/9kxcaGg+oCh4CbhcaGg6oC/10AbcQEBf+txcQEBAQF7cXEBCSGikpJwLVGqkZKSom/ZI1JSYmJTW3NCYmATc0JiZtHxoaDAkBoxQMDRHQDgkUDQwS0AwKXVsXEBAQEBclFxAQEBAX/hi0HxMUXSQhzx4UFCYmNAIlNCYmJiY0EyUmNVsODhoTFAAFAAAAAANuA24ABgARABcAIwA4AAATFwcjNSM1JRYPAQYnJj8BNhcDAScBFTMBNzY1NC8BJiMiDwElERQHBiMhIicmNRE0NzYzITIXFhXnVx4gNwEKCAmnCQgICqYKB5wBN6X+yaUBWzUQEFcQFxcQNAGAMTBE/dxEMTAwMUQCJEQwMQE+Vx43IP0ICqYKCAgKpgoI/nUBN6X+yaUBXDQQFxcQVxAQNTf93EQxMDAxRAIkRDAxMTBEAAAAAAEAAAABAAA+n5OZXw889QALBAAAAAAA0m5oswAAAADSbmizAAD/wARDA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABEkAAAAABEMAAQAAAAAAAAAAAAAAAAAAAA0EAAAAAAAAAAAAAAACAAAABAAAVgQAANYEAABABAAAAAO3AAAESQAAA7cAAARJAAADbgAAAAAAAAAKABQAHgBQAGoA+AEqAVYBpAH4AnIC0AABAAAADQBnAAYAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = remote;

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
		"name": "ride",
		"version": "0.0.1",
		"description": "React Editor",
		"main": "index.js",
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"start": "electron index.js",
			"install-package": "node install-package"
		},
		"repository": {
			"type": "git",
			"url": "git+https://github.com/vlad-ignatov/ride.git"
		},
		"keywords": [
			"React",
			"Editor",
			"IDE",
			"Flux",
			"JSX"
		],
		"author": "Vladimir Ignatov",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/vlad-ignatov/ride/issues"
		},
		"homepage": "https://github.com/vlad-ignatov/ride#readme",
		"devDependencies": {
			"babel": "^6.1.5",
			"babel-core": "^6.1.4",
			"babel-eslint": "^4.1.5",
			"babel-loader": "^6.1.0",
			"babel-plugin-syntax-jsx": "^6.1.4",
			"babel-preset-es2015": "^6.1.4",
			"babel-preset-react": "^6.1.4",
			"babel-preset-stage-0": "^6.1.2",
			"electron-prebuilt": "^0.34.3",
			"eslint": "^1.9.0",
			"eslint-plugin-react": "^3.8.0",
			"file-loader": "^0.8.4",
			"less": "^2.5.3",
			"less-loader": "^2.2.1",
			"style-loader": "^0.13.0",
			"url-loader": "^0.5.6",
			"webpack": "^1.12.4"
		},
		"dependencies": {
			"alt": "^0.17.9",
			"babel-runtime": "^6.1.4",
			"command-palette": "file:../ride-packages/command-palette",
			"css-loader": "^0.22.0",
			"jquery": "^2.1.4",
			"json-loader": "^0.5.3",
			"react": "^0.14.2",
			"require-directory": "^2.1.1"
		},
		"ride": {
			"packages": {
				"command-palette": "^1.0.0"
			}
		}
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./command-palette/ride-main-window.js": 38
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 37;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(39)

	function hlt(str, q) {
	    var out  = '',
	        _str = str.toLowerCase(),
	        _q   = q.toLowerCase(),
	        next = _str.indexOf(_q),
	        len  = _q.length,
	        last = 0;

	    if (!len) {
	        return str;
	    }

	    while (next > -1) {
	        out += str.substring(last, next);
	        out += '<span class="search-match">';
	        out += str.substr(next, len);
	        out += '</span>';
	        last = next + len;
	        next = _str.indexOf(_q, last);
	    }

	    out += str.substr(last);
	    return out;
	}

	module.exports = function() {
	    var $     = global.jQuery,
	        fs    = __webpack_require__(6),
	        Path  = __webpack_require__(41),
	        lastVal,
	        state = {
	            input : '',
	            items : []
	        },
	        $wrap;

	    function setState(newState) {
	        $.extend(true, state, newState);
	        render();
	    }

	    function render() {
	        if (lastVal != state.input) {
	            lastVal = state.input
	            $wrap.find('input').val(state.input);
	        }
	        if (state.items.length) {
	            var q = Path.basename(state.input)
	            var $list = $wrap.find('.list').html(state.items.map(item => {
	                return `<div class="list-item ${item.active ? 'active' : ''}">
	                    <span class="icon ${item.dir ? 'icon-folder' : 'icon-file-text2'}"/>
	                    ${hlt(item.name, q)}
	                    <footer>${item.path}</footer>
	                </div>`
	            })).show();

	            var active = $list.find('.list-item.active');
	            if (active.length) {
	                $list[0].scrollTop = active[0].offsetTop - $list[0].offsetTop - 1
	            }
	        } else {
	            $wrap.find('.list').hide()
	        }
	    }

	    function up() {
	        var length = state.items.length, current

	        if (!length) {
	            return;
	        }

	        current = state.items.findIndex(o => o.active) - 1
	        if (current < 0) {
	            current = length - 1
	        }
	        state.items.forEach((o, i) => o.active = i === current)
	    }

	    function down() {
	        var length = state.items.length, current

	        if (!length) {
	            return;
	        }

	        current = state.items.findIndex(o => !!o.active) + 1
	        if (current >= length) {
	            current = 0
	        }
	        state.items.forEach((o, i) => {
	            o.active = (i === current)
	        })

	        render()
	    }

	    function selectItem() {
	        var item = state.items.find(o => o.active)
	        if (item) {
	            if (item.dir) {
	                search(item.path + '/')
	            } else {
	                window.alt.actions.FileActions.openFile(item.path)
	                $wrap.hide();
	            }
	        }
	    }

	    function getPanel() {
	        if (!$wrap) {
	            $wrap = $('<div class="command-palette"/>').appendTo('.main-stage')
	            $wrap.append('<input type="text" style="width:100%"/>')
	            $wrap.append(`<div class="list" style="display:none"></div>`)
	            $wrap.on('keydown', 'input', function(e) {
	                switch(e.keyCode) {
	                    case 38:
	                        e.preventDefault()
	                        up();
	                        render();
	                    break;
	                    case 40:
	                        e.preventDefault()
	                        down();
	                    break;
	                    case 13:
	                        e.preventDefault()
	                        selectItem()
	                    break;
	                    // default:
	                    //     search(this.value);
	                    // break;
	                }
	            })
	            $wrap.on('input', 'input', function() {
	                search(this.value);
	            })
	        }
	        return $wrap;
	    }

	    function togglePanel() {
	        if ($wrap && $wrap.length && $wrap.is(':visible')) {
	            $wrap.hide();
	        }
	        else {
	            getPanel().show().find('input').trigger('focus');
	        }
	    }

	    function search(q) {
	        if (q == state.input) {
	            return;
	        }
	        var idx = q.lastIndexOf('/'),
	            dir = q.substr(0, idx + 1),
	            search = q.substr(idx + 1),
	            items,
	            list_items = [];

	        // if (idx > -1) {
	        //     dir = q.substr(0, idx + 1)
	        // }

	        if (dir) {
	            dir = Path.normalize(dir)
	            try {
	                items = fs.readdirSync(dir);
	            } catch (ex) {
	                // console.error(ex);
	            }

	            var hasActive = false

	            for (var i in items) {
	                if (search && items[i].indexOf(search) == -1) {
	                    continue;
	                }
	                var path = dir + '' + items[i],
	                    stats;
	                try {
	                    stats = fs.statSync(path);
	                } catch (ex) {
	                    // console.error(ex);
	                    continue;
	                }

	                list_items.push({
	                    name  : items[i],
	                    path  : path,
	                    dir   : stats.isDirectory(),
	                    active: search && !hasActive
	                })

	                if (search && !hasActive)
	                    hasActive = 1
	            }
	        }

	        state.items = list_items
	        setState({ input: q });
	    }

	    $(window).on('keydown', function(e) {
	        // console.log(e)
	        if (e.metaKey &&  e.keyCode == 80) {
	            // alert('will show command palette')
	            togglePanel();
	        }
	    })
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./../less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../css-loader/index.js!./../less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	// imports


	// module
	exports.push([module.id, ".command-palette {\n  position: absolute;\n  z-index: 1000;\n  top: 30px;\n  left: 10%;\n  width: 80%;\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 6px 10px 2px rgba(0, 0, 0, 0.5);\n  background: #333;\n  padding: 10px;\n  border-radius: 0 0 4px 4px;\n}\n.command-palette input {\n  box-sizing: border-box;\n  width: 100%;\n  border: 1px solid #000;\n  background: #222;\n  color: #CCC;\n  font-size: 20px;\n  padding: 5px 10px;\n}\n.command-palette input:focus {\n  border-color: #926426;\n  outline: none;\n}\n.command-palette .list {\n  max-height: 400px;\n  overflow: auto;\n  background: #000;\n  margin-top: 10px;\n}\n.command-palette .list .list-item {\n  margin: 1px;\n  padding: 6px 12px;\n  background: #222;\n}\n.command-palette .list .list-item .icon {\n  opacity: 0.6;\n}\n.command-palette .list .list-item footer {\n  font-size: 86%;\n  opacity: 0.5;\n  font-family: Menlo, monospace;\n  font-weight: 400;\n}\n.command-palette .list .list-item .search-match {\n  background: rgba(146, 100, 38, 0.75);\n  border-radius: 2px;\n  color: #000;\n}\n.command-palette .list .list-item:hover {\n  background: #292929;\n}\n.command-palette .list .list-item.active {\n  background: #926426;\n  color: #000;\n}\n.command-palette .list .list-item.active .search-match {\n  background: rgba(0, 0, 0, 0.75);\n  color: #926426;\n}\n", ""]);

	// exports


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = path;

/***/ }
/******/ ]);