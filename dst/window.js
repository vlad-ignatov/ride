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

	var _jquery = __webpack_require__(12);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)(function () {
	    ReactDOM.render(React.createElement(_MainWindow2.default, {
	        __source: {
	            fileName: '../../../../../src/window.jsx',
	            lineNumber: 5
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

	var _Editor = __webpack_require__(7);

	var _Editor2 = _interopRequireDefault(_Editor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(8);

	var MainWindow = (function (_Component) {
	    _inherits(MainWindow, _Component);

	    function MainWindow() {
	        _classCallCheck(this, MainWindow);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MainWindow).apply(this, arguments));
	    }

	    _createClass(MainWindow, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { style: { display: 'flex', height: '100%', flexDirection: 'column' }, __source: {
	                        fileName: '../../../../../src/components/MainWindow.jsx',
	                        lineNumber: 11
	                    }
	                },
	                React.createElement(
	                    'div',
	                    { className: 'header', style: { textAlign: 'center' }, __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 12
	                        }
	                    },
	                    'React Editor'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-row', __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 13
	                        }
	                    },
	                    React.createElement(
	                        'div',
	                        { className: 'main-sidebar-left', __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 14
	                            }
	                        },
	                        React.createElement(_FileTree.FileTree, { type: 'dir', path: '/', expanded: true, __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 15
	                            }
	                        }),
	                        React.createElement('div', { className: 'resizer vertical', style: { left: 300 }, __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 16
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'main-stage', __source: {
	                                fileName: '../../../../../src/components/MainWindow.jsx',
	                                lineNumber: 18
	                            }
	                        },
	                        React.createElement(
	                            'div',
	                            { className: 'main-tabs', __source: {
	                                    fileName: '../../../../../src/components/MainWindow.jsx',
	                                    lineNumber: 19
	                                }
	                            },
	                            React.createElement(
	                                'div',
	                                { className: 'tab active', __source: {
	                                        fileName: '../../../../../src/components/MainWindow.jsx',
	                                        lineNumber: 20
	                                    }
	                                },
	                                'Tab 1'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'tab', __source: {
	                                        fileName: '../../../../../src/components/MainWindow.jsx',
	                                        lineNumber: 23
	                                    }
	                                },
	                                'Tab 2'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'main-inspector', __source: {
	                                    fileName: '../../../../../src/components/MainWindow.jsx',
	                                    lineNumber: 27
	                                }
	                            },
	                            React.createElement(_Editor2.default, {
	                                __source: {
	                                    fileName: '../../../../../src/components/MainWindow.jsx',
	                                    lineNumber: 28
	                                }
	                            })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'main-status-bar', __source: {
	                            fileName: '../../../../../src/components/MainWindow.jsx',
	                            lineNumber: 32
	                        }
	                    },
	                    'Status bar'
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
	                        lineNumber: 32
	                    }
	                },
	                React.createElement(_FileTreeItem2.default, {
	                    path: this.props.path,
	                    name: this.props.name,
	                    type: type,
	                    expanded: this.props.expanded, __source: {
	                        fileName: '../../../../../src/components/FileTree.jsx',
	                        lineNumber: 33
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
	    expanded: _react.PropTypes.bool
	};
	FileTree.defaultProps = {
	    path: '/',
	    name: 'Folder',
	    expanded: false
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FileTreeItem = (function (_Component) {
	    _inherits(FileTreeItem, _Component);

	    function FileTreeItem(props) {
	        _classCallCheck(this, FileTreeItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileTreeItem).call(this, props));

	        _this.mouseDwn = _this.mouseDwn.bind(_this);
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
	                var files = _fs2.default.readdirSync(this.props.path),
	                    items = [];

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
	                        path: path,
	                        key: path,
	                        type: stats.isDirectory() ? FileTreeItem.TYPE_DIR : FileTreeItem.TYPE_FILE
	                    });
	                }

	                // TODO: alpha sort too
	                items.sort(function (a, b) {
	                    return (a.type == FileTreeItem.TYPE_DIR ? 0 : 1) - (b.type == FileTreeItem.TYPE_DIR ? 0 : 1);
	                });

	                console.log(items);

	                return React.createElement(
	                    'ul',
	                    {
	                        __source: {
	                            fileName: '../../../../../src/components/FileTreeItem.jsx',
	                            lineNumber: 67
	                        }
	                    },
	                    items.map(function (item) {
	                        return React.createElement(FileTreeItem, _extends({}, item, {
	                            __source: {
	                                fileName: '../../../../../src/components/FileTreeItem.jsx',
	                                lineNumber: 68
	                            }
	                        }));
	                    })
	                );
	            }

	            return null;
	        }
	    }, {
	        key: 'mouseDwn',
	        value: function mouseDwn(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            if (this.props.type == FileTreeItem.TYPE_DIR) {
	                this.setState({
	                    expanded: !this.state.expanded
	                });
	            } else {
	                // DISPATCHER.emit('selectfile', this.props.path);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isDir = this.props.type == FileTreeItem.TYPE_DIR;
	            return React.createElement(
	                'li',
	                { key: this.props.path, className: this.props.type + (this.state.expanded ? ' expanded' : ''), __source: {
	                        fileName: '../../../../../src/components/FileTreeItem.jsx',
	                        lineNumber: 93
	                    }
	                },
	                React.createElement(
	                    'div',
	                    { onClick: this.mouseDwn, style: { paddingLeft: this.props.level * 18 }, tabIndex: '0', __source: {
	                            fileName: '../../../../../src/components/FileTreeItem.jsx',
	                            lineNumber: 96
	                        }
	                    },
	                    (isDir ? '📂' : '📄') + this.props.name || this.props.path
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
	    level: _react.PropTypes.number
	};
	FileTreeItem.TYPE_FILE = 'file';
	FileTreeItem.TYPE_DIR = 'dir';
	FileTreeItem.defaultProps = {
	    path: '/',
	    expanded: false,
	    level: 0
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = fs;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Editor = (function (_Component) {
	    _inherits(Editor, _Component);

	    function Editor() {
	        _classCallCheck(this, Editor);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
	    }

	    _createClass(Editor, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var editor = ace.edit(this.refs.wrapper);
	            editor.setTheme("ace/theme/twilight");
	            editor.getSession().setMode("ace/mode/jsx");
	            editor.setDisplayIndentGuides(false);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement("div", { ref: "wrapper", id: "editor", __source: {
	                    fileName: "../../../../../src/components/Editor.jsx",
	                    lineNumber: 16
	                }
	            });
	        }
	    }]);

	    return Editor;
	})(_react.Component);

	exports.default = Editor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n}\nhtml {\n  overflow: hidden;\n  height: 100%;\n  background: #2F3129;\n  color: #797A75;\n}\nbody {\n  font: menu;\n  background: #2F3129;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  cursor: default;\n  color: #797A75;\n  -webkit-app-region: drag;\n}\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n::-webkit-scrollbar-button {\n  width: 0px;\n  height: 0px;\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(200, 200, 200, 0.1);\n  border-radius: 5px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(200, 200, 200, 0.3);\n}\n::-webkit-scrollbar-thumb:active {\n  background: rgba(200, 200, 200, 0.5);\n}\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n/*::-webkit-scrollbar-track:hover {\n  background: #666666;\n}\n::-webkit-scrollbar-track:active {\n  background: #333333;\n}*/\n::-webkit-scrollbar-corner {\n  background: transparent;\n}\n/*div, iframe {\n    box-shadow: 0 0 0 0.5px #CCC;\n}*/\n.main-wrap {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.main-row {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  background: #272822;\n  -webkit-app-region: no-drag;\n}\n.main-sidebar-left {\n  padding: 1px;\n  width: 300px;\n  border-right: 1px solid rgba(0, 0, 0, 0.2);\n  overflow: auto;\n  position: relative;\n}\n.main-stage {\n  display: flex;\n  flex: 5;\n  flex-direction: column;\n}\n.main-tabs {\n  display: flex;\n  flex-direction: row;\n  height: 2em;\n  background: linear-gradient(#1E1F1A, #272822);\n}\n.main-tabs .tab {\n  display: flex;\n  flex: 1;\n  position: relative;\n  z-index: 2;\n  padding: 4px;\n  max-width: 40%;\n  border-radius: 3px 3px 0 0;\n  box-shadow: 0px -1px 0px 1px #1E1F1A;\n  margin: 1px 1px 0 0;\n  background: #2F3129;\n}\n.main-tabs .tab.active {\n  border-top: 2px solid rgba(255, 165, 0, 0.4);\n  background: #2F3129;\n  color: #fff;\n}\n.main-frame {\n  display: flex;\n  flex: 5;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  box-sizing: border-box;\n}\n.main-inspector {\n  display: flex;\n  flex: 5;\n  position: relative;\n  background: #272822;\n  border-top: 1px solid #2F3129;\n}\n.main-sidebar-right {\n  display: flex;\n  padding: 4px;\n  flex: 2;\n  border-left: 1px solid rgba(255, 255, 255, 0.1);\n  overflow: auto;\n}\n.main-status-bar {\n  display: flex;\n  padding: 1px 4px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  -webkit-app-region: drag;\n}\n.header {\n  height: 23px;\n  line-height: 22px;\n  font-size: 14px;\n  text-shadow: 0 0 1px #000;\n  color: #ccc;\n  border-bottom: 1px solid #222;\n}\n#editor {\n  position: absolute;\n  border-top: 1px solid #000;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-font-smoothing: subpixel-antialiased;\n  font-family: \"Roboto Mono\", \"Source Code Pro\", Menlo;\n  text-rendering: optimizeLegibility;\n  font-size: 14px;\n}\n#editor.ace_dark {\n  font-weight: 300;\n  text-shadow: 0 0.5px 0.5px #000000;\n  /*opacity: 0.8;*/\n}\n#editor.ace-ambiance .ace_gutter {\n  color: #000 !important;\n  font-weight: 400;\n}\n#editor.ace-ambiance .ace_marker-layer .ace_selected-word {\n  border-width: 1px;\n}\n#editor .ace_comment {\n  font-family: \"Source Code Pro\", Menlo;\n  font-weight: 400;\n}\n.file-tree,\n.file-tree ul {\n  margin: 0;\n  padding: 0;\n  display: table;\n  min-width: 100%;\n}\n.file-tree li {\n  white-space: nowrap;\n  display: block;\n  min-width: 100%;\n}\n.file-tree li > div {\n  min-width: 100%;\n  display: inline-block;\n  padding-right: 4px;\n  position: relative;\n  z-index: 2;\n  border-radius: 2px;\n}\n.file-tree li > div:before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-width: 5px;\n  border-color: transparent;\n  border-style: inset inset inset solid;\n  position: relative;\n  display: inline-block;\n  margin: 0px 3px 0px 9px;\n}\n.file-tree li.dir > div:before {\n  border-color: transparent transparent transparent #666;\n}\n.file-tree li.expanded > div:before {\n  border-color: #666 transparent transparent transparent;\n  border-style: solid inset inset inset;\n  margin: 6px 6px -3px 6px;\n}\n.file-tree li > div:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n  text-shadow: 0 1px 1px #000;\n}\n.file-tree li > div:focus {\n  background: rgba(0, 0, 0, 0.3);\n  box-shadow: 0 0 1px 0 rgba(255, 127, 0, 0.8) inset;\n  outline: none;\n  color: #fff;\n  text-shadow: 0 1px 1px #000;\n}\n.resizer {\n  position: fixed;\n  pointer-events: auto;\n  z-index: 1000;\n}\n.resizer.vertical {\n  cursor: col-resize;\n  width: 6px;\n  top: 0;\n  bottom: 0;\n}\n.resizer.horizontal {\n  cursor: row-resize;\n  height: 6px;\n  left: 0;\n  right: 0;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);