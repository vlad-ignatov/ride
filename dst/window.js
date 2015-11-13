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

	var _jquery = __webpack_require__(22);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(document).on('selectstart', false);

	    ReactDOM.render(React.createElement(_MainWindow2.default, {
	        __source: {
	            fileName: '../../../../../src/window.jsx',
	            lineNumber: 7
	        }
	    }), document.querySelector('.main-wrap'));

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
	        });
	        return false;
	    });

	    (0, _jquery2.default)('.header').on('dblclick', function () {
	        ipc.send('toggleMaximize');
	    });
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

	var _Editor = __webpack_require__(12);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _TabBrowser = __webpack_require__(15);

	var _TabBrowser2 = _interopRequireDefault(_TabBrowser);

	var _AppStateStore = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(17);

	var MainWindow = (function (_Component) {
	    _inherits(MainWindow, _Component);

	    function MainWindow() {
	        _classCallCheck(this, MainWindow);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainWindow).call(this));

	        _this.state = _AppStateStore.appStateStore.getState();
	        _this._onChange = _this._onChange.bind(_this);
	        return _this;
	    }

	    _createClass(MainWindow, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _AppStateStore.appStateStore.addChangeListener(this._onChange);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _AppStateStore.appStateStore.removeChangeListener(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            this.setState(_AppStateStore.appStateStore.getState());
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { style: { display: 'flex', height: '100%', flexDirection: 'column' }, __source: {
	                        fileName: '../../../../../src/components/MainWindow.jsx',
	                        lineNumber: 35
	                    }
	                },
	                React.createElement(
	                    'div',
	                    { className: 'header', style: { textAlign: 'center' }, __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 36
	                        }
	                    },
	                    'React Editor'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-row', __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 37
	                        }
	                    },
	                    React.createElement(
	                        'div',
	                        { className: 'main-sidebar-left', __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 38
	                            }
	                        },
	                        React.createElement(_FileTree.FileTree, { type: 'dir', path: '/', expanded: true, selectedPath: this.state.selectedFilePath, __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 39
	                            }
	                        }),
	                        React.createElement('div', { className: 'resizer vertical', style: { left: 300 }, __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 40
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'main-stage', __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 42
	                            }
	                        },
	                        React.createElement(_TabBrowser2.default, {
	                            __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 43
	                            }
	                        }),
	                        React.createElement(
	                            'div',
	                            { className: 'main-inspector', __source: {
	                                    fileName: '../../../../../src/components/MainWindow.jsx',
	                                    lineNumber: 44
	                                }
	                            },
	                            React.createElement(_Editor2.default, { filePath: this.state.selectedFilePath, __source: {
	                                    fileName: '../../../../../src/components/MainWindow.jsx',
	                                    lineNumber: 45
	                                }
	                            })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-status-bar', __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 49
	                        }
	                    },
	                    this.state.selectedFilePath || 'ready'
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global fs, DISPATCHER */

	var FileTree = exports.FileTree = (function (_Component) {
	    _inherits(FileTree, _Component);

	    function FileTree() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, FileTree);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FileTree)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	    }

	    _createClass(FileTree, [{
	        key: 'render',
	        value: function render() {
	            var type = _fs2.default.statSync(this.props.path).isDirectory() ? _FileTreeItem2.default.TYPE_DIR : _FileTreeItem2.default.TYPE_FILE;

	            return React.createElement(
	                'ul',
	                { className: 'file-tree', __source: {
	                        fileName: '../../../../../src/components/FileTree.jsx',
	                        lineNumber: 34
	                    }
	                },
	                React.createElement(_FileTreeItem2.default, {
	                    path: this.props.path,
	                    name: this.props.name,
	                    type: type,
	                    expanded: this.props.expanded,
	                    selectedPath: this.props.selectedPath, __source: {
	                        fileName: '../../../../../src/components/FileTree.jsx',
	                        lineNumber: 35
	                    }
	                })
	            );
	        }
	    }]);

	    return FileTree;
	})(_react.Component);

	FileTree.propTypes = {
	    path: _react.PropTypes.string,
	    name: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool,
	    selectedPath: _react.PropTypes.string
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

	var _FileTreeActions = __webpack_require__(7);

	var _FileTreeActions2 = _interopRequireDefault(_FileTreeActions);

	var _AppActions = __webpack_require__(10);

	var _AppActions2 = _interopRequireDefault(_AppActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FileTreeItem = (function (_Component) {
	    _inherits(FileTreeItem, _Component);

	    function FileTreeItem(props) {
	        _classCallCheck(this, FileTreeItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileTreeItem).call(this, props));

	        _this.onClick = _this.onClick.bind(_this);
	        _this.dblClick = _this.dblClick.bind(_this);
	        _this.state = {
	            expanded: props.expanded
	        };
	        return _this;
	    }

	    _createClass(FileTreeItem, [{
	        key: 'getChildren',
	        value: function getChildren() {
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
	                    {
	                        __source: {
	                            fileName: '../../../../../src/components/FileTreeItem.jsx',
	                            lineNumber: 76
	                        }
	                    },
	                    items.map(function (item) {
	                        return React.createElement(FileTreeItem, _extends({}, item, {
	                            __source: {
	                                fileName: '../../../../../src/components/FileTreeItem.jsx',
	                                lineNumber: 77
	                            }
	                        }));
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
	            }
	            // else {
	            // DISPATCHER.emit('selectfile', this.props.path);
	            // }
	            _FileTreeActions2.default.select(this.props.path);
	        }
	    }, {
	        key: 'dblClick',
	        value: function dblClick(e) {
	            if (this.props.type == FileTreeItem.TYPE_FILE) {
	                _AppActions2.default.openFile(this.props.path);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isDir = this.props.type == FileTreeItem.TYPE_DIR;
	            return React.createElement(
	                'li',
	                { key: this.props.path, className: this.props.type + (this.state.expanded ? ' expanded' : '') + (this.props.selectedPath === this.props.path ? ' selected' : ''), __source: {
	                        fileName: '../../../../../src/components/FileTreeItem.jsx',
	                        lineNumber: 110
	                    }
	                },
	                React.createElement(
	                    'div',
	                    { onClick: this.onClick,
	                        onDoubleClick: this.dblClick,
	                        style: { paddingLeft: this.props.level * 18, opacity: this.props.name.indexOf('.') === 0 ? 0.5 : 1 },
	                        tabIndex: '0', __source: {
	                            fileName: '../../../../../src/components/FileTreeItem.jsx',
	                            lineNumber: 114
	                        }
	                    },
	                    React.createElement('span', { className: 'icon ' + (isDir ? this.state.expanded ? 'icon-folder-open' : 'icon-folder' : 'icon-file-text2'), __source: {
	                            fileName: '../../../../../src/components/FileTreeItem.jsx',
	                            lineNumber: 118
	                        }
	                    }),
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
	    selectedPath: _react.PropTypes.string
	};
	FileTreeItem.TYPE_FILE = 'file';
	FileTreeItem.TYPE_DIR = 'dir';
	FileTreeItem.defaultProps = {
	    path: '/',
	    expanded: false,
	    level: 0,
	    selectedPath: ''
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = fs;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Constants = __webpack_require__(8);
	var appDispatcher = __webpack_require__(9);

	var FileTreeActions = {

	    select: function select(path) {
	        appDispatcher.handleViewAction({
	            actionType: Constants.FILETREE_SELECT_ITEM,
	            path: path
	        });
	    },

	    expand: function expand(path) {
	        appDispatcher.handleViewAction({
	            actionType: Constants.FILETREE_EXPAND_ITEM,
	            path: path
	        });
	    },

	    collapse: function collapse(path) {
	        appDispatcher.handleViewAction({
	            actionType: Constants.FILETREE_COLLAPSE_ITEM,
	            path: path
	        });
	    },

	    toggle: function toggle(path) {
	        appDispatcher.handleViewAction({
	            actionType: Constants.FILETREE_TOGGLE_ITEM,
	            path: path
	        });
	    }

	};

	module.exports = FileTreeActions;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    FILETREE_SELECT_ITEM: 'FILETREE_SELECT_ITEM',
	    FILETREE_EXPAND_ITEM: 'FILETREE_EXPAND_ITEM',
	    FILETREE_COLLAPSE_ITEM: 'FILETREE_COLLAPSE_ITEM',
	    FILETREE_TOGGLE_ITEM: 'FILETREE_TOGGLE_ITEM'
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _callbacks = [];
	var _promises = [];

	var Dispatcher = (function () {
	    function Dispatcher() {
	        _classCallCheck(this, Dispatcher);
	    }

	    _createClass(Dispatcher, [{
	        key: 'register',

	        /**
	         * Register a Store's callback so that it may be invoked by an action.
	         * @param {function} callback The callback to be registered.
	         * @return {number} The index of the callback within the _callbacks array.
	         */
	        value: function register(callback) {
	            _callbacks.push(callback);
	            return _callbacks.length - 1; // index
	        }

	        /**
	         * dispatch
	         * @param  {object} payload The data from the action.
	         */

	    }, {
	        key: 'dispatch',
	        value: function dispatch(payload) {
	            // First create array of promises for callbacks to reference.
	            var resolves = [];
	            var rejects = [];

	            _promises = _callbacks.map(function (_, i) {
	                return new Promise(function (resolve, reject) {
	                    resolves[i] = resolve;
	                    rejects[i] = reject;
	                });
	            });

	            // Dispatch to callbacks and resolve/reject promises.
	            _callbacks.forEach(function (callback, i) {
	                // Callback can return an obj, to resolve, or a promise, to chain.
	                // See waitFor() for why this might be useful.
	                Promise.resolve(callback(payload)).then(function () {
	                    resolves[i](payload);
	                }, function () {
	                    rejects[i](new Error('Dispatcher callback unsuccessful'));
	                });
	            });
	            _promises = [];
	        }

	        /**
	         * A bridge function between the views and the dispatcher, marking the action
	         * as a view action.  Another variant here could be handleServerAction.
	         * @param  {object} action The data coming from the view.
	         */

	    }, {
	        key: 'handleViewAction',
	        value: function handleViewAction(action) {
	            this.dispatch({
	                source: 'VIEW_ACTION',
	                action: action
	            });
	        }
	    }]);

	    return Dispatcher;
	})();

	module.exports = new Dispatcher();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Constants = __webpack_require__(11);
	var appDispatcher = __webpack_require__(9);

	var AppActions = {

	    openFile: function openFile(path) {
	        appDispatcher.handleViewAction({
	            actionType: Constants.APP_OPEN_FILE,
	            path: path
	        });
	    }

	};

	module.exports = AppActions;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    APP_OPEN_FILE: 'APP_OPEN_FILE'
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _fs = __webpack_require__(6);

	var _fs2 = _interopRequireDefault(_fs);

	var _AppStateStore = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Editor = (function (_Component) {
	    _inherits(Editor, _Component);

	    function Editor(props) {
	        _classCallCheck(this, Editor);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).call(this, props));

	        _this.state = {
	            filePath: props.filePath || ''
	        };
	        _this._onChange = _this._onChange.bind(_this);
	        return _this;
	    }

	    _createClass(Editor, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _AppStateStore.appStateStore.removeChangeListener(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            var path = _AppStateStore.appStateStore.getState().selectedFilePath;
	            var isDir = _fs2.default.statSync(path).isDirectory();
	            if (!isDir) {
	                try {
	                    var modelist = ace.require("ace/ext/modelist");
	                    var mode = modelist.getModeForPath(path).mode;
	                    this.editor.session.setMode(mode); // mode now contains "ace/mode/javascript".
	                    this.editor.setValue(_fs2.default.readFileSync(path, 'utf8'), -1);
	                } catch (ex) {
	                    console.error(ex);
	                    this.editor.setValue('');
	                }
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _AppStateStore.appStateStore.addChangeListener(this._onChange);
	            this.editor = ace.edit(this.refs.wrapper);
	            this.editor.$blockScrolling = Infinity;
	            this.editor.setTheme("ace/theme/twilight");
	            this.editor.getSession().setMode("ace/mode/jsx");
	            this.editor.setDisplayIndentGuides(false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', { ref: 'wrapper', id: 'editor', __source: {
	                    fileName: '../../../../../src/components/Editor.jsx',
	                    lineNumber: 58
	                }
	            });
	        }
	    }]);

	    return Editor;
	})(_react.Component);

	exports.default = Editor;
	Editor.propTypes = {
	    filePath: _react.PropTypes.string
	};
	Editor.defaultProps = {
	    filePath: ''
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Constants = __webpack_require__(8);
	var EventEmitter = __webpack_require__(14).EventEmitter;
	var appDispatcher = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	var SATE = {
	    selectedFilePath: ''
	};

	var AppStateStore = (function (_EventEmitter) {
	    _inherits(AppStateStore, _EventEmitter);

	    function AppStateStore() {
	        _classCallCheck(this, AppStateStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppStateStore).call(this));

	        var store = _this;

	        _this.dispatcherIndex = appDispatcher.register(function (payload) {
	            var action = payload.action;
	            var text;

	            switch (action.actionType) {
	                case Constants.FILETREE_SELECT_ITEM:
	                    SATE.selectedFilePath = action.path;
	                    store.emitChange();
	                    break;
	            }

	            return true; // No errors. Needed by promise in Dispatcher.
	        });
	        return _this;
	    }

	    /**
	     * @param {function} callback
	     */

	    _createClass(AppStateStore, [{
	        key: 'addChangeListener',
	        value: function addChangeListener(callback) {
	            this.on(CHANGE_EVENT, callback);
	        }

	        /**
	         * @param {function} callback
	         */

	    }, {
	        key: 'removeChangeListener',
	        value: function removeChangeListener(callback) {
	            this.removeListener(CHANGE_EVENT, callback);
	        }
	    }, {
	        key: 'emitChange',
	        value: function emitChange() {
	            this.emit(CHANGE_EVENT);
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return Object.assign({}, SATE);
	        }
	    }]);

	    return AppStateStore;
	})(EventEmitter);

	var appStateStore = exports.appStateStore = new AppStateStore();

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = events;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	// TabBrowser.js
	;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _OpenFilesStore = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabBrowser = (function (_Component) {
	    _inherits(TabBrowser, _Component);

	    function TabBrowser() {
	        _classCallCheck(this, TabBrowser);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabBrowser).call(this));

	        _this.state = {
	            files: {}
	        };
	        _this._onChange = _this._onChange.bind(_this);
	        return _this;
	    }

	    _createClass(TabBrowser, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _OpenFilesStore.openFilesStore.removeChangeListener(this._onChange);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _OpenFilesStore.openFilesStore.addChangeListener(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            console.log(_OpenFilesStore.openFilesStore.getAll());
	            this.setState({
	                files: _OpenFilesStore.openFilesStore.getAll()
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // console.log(this.state.files);
	            var files = [];
	            for (var file in this.state.files) {
	                files.push(React.createElement(
	                    'div',
	                    { className: 'tab', key: file, title: file, __source: {
	                            fileName: '../../../../../src/components/TabBrowser.jsx',
	                            lineNumber: 41
	                        }
	                    },
	                    React.createElement('span', { className: 'close-tab icon icon-close', title: 'Close Tab', __source: {
	                            fileName: '../../../../../src/components/TabBrowser.jsx',
	                            lineNumber: 42
	                        }
	                    }),
	                    file.substr(file.lastIndexOf('/') + 1)
	                ));
	            }
	            return React.createElement(
	                'div',
	                { className: 'main-tabs', __source: {
	                        fileName: '../../../../../src/components/TabBrowser.jsx',
	                        lineNumber: 48
	                    }
	                },
	                files
	            );
	        }
	    }]);

	    return TabBrowser;
	})(_react.Component);

	exports.default = TabBrowser;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Constants = __webpack_require__(11);
	var EventEmitter = __webpack_require__(14).EventEmitter;
	var appDispatcher = __webpack_require__(9);

	var CHANGE_EVENT = 'change';

	var FILES = {};

	var OpenFilesStore = (function (_EventEmitter) {
	    _inherits(OpenFilesStore, _EventEmitter);

	    function OpenFilesStore() {
	        _classCallCheck(this, OpenFilesStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OpenFilesStore).call(this));

	        var store = _this;

	        _this.dispatcherIndex = appDispatcher.register(function (payload) {
	            var action = payload.action;
	            switch (action.actionType) {
	                case Constants.APP_OPEN_FILE:
	                    FILES[action.path] = 1;
	                    store.emitChange();
	                    break;
	            }

	            return true; // No errors. Needed by promise in Dispatcher.
	        });
	        return _this;
	    }

	    /**
	     * @param {function} callback
	     */

	    _createClass(OpenFilesStore, [{
	        key: 'addChangeListener',
	        value: function addChangeListener(callback) {
	            this.on(CHANGE_EVENT, callback);
	        }

	        /**
	         * @param {function} callback
	         */

	    }, {
	        key: 'removeChangeListener',
	        value: function removeChangeListener(callback) {
	            this.removeListener(CHANGE_EVENT, callback);
	        }
	    }, {
	        key: 'emitChange',
	        value: function emitChange() {
	            this.emit(CHANGE_EVENT);
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll() {
	            return Object.assign({}, FILES);
	        }
	    }]);

	    return OpenFilesStore;
	})(EventEmitter);

	var openFilesStore = exports.openFilesStore = new OpenFilesStore();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n}\nhtml {\n  overflow: hidden;\n  height: 100%;\n  background: #2F3129;\n  color: #797A75;\n}\nbody {\n  font: menu;\n  background: #2F3129;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  cursor: default;\n  color: #797A75;\n  -webkit-app-region: drag;\n}\n@font-face {\n  font-family: 'icomoon';\n  src: url(" + __webpack_require__(20) + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n.icon {\n  font-family: 'icomoon';\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.icon-cancel:before {\n  content: \"\\E205\";\n}\n.icon-close:before {\n  content: \"\\E209\";\n}\n.icon-folder:before {\n  content: \"\\F07B\";\n}\n.icon-folder-open:before {\n  content: \"\\F07C\";\n}\n.icon-folder-o:before {\n  content: \"\\F114\";\n}\n.icon-folder-open-o:before {\n  content: \"\\F115\";\n}\n.icon-file-text2:before {\n  content: \"\\E900\";\n}\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n::-webkit-scrollbar-button {\n  width: 0px;\n  height: 0px;\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(200, 200, 200, 0.1);\n  border-radius: 5px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(200, 200, 200, 0.3);\n}\n::-webkit-scrollbar-thumb:active {\n  background: rgba(200, 200, 200, 0.5);\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n/*::-webkit-scrollbar-track:hover {\n  background: #666666;\n}\n::-webkit-scrollbar-track:active {\n  background: #333333;\n}*/\n::-webkit-scrollbar-corner {\n  background: transparent;\n}\n/*div, iframe {\n    box-shadow: 0 0 0 0.5px #CCC;\n}*/\n.main-wrap {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.main-row {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  background: #1E1F18;\n  -webkit-app-region: no-drag;\n}\n.main-sidebar-left {\n  padding: 3px;\n  width: 300px;\n  border-right: 1px solid rgba(0, 0, 0, 0.4);\n  overflow: auto;\n  position: relative;\n}\n.main-stage {\n  display: flex;\n  flex: 5;\n  flex-direction: column;\n}\n.main-tabs {\n  display: flex;\n  flex-direction: row;\n  height: 2em;\n  background: linear-gradient(#1E1F1A, #272822);\n}\n.main-tabs .tab {\n  flex: 1;\n  position: relative;\n  z-index: 2;\n  padding: 4px 8px;\n  max-width: 40%;\n  border-radius: 3px 3px 0 0;\n  box-shadow: 0px -1px 0px 1px #1E1F18, 0 1px 2px -2px rgba(255, 255, 255, 0.5) inset, 0 -17px 16px -7px rgba(0, 0, 0, 0.2) inset;\n  margin: 1px 2px 0 0;\n  background: #2F3129;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-shadow: 0px -1px 0px #000;\n}\n.main-tabs .tab:hover {\n  background: #3c3f35;\n  color: #fff;\n}\n.main-tabs .tab.active {\n  border-top: 2px solid rgba(255, 165, 0, 0.4);\n  background: #3c3f35;\n  color: #fff;\n}\n.main-tabs .tab .close-tab {\n  float: right;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border-radius: 2px;\n  margin: 1px -3px auto 3px;\n  font-size: 14px;\n  line-height: 16px;\n  text-align: center;\n  padding: 0;\n  position: relative;\n  z-index: 2;\n  opacity: 0.5;\n}\n.main-tabs .tab .close-tab:hover {\n  background: rgba(0, 0, 0, 0.3);\n  color: #fff;\n  opacity: 1;\n}\n.main-tabs .tab .close-tab:active {\n  box-shadow: 1px 1px 2px #000 inset;\n}\n.main-frame {\n  display: flex;\n  flex: 5;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  box-sizing: border-box;\n}\n.main-inspector {\n  display: flex;\n  flex: 5;\n  position: relative;\n  background: #272822;\n  border-top: 2px solid #2F3129;\n}\n.main-sidebar-right {\n  display: flex;\n  padding: 4px;\n  flex: 2;\n  border-left: 1px solid rgba(255, 255, 255, 0.1);\n  overflow: auto;\n}\n.main-status-bar {\n  display: flex;\n  padding: 1px 4px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  -webkit-app-region: drag;\n}\n.header {\n  height: 23px;\n  line-height: 22px;\n  font-size: 14px;\n  text-shadow: 0 0 1px #000;\n  color: #ccc;\n  border-bottom: 1px solid #222;\n  position: relative;\n  z-index: 2;\n}\n#editor {\n  position: absolute;\n  border-top: 1px solid #000;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-font-smoothing: subpixel-antialiased;\n  font-family: \"Roboto Mono\", \"Source Code Pro\", Menlo;\n  text-rendering: optimizeLegibility;\n  font-size: 14px;\n}\n#editor.ace_dark {\n  font-weight: 300;\n  text-shadow: 0 0.5px 0.5px #000000;\n  /*opacity: 0.8;*/\n}\n#editor.ace-ambiance .ace_gutter {\n  color: #000 !important;\n  font-weight: 400;\n}\n#editor.ace-ambiance .ace_marker-layer .ace_selected-word {\n  border-width: 1px;\n}\n#editor .ace_comment {\n  font-family: \"Source Code Pro\", Menlo;\n  font-weight: 400;\n}\n.file-tree,\n.file-tree ul {\n  margin: 0;\n  padding: 0;\n  display: table;\n  min-width: 100%;\n}\n.file-tree .icon {\n  display: inline-block;\n  vertical-align: top;\n  width: 20px;\n  height: 20px;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: left;\n  margin-right: 4px;\n}\n.file-tree .icon.icon-folder-open,\n.file-tree .icon.icon-folder {\n  color: rgba(169, 142, 76, 0.7);\n}\n.file-tree .icon.icon-file-text2 {\n  color: rgba(141, 163, 171, 0.7);\n}\n.file-tree li {\n  white-space: nowrap;\n  display: block;\n  min-width: 100%;\n}\n.file-tree li > div {\n  min-width: 100%;\n  display: inline-block;\n  padding-right: 4px;\n  position: relative;\n  z-index: 2;\n  border-radius: 2px;\n  line-height: 20px;\n}\n.file-tree li > div:before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 5px;\n  border-color: transparent;\n  border-style: inset inset inset solid;\n  position: relative;\n  display: inline-block;\n  margin: 0px 3px 0px 9px;\n}\n.file-tree li.dir > div:before {\n  border-color: transparent transparent transparent #666;\n}\n.file-tree li.expanded > div:before {\n  border-color: #666 transparent transparent transparent;\n  border-style: solid inset inset inset;\n  margin: 6px 6px -3px 6px;\n}\n.file-tree li > div:hover {\n  background: rgba(0, 0, 0, 0.2);\n  text-shadow: 0 1px 1px #000;\n  box-shadow: 0 0 1px 0 #000;\n}\n.file-tree li > div:focus {\n  outline: none;\n}\n.file-tree li.selected > div {\n  background: rgba(255, 255, 255, 0.1);\n  box-shadow: 0 0 1px 0 #000;\n  outline: none;\n  color: #FFF;\n  text-shadow: 0 1px 1px #000;\n}\n.file-tree li.selected > div .icon-folder-open,\n.file-tree li.selected > div .icon-folder {\n  color: rgba(169, 142, 76, 0.9);\n}\n.file-tree li.selected > div .icon-file-text2 {\n  color: rgba(141, 163, 171, 0.9);\n}\n.resizer {\n  position: fixed;\n  pointer-events: auto;\n  z-index: 1000;\n}\n.resizer.vertical {\n  cursor: col-resize;\n  width: 6px;\n  top: 0;\n  bottom: 0;\n}\n.resizer.horizontal {\n  cursor: row-resize;\n  height: 6px;\n  left: 0;\n  right: 0;\n}\n", ""]);

	// exports


/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,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"

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);