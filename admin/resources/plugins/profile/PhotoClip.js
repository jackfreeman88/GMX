(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("hammerjs"), require("iscroll/build/iscroll-zoom"), require("lrz"));
	else if(typeof define === 'function' && define.amd)
		define(["hammerjs", "iscroll", "lrz"], factory);
	else if(typeof exports === 'object')
		exports["PhotoClip"] = factory(require("hammerjs"), require("iscroll/build/iscroll-zoom"), require("lrz"));
	else
		root["PhotoClip"] = factory(root["Hammer"], root["IScroll"], root["lrz"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine if the object is an array
  module.exports = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  // Determine if it is an object
  module.exports = function (obj) {
    return _typeof(obj) === 'object';
  };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine if it is a numeric type
  module.exports = function (num) {
    return typeof num === 'number';
  };
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /**
??????* Let hidden elements execute programs correctly (IE9 and above)
??????* @param elems {DOM|Array} An array of DOM elements or DOM elements
??????* @param func {Function} Program function to be executed
??????* @param target {Object} The point of this in the function when executing the program
??????*/
  var defaultDisplayMap = {};

  module.exports = function (elems, func, target) {
    if (_typeof(elems) !== 'object') {
      elems = [];
    }

    if (typeof elems.length === 'undefined') {
      elems = [elems];
    }

    var hideElems = [],
        hideElemsDisplay = [];

    for (var i = 0, elem; elem = elems[i++];) {
      while (elem instanceof HTMLElement) {
        var nodeName = elem.nodeName;

        if (!elem.getClientRects().length) {
          hideElems.push(elem);
          hideElemsDisplay.push(elem.style.display);
          var display = defaultDisplayMap[nodeName];

          if (!display) {
            var temp = document.createElement(nodeName);
            document.body.appendChild(temp);
            display = window.getComputedStyle(temp).display;
            temp.parentNode.removeChild(temp);
            if (display === 'none') display = 'block';
            defaultDisplayMap[nodeName] = display;
          }

          elem.style.display = display;
        }

        if (nodeName === 'BODY') break;
        elem = elem.parentNode;
      }
    }

    if (typeof func === 'function') func.call(target || this);
    var l = hideElems.length;

    while (l--) {
      hideElems.pop().style.display = hideElemsDisplay.pop();
    }
  };
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(2), __webpack_require__(0), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(3), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19), __webpack_require__(20), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (_exports, _hammerjs, _iscrollZoom, _lrz, _bind, _destroy2, _extend, _isNumber, _isArray, _isPercent, _createElement, _removeElement, _hideAction, _support, _css, _attr, _$, utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hammerjs = _interopRequireDefault(_hammerjs);
  _iscrollZoom = _interopRequireDefault(_iscrollZoom);
  _lrz = _interopRequireDefault(_lrz);
  _bind = _interopRequireDefault(_bind);
  _destroy2 = _interopRequireDefault(_destroy2);
  _extend = _interopRequireDefault(_extend);
  _isNumber = _interopRequireDefault(_isNumber);
  _isArray = _interopRequireDefault(_isArray);
  _isPercent = _interopRequireDefault(_isPercent);
  _createElement = _interopRequireDefault(_createElement);
  _removeElement = _interopRequireDefault(_removeElement);
  _hideAction = _interopRequireDefault(_hideAction);
  _support = _interopRequireDefault(_support);
  _css = _interopRequireDefault(_css);
  _attr = _interopRequireDefault(_attr);
  _$ = _interopRequireDefault(_$);
  utils = _interopRequireWildcard(utils);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var is_mobile = !!navigator.userAgent.match(/mobile/i),
      is_android = !!navigator.userAgent.match(/android/i),
     // Test if the browser supports Transition animation, as well as supported prefixes
  supportTransition = (0, _support.default)('transition'),
      prefix = (0, _support.default)('transform'),
      noop = function noop() {};

  var defaultOptions = {
    size: [100, 100],
    adaptive: '',
    outputSize: [0, 0],
    outputType: 'jpg',
    outputQuality: .8,
    maxZoom: 1,
    rotateFree: !is_android,
    view: '',
    file: '',
    ok: '',
    img: '',
    loadStart: noop,
    loadComplete: noop,
    loadError: noop,
    done: noop,
    fail: noop,
    lrzOption: {
      width: is_android ? 1000 : undefined,
      height: is_android ? 1000 : undefined,
      quality: .7
    },
    style: {
      maskColor: 'rgba(0,0,0,.5)',
      maskBorder: '2px dashed #ddd',
      jpgFillColor: '#fff'
    },
    errorMsg: {
      noSupport: 'Your browser version is too old to support cropping. Please replace it with a new one!',
      imgError: 'This image format is not supported. Please select a regular format image file!',
      imgHandleError: 'Image processing failed! Please try another image change',
      imgLoadError: 'Image reading failed! Please try another image change.',
      noImg: 'There are no pictures to crop!',
      clipError: 'The screenshot failed! There may be cross-domain issues with the current image source file. Make sure the image is the same as the app. If you are running the program in a local environment, replace it with the server environment.'
    }
  };

  var PhotoClip =
  /*#__PURE__*/
  function () {
    function PhotoClip(container, options) {
      _classCallCheck(this, PhotoClip);

      container = (0, _$.default)(container); // Get container

      if (container && container.length) {
        this._$container = container[0];
      } else {
        return;
      }

      this._options = (0, _extend.default)(true, {}, defaultOptions, options);

      if (prefix === undefined) {
        this._options.errorMsg.noSupport && alert(this._options.errorMsg.noSupport);
      }

      this._init();
    }

    _createClass(PhotoClip, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        var options = this._options; // options Preset

        if ((0, _isNumber.default)(options.size)) {
          options.size = [options.size, options.size];
        } else if ((0, _isArray.default)(options.size)) {
          if (!(0, _isNumber.default)(options.size[0]) || options.size[0] <= 0) options.size[0] = defaultOptions.size[0];
          if (!(0, _isNumber.default)(options.size[1]) || options.size[1] <= 0) options.size[1] = defaultOptions.size[1];
        } else {
          options.size = (0, _extend.default)({}, defaultOptions.size);
        }

        if ((0, _isNumber.default)(options.outputSize)) {
          options.outputSize = [options.outputSize, 0];
        } else if ((0, _isArray.default)(options.outputSize)) {
          if (!(0, _isNumber.default)(options.outputSize[0]) || options.outputSize[0] < 0) options.outputSize[0] = defaultOptions.outputSize[0];
          if (!(0, _isNumber.default)(options.outputSize[1]) || options.outputSize[1] < 0) options.outputSize[1] = defaultOptions.outputSize[1];
        } else {
          options.outputSize = (0, _extend.default)({}, defaultOptions.outputSize);
        }

        if (options.outputType === 'jpg') {
          options.outputType = 'image/jpeg';
        } else {
          // If it is not jpg, then treat it all by png
          options.outputType = 'image/png';
        } // Variable initialization


        if ((0, _isArray.default)(options.adaptive)) {
          this._widthIsPercent = options.adaptive[0] && (0, _isPercent.default)(options.adaptive[0]) ? options.adaptive[0] : false;
          this._heightIsPercent = options.adaptive[1] && (0, _isPercent.default)(options.adaptive[1]) ? options.adaptive[1] : false;
        }

        this._outputWidth = options.outputSize[0];
        this._outputHeight = options.outputSize[1];
        this._canvas = document.createElement('canvas'); // Picture used for cropping

        this._iScroll = null; // The scroll object of the image, including the position and zoom information of the image

        this._hammerManager = null; // Hammer management object

        this._clipWidth = 0;
        this._clipHeight = 0;
        this._clipSizeRatio = 1; // Intercept frame height to height ratio

        this._$img = null; // Image of the DOM object

        this._imgLoaded = false; // Whether the image has been loaded

        this._containerWidth = 0;
        this._containerHeight = 0;
        this._viewList = null; // The DOM array of the view container rendered after the final screenshot

        this._fileList = null; // The DOM array of the file control

        this._okList = null; // Screenshot button's DOM array

        this._$mask = null;
        this._$mask_left = null;
        this._$mask_right = null;
        this._$mask_right = null;
        this._$mask_bottom = null;
        this._$clip_frame = null;
        this._$clipLayer = null; // Crop layer, including moving layer

        this._$moveLayer = null; // Moving layer, including rotating layer

        this._$rotateLayer = null; // Rotating layer

        this._moveLayerWidth = 0; // The width of the moving layer (does not change with the scale)

        this._moveLayerHeight = 0; // The height of the moving layer (does not change with the scale)

        this._moveLayerPaddingLeft = 0; // When the width of the image is smaller than the width of the cropping frame, the compensation left margin of the moving layer (does not change with the scale)

        this._moveLayerPaddingTop = 0; // When the picture height is less than the height of the crop frame, the compensation top margin of the moving layer (does not change with the scale)

        this._atRotation = false; // Whether the rotating layer is rotating

        this._rotateLayerWidth = 0; // The width of the rectangle rendered by the rotation layer (does not change with the scale)

        this._rotateLayerHeight = 0; // The height of the rectangle rendered by the rotation layer (does not change with the scale)

        this._rotateLayerX = 0; // The current X coordinate of the rotation layer (does not change with the scale)

        this._rotateLayerY = 0; // The current Y coordinate of the rotation layer (does not change with the scale)

        this._rotateLayerOriginX = 0; // Rotating layer rotation reference point X (does not change with scale)

        this._rotateLayerOriginY = 0; // Rotating layer rotation reference point Y (does not change with scale)

        this._curAngle = 0; // The current angle of the rotating layer

        (0, _bind.default)(this, '_resetScroll', '_rotateCW90', '_fileOnChangeHandle', '_clipImg', '_resize', 'size', 'load', 'clear', 'rotate', 'scale', 'clip', 'destroy');

        this._initElements();

        this._initScroll();

        this._initRotationEvent();

        this._initFile();

        this._resize();

        window.addEventListener('resize', this._resize);

        if (this._okList = (0, _$.default)(options.ok)) {
          this._okList.forEach(function ($ok) {
            $ok.addEventListener('click', _this._clipImg);
          });
        }

        if (this._options.img) {
          this._lrzHandle(this._options.img);
        }
      }
    }, {
      key: "_initElements",
      value: function _initElements() {
        // Initialize the container
        var $container = this._$container,
            style = $container.style,
            containerOriginStyle = {};
        containerOriginStyle['user-select'] = style['user-select'];
        containerOriginStyle['overflow'] = style['overflow'];
        containerOriginStyle['position'] = style['position'];
        this._containerOriginStyle = containerOriginStyle;
        (0, _css.default)($container, {
          'user-select': 'none',
          'overflow': 'hidden'
        });

        if ((0, _css.default)($container, 'position') === 'static') {
          (0, _css.default)($container, 'position', 'relative');
        } // Create a clipping layer


        this._$clipLayer = (0, _createElement.default)($container, 'photo-clip-layer', {
          'position': 'absolute',
          'left': '50%',
          'top': '50%'
        });
        this._$moveLayer = (0, _createElement.default)(this._$clipLayer, 'photo-clip-move-layer');
        this._$rotateLayer = (0, _createElement.default)(this._$moveLayer, 'photo-clip-rotate-layer'); // Create a mask

        var $mask = this._$mask = (0, _createElement.default)($container, 'photo-clip-mask', {
          'position': 'absolute',
          'left': 0,
          'top': 0,
          'width': '100%',
          'height': '100%',
          'pointer-events': 'none'
        });
        var options = this._options,
            maskColor = options.style.maskColor,
            maskBorder = options.style.maskBorder;
        this._$mask_left = (0, _createElement.default)($mask, 'photo-clip-mask-left', {
          'position': 'absolute',
          'left': 0,
          'right': '50%',
          'top': '50%',
          'bottom': '50%',
          'width': 'auto',
          'background-color': maskColor
        });
        this._$mask_right = (0, _createElement.default)($mask, 'photo-clip-mask-right', {
          'position': 'absolute',
          'left': '50%',
          'right': 0,
          'top': '50%',
          'bottom': '50%',
          'background-color': maskColor
        });
        this._$mask_top = (0, _createElement.default)($mask, 'photo-clip-mask-top', {
          'position': 'absolute',
          'left': 0,
          'right': 0,
          'top': 0,
          'bottom': '50%',
          'background-color': maskColor
        });
        this._$mask_bottom = (0, _createElement.default)($mask, 'photo-clip-mask-bottom', {
          'position': 'absolute',
          'left': 0,
          'right': 0,
          'top': '50%',
          'bottom': 0,
          'background-color': maskColor
        }); // Create a clipping box

        this._$clip_frame = (0, _createElement.default)($mask, 'photo-clip-area', {
          'border': maskBorder,
          'position': 'absolute',
          'left': '50%',
          'top': '50%'
        }); // Initialize the view container

        this._viewList = (0, _$.default)(options.view);

        if (this._viewList) {
          var viewOriginStyleList = [];

          this._viewList.forEach(function ($view, i) {
            var style = $view.style,
                viewOriginStyle = {};
            viewOriginStyle['background-repeat'] = style['background-repeat'];
            viewOriginStyle['background-position'] = style['background-position'];
            viewOriginStyle['background-size'] = style['background-size'];
            viewOriginStyleList[i] = viewOriginStyle;
            (0, _css.default)($view, {
              'background-repeat': 'no-repeat',
              'background-position': 'center',
              'background-size': 'contain'
            });
          });

          this._viewOriginStyleList = viewOriginStyleList;
        }
      }
    }, {
      key: "_initScroll",
      value: function _initScroll() {
        var _this2 = this;

        this._iScroll = new _iscrollZoom.default(this._$clipLayer, {
          zoom: true,
          scrollX: true,
          scrollY: true,
          freeScroll: true,
          mouseWheel: true,
          disablePointer: true,
          // important to disable the pointer events that causes the issues
          disableTouch: false,
          // false if you want the slider to be usable with touch devices
          disableMouse: false,
          // false if you want the slider to be usable with a mouse (desktop)
          wheelAction: 'zoom',
          bounceTime: 300
        });

        this._iScroll.on('zoomEnd', function () {
          _this2._calcScale();

          _this2._resizeMoveLayer();

          _this2._refreshScroll();
        });
      } // Reset iScroll

    }, {
      key: "_resetScroll",
      value: function _resetScroll() {
        var iScroll = this._iScroll;

        this._calcScale();

        var scale = iScroll.scale = iScroll.options.startZoom;

        this._resizeMoveLayer(); // Reset rotation layer


        this._rotateLayerX = 0;
        this._rotateLayerY = 0;
        this._curAngle = 0;
        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, this._curAngle); // Initialize centered

        iScroll.scrollTo((this._clipWidth - this._moveLayerWidth * scale) * .5, (this._clipHeight - this._moveLayerHeight * scale) * .5);

        this._refreshScroll();
      } // Refresh iScroll
      // Duration indicates the duration of the reset animation when the moving layer is over the container

    }, {
      key: "_refreshScroll",
      value: function _refreshScroll(duration) {
        duration = duration || 0;
        var iScroll = this._iScroll,
            scale = iScroll.scale,
            iScrollOptions = iScroll.options;
        var lastScale = Math.max(iScrollOptions.zoomMin, Math.min(iScrollOptions.zoomMax, scale));

        if (lastScale !== scale) {
          iScroll.zoom(lastScale, undefined, undefined, duration);
        }

        iScroll.refresh(duration);
      } // Adjust the moving layer

    }, {
      key: "_resizeMoveLayer",
      value: function _resizeMoveLayer() {
        var iScroll = this._iScroll,
            iScrollOptions = iScroll.options,
            scale = Math.max(iScrollOptions.zoomMin, Math.min(iScrollOptions.zoomMax, iScroll.scale));
        var width = this._rotateLayerWidth,
            height = this._rotateLayerHeight,
            clipWidth = this._clipWidth / scale,
            clipHeight = this._clipHeight / scale,
            ltClipArea = false;

        if (clipWidth > width) {
          ltClipArea = true;
          var offset = clipWidth - width;
          width += offset * 2;
          iScroll.x += (this._moveLayerPaddingLeft - offset) * scale;
          this._moveLayerPaddingLeft = offset;
        } else {
          this._moveLayerPaddingLeft = 0;
        }

        if (clipHeight > height) {
          ltClipArea = true;

          var _offset = clipHeight - height;

          height += _offset * 2;
          iScroll.y += (this._moveLayerPaddingTop - _offset) * scale;
          this._moveLayerPaddingTop = _offset;
        } else {
          this._moveLayerPaddingTop = 0;
        }

        if (ltClipArea) {
          setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, this._curAngle);
          iScroll.scrollTo(iScroll.x, iScroll.y);
        }

        if (this._moveLayerWidth === width && this._moveLayerHeight === height) return;
        this._moveLayerWidth = width;
        this._moveLayerHeight = height;
        (0, _css.default)(this._$moveLayer, {
          'width': width,
          'height': height
        }); // On mobile devices, especially Android devices, when resetting the width and height for an element
        // The attributes such as offsetWidth/offsetHeight, clientWidth/clientHeight, etc. are not updated immediately, causing errors in related js programs.
        // Iscroll uses offsetWidth/offsetHeight in the refresh method to get the width and height of the scroller element ($moveLayer)
        // So you need to manually re-add the elements to the document, forcing the browser to force the width and height of the elements to be updated.

        this._$clipLayer.appendChild(this._$moveLayer);
      }
    }, {
      key: "_calcScale",
      value: function _calcScale() {
        var iScroll = this._iScroll,
            iScrollOptions = iScroll.options,
            width = this._rotateLayerWidth,
            height = this._rotateLayerHeight,
            maxZoom = this._options.maxZoom;

        if (width && height) {
          iScrollOptions.zoomMin = Math.min(1, utils.getScale(this._clipWidth, this._clipHeight, width, height));
          iScrollOptions.zoomMax = maxZoom;
          iScrollOptions.startZoom = Math.min(maxZoom, utils.getScale(this._containerWidth, this._containerHeight, width, height));
        } else {
          iScrollOptions.zoomMin = 1;
          iScrollOptions.zoomMax = 1;
          iScrollOptions.startZoom = 1;
        } // console.log('zoomMin', iScrollOptions.zoomMin);
        // console.log('zoomMax', iScrollOptions.zoomMax);
        // console.log('startZoom', iScrollOptions.startZoom);

      }
    }, {
      key: "_initRotationEvent",
      value: function _initRotationEvent() {
        var _this3 = this;

        if (is_mobile) {
          this._hammerManager = new _hammerjs.default.Manager(this._$moveLayer);

          this._hammerManager.add(new _hammerjs.default.Rotate());

          var rotateFree = this._options.rotateFree,
              bounceTime = this._iScroll.options.bounceTime;
          var startTouch, startAngle, curAngle;

          this._hammerManager.on('rotatestart', function (e) {
            if (_this3._atRotation) return;
            startTouch = true;

            if (rotateFree) {
              startAngle = (e.rotation - _this3._curAngle) % 360;

              _this3._rotateLayerRotateReady(e.center);
            } else {
              startAngle = e.rotation;
            }
          });

          this._hammerManager.on('rotatemove', function (e) {
            if (!startTouch) return;
            curAngle = e.rotation - startAngle;
            rotateFree && _this3._rotateLayerRotate(curAngle);
          });

          this._hammerManager.on('rotateend rotatecancel', function (e) {
            if (!startTouch) return;
            startTouch = false;

            if (!rotateFree) {
              curAngle %= 360;
              if (curAngle > 180) curAngle -= 360;else if (curAngle < -180) curAngle += 360;

              if (curAngle > 30) {
                _this3._rotateBy(90, bounceTime, e.center);
              } else if (curAngle < -30) {
                _this3._rotateBy(-90, bounceTime, e.center);
              }

              return;
            } // Correct when approaching the full 90 degree direction


            var angle = curAngle % 360;
            if (angle < 0) angle += 360;

            if (angle < 10) {
              curAngle += -angle;
            } else if (angle > 80 && angle < 100) {
              curAngle += 90 - angle;
            } else if (angle > 170 && angle < 190) {
              curAngle += 180 - angle;
            } else if (angle > 260 && angle < 280) {
              curAngle += 270 - angle;
            } else if (angle > 350) {
              curAngle += 360 - angle;
            }

            _this3._rotateLayerRotateFinish(curAngle, bounceTime);
          });
        } else {
          this._$moveLayer.addEventListener('dblclick', this._rotateCW90);
        }
      }
    }, {
      key: "_rotateCW90",
      value: function _rotateCW90(e) {
        this._rotateBy(90, this._iScroll.options.bounceTime, {
          x: e.clientX,
          y: e.clientY
        });
      }
    }, {
      key: "_rotateBy",
      value: function _rotateBy(angle, duration, center) {
        this._rotateTo(this._curAngle + angle, duration, center);
      }
    }, {
      key: "_rotateTo",
      value: function _rotateTo(angle, duration, center) {
        if (this._atRotation) return;

        this._rotateLayerRotateReady(center); // Rotating layer rotation ends


        this._rotateLayerRotateFinish(angle, duration);
      } // Rotation layer rotation preparation

    }, {
      key: "_rotateLayerRotateReady",
      value: function _rotateLayerRotateReady(center) {
        var scale = this._iScroll.scale;
        var coord; // Rotate the coordinates of the reference point in the moving layer

        if (!center) {
          coord = utils.loaclToLoacl(this._$moveLayer, this._$clipLayer, this._clipWidth * .5, this._clipHeight * .5);
        } else {
          coord = utils.globalToLoacl(this._$moveLayer, center.x, center.y);
        } // Since the resulting coordinates are the coordinates on the scaled coordinate system, you need to divide by the scale


        coord.x /= scale;
        coord.y /= scale; // The coordinates of the rotation reference point relative to the zero of the rotating layer (the upper left corner before the rotation of the rotating layer)

        var coordBy0 = {
          x: coord.x - (this._rotateLayerX + this._moveLayerPaddingLeft),
          y: coord.y - (this._rotateLayerY + this._moveLayerPaddingTop)
        }; // Find the rotation reference point before the rotation of the rotation layer
        // This reference point is the coordinates of the rotation center point map on the rotation layer image.
        // This position indicates the coordinates of the point before the rotation of the rotation layer

        var origin = utils.pointRotate(coordBy0, -this._curAngle);
        this._rotateLayerOriginX = origin.x;
        this._rotateLayerOriginY = origin.y; // Set the reference point, calculate the rotation layer displacement under the new reference point, and then make up the difference

        var rect = this._$rotateLayer.getBoundingClientRect();

        setOrigin(this._$rotateLayer, this._rotateLayerOriginX, this._rotateLayerOriginY);

        var newRect = this._$rotateLayer.getBoundingClientRect();

        this._rotateLayerX += (rect.left - newRect.left) / scale;
        this._rotateLayerY += (rect.top - newRect.top) / scale;
        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, this._curAngle);
      } // Rotating layer rotation

    }, {
      key: "_rotateLayerRotate",
      value: function _rotateLayerRotate(angle) {
        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, angle);
        this._curAngle = angle;
      } // Rotating layer rotation ends

    }, {
      key: "_rotateLayerRotateFinish",
      value: function _rotateLayerRotateFinish(angle, duration) {
        var _this4 = this;

        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, angle);
        var iScroll = this._iScroll,
            scale = iScroll.scale,
            iScrollOptions = iScroll.options; // Get the rotated rectangle

        var rect = this._$rotateLayer.getBoundingClientRect(); // Update the width and height of the rectangle currently being rendered by the rotation layer


        this._rotateLayerWidth = rect.width / scale;
        this._rotateLayerHeight = rect.height / scale; // Get the rectangle after displacement when the reference point is zero

        setOrigin(this._$rotateLayer, 0, 0);

        var rectByOrigin0 = this._$rotateLayer.getBoundingClientRect(); // Get the rectangle before the rotation (zero degrees)


        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, 0);

        var rectByAngle0 = this._$rotateLayer.getBoundingClientRect(); // When the reference point is zero, after the rotation layer is rotated, in the new rectangle formed, the new coordinates of the rotation layer zero (the upper left corner before the rotation of the rotation layer)


        this._rotateLayerX = (rectByAngle0.left - rectByOrigin0.left) / scale;
        this._rotateLayerY = (rectByAngle0.top - rectByOrigin0.top) / scale;

        this._calcScale();

        this._resizeMoveLayer(); // Get the rectangle of the moving layer


        var moveLayerRect = this._$moveLayer.getBoundingClientRect(); // Find the positional shift between the moving layer and the rotating layer
        // Since it is applied directly to the moving layer, there is no need to scale based on scaling.
        // Note that the offset here may also include the extra offset when the scaling is excessive.


        var offset = {
          x: rect.left - this._moveLayerPaddingLeft * scale - moveLayerRect.left,
          y: rect.top - this._moveLayerPaddingTop * scale - moveLayerRect.top
        };
        iScroll.scrollTo(iScroll.x + offset.x, iScroll.y + offset.y);

        this._refreshScroll(iScroll.options.bounceTime); // Since offset may also contain extra offsets when scaling is excessive
        // Therefore, here to determine whether to scale excessive


        var lastScale = Math.max(iScrollOptions.zoomMin, Math.min(iScrollOptions.zoomMax, scale));

        if (lastScale !== scale) {
          // When scaling is excessive, convert offset to the value corresponding to the final normal scale
          offset.x = offset.x / scale * lastScale;
          offset.y = offset.y / scale * lastScale;
        } // Since the two-finger rotation is also accompanied by scaling, after the code is executed, the _zoomEnd of iscroll will be executed.
        // This method recalculates x, y based on the position recorded at touchstart, which causes the moving layer to move back a distance after the finger leaves the screen.
        // So here we have to make the difference between the two values ??????startX and startY, and this difference must be the value corresponding to the final normal ratio.


        iScroll.startX += offset.x;
        iScroll.startY += offset.y;

        if (angle !== this._curAngle && duration && (0, _isNumber.default)(duration) && supportTransition !== undefined) {
          // Calculate the reference point of the rotating layer, set the offset before and after the zero position
          offset = {
            x: (rectByOrigin0.left - rect.left) / scale,
            y: (rectByOrigin0.top - rect.top) / scale
          }; // Set the rotation reference point back to the previous value, and adjust the offset to ensure that the view position is unchanged, ready to start the animation

          setOrigin(this._$rotateLayer, this._rotateLayerOriginX, this._rotateLayerOriginY);
          var targetX = this._rotateLayerX + this._moveLayerPaddingLeft + offset.x,
              targetY = this._rotateLayerY + this._moveLayerPaddingTop + offset.y;
          setTransform(this._$rotateLayer, targetX, targetY, this._curAngle); // Start rotating

          this._atRotation = true;
          setTransition(this._$rotateLayer, targetX, targetY, angle, duration, function () {
            _this4._atRotation = false;

            _this4._rotateFinishUpdataElem(angle);
          });
        } else {
          this._rotateFinishUpdataElem(angle);
        }
      } // Rotate to update related elements

    }, {
      key: "_rotateFinishUpdataElem",
      value: function _rotateFinishUpdataElem(angle) {
        setOrigin(this._$rotateLayer, this._rotateLayerOriginX = 0, this._rotateLayerOriginY = 0);
        setTransform(this._$rotateLayer, this._rotateLayerX + this._moveLayerPaddingLeft, this._rotateLayerY + this._moveLayerPaddingTop, this._curAngle = angle % 360);
      }
    }, {
      key: "_initFile",
      value: function _initFile() {
        var _this5 = this;

        var options = this._options;

        if (this._fileList = (0, _$.default)(options.file)) {
          this._fileList.forEach(function ($file) {
            // If the mobile terminal sets 'accept', the album will be opened slowly, so only the non-mobile side is set here.
            if (!is_mobile) {
              (0, _attr.default)($file, 'accept', 'image/jpeg, image/x-png, image/png, image/gif');
            }

            $file.addEventListener('change', _this5._fileOnChangeHandle);
          });
        }
      }
    }, {
      key: "_fileOnChangeHandle",
      value: function _fileOnChangeHandle(e) {
        var files = e.target.files;

        if (files.length) {
          this._lrzHandle(files[0]);
        }
      }
    }, {
      key: "_lrzHandle",
      value: function _lrzHandle(src) {
        var _this6 = this;

        var options = this._options,
            errorMsg = options.errorMsg;

        if (_typeof(src) === 'object' && src.type && !/image\/\w+/.test(src.type)) {
          options.loadError.call(this, errorMsg.imgError);
          return false;
        }

        this._imgLoaded = false;
        options.loadStart.call(this, src);

        try {
          (0, _lrz.default)(src, options.lrzOption).then(function (rst) {
            // Successful processing will be performed
            _this6._clearImg();

            _this6._createImg(rst.base64);
          }).catch(function (err) {
            // Processing failure will be performed
            options.loadError.call(_this6, errorMsg.imgHandleError, err);
          });
        } catch (err) {
          options.loadError.call(this, errorMsg.imgHandleError, err);
          throw err;
        }
      }
    }, {
      key: "_clearImg",
      value: function _clearImg() {
        if (!this._$img) return; // Delete old images to free up memory and prevent webview crashes on iOS devices

        this._$img.onload = null;
        this._$img.onerror = null;
        (0, _removeElement.default)(this._$img);
        this._$img = null;
        this._imgLoaded = false;
      }
    }, {
      key: "_createImg",
      value: function _createImg(src) {
        var _this7 = this;

        var options = this._options,
            errorMsg = options.errorMsg;
        this._$img = new Image();
        (0, _css.default)(this._$img, {
          'display': 'block',
          'user-select': 'none',
          'pointer-events': 'none'
        });

        this._$img.onload = function (e) {
          var img = e.target;
          _this7._imgLoaded = true;
          options.loadComplete.call(_this7, img);

          _this7._$rotateLayer.appendChild(img);

          _this7._rotateLayerWidth = img.naturalWidth;
          _this7._rotateLayerHeight = img.naturalHeight;
          (0, _css.default)(_this7._$rotateLayer, {
            'width': _this7._rotateLayerWidth,
            'height': _this7._rotateLayerHeight
          });
          (0, _hideAction.default)([img, _this7._$moveLayer], _this7._resetScroll);
        };

        this._$img.onerror = function (e) {
          options.loadError.call(_this7, errorMsg.imgLoadError, e);
        };

        (0, _attr.default)(this._$img, 'src', src);
      }
    }, {
      key: "_clipImg",
      value: function _clipImg() {
        var options = this._options,
            errorMsg = options.errorMsg;

        if (!this._imgLoaded) {
          options.fail.call(this, errorMsg.noImg);
          return;
        }

        var local = utils.loaclToLoacl(this._$moveLayer, this._$clipLayer),
            scale = this._iScroll.scale,
            ctx = this._canvas.getContext('2d');

        var scaleX = 1,
            scaleY = 1;

        if (this._outputWidth || this._outputHeight) {
          this._canvas.width = this._outputWidth;
          this._canvas.height = this._outputHeight;
          scaleX = this._outputWidth / this._clipWidth * scale;
          scaleY = this._outputHeight / this._clipHeight * scale;
        } else {
          this._canvas.width = this._clipWidth / scale;
          this._canvas.height = this._clipHeight / scale;
        }

        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.fillStyle = options.outputType === 'image/png' ? 'transparent' : options.style.jpgFillColor;
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.save();
        ctx.scale(scaleX, scaleY);
        ctx.translate(this._rotateLayerX + this._moveLayerPaddingLeft - local.x / scale, this._rotateLayerY + this._moveLayerPaddingTop - local.y / scale);
        ctx.rotate(this._curAngle * Math.PI / 180);
        ctx.drawImage(this._$img, 0, 0);
        ctx.restore();

        try {
          var dataURL = this._canvas.toDataURL(options.outputType, options.outputQuality);

          if (this._viewList) {
            this._viewList.forEach(function ($view) {
              (0, _css.default)($view, 'background-image', "url(".concat(dataURL, ")"));
            });
          }

          options.done.call(this, dataURL);
          return dataURL;
        } catch (err) {
          options.fail.call(this, errorMsg.clipError);
          throw err;
        }
      }
    }, {
      key: "_resize",
      value: function _resize(width, height) {
        (0, _hideAction.default)(this._$container, function () {
          this._containerWidth = this._$container.offsetWidth;
          this._containerHeight = this._$container.offsetHeight;
        }, this);
        var size = this._options.size,
            oldClipWidth = this._clipWidth,
            oldClipHeight = this._clipHeight;
        if ((0, _isNumber.default)(width)) size[0] = width;
        if ((0, _isNumber.default)(height)) size[1] = height;

        if (this._widthIsPercent || this._heightIsPercent) {
          var ratio = size[0] / size[1];

          if (this._widthIsPercent) {
            this._clipWidth = this._containerWidth / 100 * parseFloat(this._widthIsPercent);

            if (!this._heightIsPercent) {
              this._clipHeight = this._clipWidth / ratio;
            }
          }

          if (this._heightIsPercent) {
            this._clipHeight = this._containerHeight / 100 * parseFloat(this._heightIsPercent);

            if (!this._widthIsPercent) {
              this._clipWidth = this._clipHeight * ratio;
            }
          }
        } else {
          this._clipWidth = size[0];
          this._clipHeight = size[1];
        }

        var clipWidth = this._clipWidth,
            clipHeight = this._clipHeight;
        this._clipSizeRatio = clipWidth / clipHeight;

        if (this._outputWidth && !this._outputHeight) {
          this._outputHeight = this._outputWidth / this._clipSizeRatio;
        }

        if (this._outputHeight && !this._outputWidth) {
          this._outputWidth = this._outputHeight * this._clipSizeRatio;
        }

        (0, _css.default)(this._$clipLayer, {
          'width': clipWidth,
          'height': clipHeight,
          'margin-left': -clipWidth / 2,
          'margin-top': -clipHeight / 2
        });
        (0, _css.default)(this._$mask_left, {
          'margin-right': clipWidth / 2,
          'margin-top': -clipHeight / 2,
          'margin-bottom': -clipHeight / 2
        });
        (0, _css.default)(this._$mask_right, {
          'margin-left': clipWidth / 2,
          'margin-top': -clipHeight / 2,
          'margin-bottom': -clipHeight / 2
        });
        (0, _css.default)(this._$mask_top, {
          'margin-bottom': clipHeight / 2
        });
        (0, _css.default)(this._$mask_bottom, {
          'margin-top': clipHeight / 2
        });
        (0, _css.default)(this._$clip_frame, {
          'width': clipWidth,
          'height': clipHeight
        });
        (0, _css.default)(this._$clip_frame, prefix + 'transform', 'translate(-50%, -50%)');

        if (clipWidth !== oldClipWidth || clipHeight !== oldClipHeight) {
          this._calcScale();

          this._resizeMoveLayer();

          this._refreshScroll();

          var iScroll = this._iScroll,
              scale = iScroll.scale,
              offsetX = (clipWidth - oldClipWidth) * .5 * scale,
              offsetY = (clipHeight - oldClipHeight) * .5 * scale;
          iScroll.scrollBy(offsetX, offsetY);
        }
      }
     /**
??????????????* Set the width and height of the intercept box
??????????????* If the adaptive option is set, this method is only used to modify the aspect ratio of the clipping box.
??????????????* @param {Number} width the width of the clipping box
??????????????* @param {Number} height the height of the clipping box
??????????????* @return {PhotoClip} returns an instance object of a PhotoClip
??????????????*/

    }, {
      key: "size",
      value: function size(width, height) {
        this._resize(width, height);

        return this;
      }
      /**
??????????????* Load a picture
??????????????* @param {String|Object} The url of the src image, or the file file object of the image
??????????????* @return {PhotoClip} returns an instance object of a PhotoClip
??????????????*/

    }, {
      key: "load",
      value: function load(src) {
        this._lrzHandle(src);

        return this;
      }
     /**
??????????????* Clear current picture
??????????????* @return {PhotoClip} returns an instance object of a PhotoClip
??????????????*/

    }, {
      key: "clear",
      value: function clear() {
        this._clearImg();

        this._resetScroll();

        if (this._fileList) {
          this._fileList.forEach(function ($file) {
            $file.value = '';
          });
        }

        return this;
      }
      /**
??????????????* Image rotated to a specified angle
??????????????* @param {Number} angle Optional. Angle of rotation
??????????????* @param {Number} duration Optional. The length of the rotation animation, if it is 0 or false, it means there is no transition animation
??????????????* @return {PhotoClip|Number} Returns the instance object of the PhotoClip. If the parameter is empty, return the current rotation angle
??????????????*/

    }, {
      key: "rotate",
      value: function rotate(angle, duration) {
        if (angle === undefined) return this._curAngle;

        this._rotateTo(angle, duration);

        return this;
      }
     /**
??????????????* The image is scaled to the specified scale, if it is outside the zoom range, it will be scaled to the zoomable limit
??????????????* @param {Number} zoom Optional. Scaling, between 0 - 1
??????????????* @param {Number} duration Optional. The length of the zoom animation, if it is 0 or false, it means there is no transition animation
??????????????* @return {PhotoClip|Number} Returns the instance object of the PhotoClip. If the argument is empty, the current scale is returned
??????????????*/

    }, {
      key: "scale",
      value: function scale(zoom, duration) {
        if (zoom === undefined) return this._iScroll.scale;

        this._iScroll.zoom(zoom, undefined, undefined, duration);

        return this;
      }
      /**
??????????????* Screenshot
??????????????* @return {String} returns the Base64 string of the captured image
??????????????*/

    }, {
      key: "clip",
      value: function clip() {
        return this._clipImg();
      }
      /**
??????????????* Destruction
??????????????* @return {Undefined} No return value
??????????????*/

    }, {
      key: "destroy",
      value: function destroy() {
        var _this8 = this;

        window.removeEventListener('resize', this._resize);

        this._$container.removeChild(this._$clipLayer);

        this._$container.removeChild(this._$mask);

        (0, _css.default)(this._$container, this._containerOriginStyle);

        if (this._iScroll) {
          this._iScroll.destroy();
        }

        if (this._hammerManager) {
          this._hammerManager.off('rotatemove');

          this._hammerManager.off('rotateend');

          this._hammerManager.destroy();
        } else {
          this._$moveLayer.removeEventListener('dblclick', this._rotateCW90);
        }

        if (this._$img) {
          this._$img.onload = null;
          this._$img.onerror = null;
        }

        if (this._viewList) {
          this._viewList.forEach(function ($view, i) {
            (0, _css.default)($view, _this8._viewOriginStyleList[i]);
          });
        }

        if (this._fileList) {
          this._fileList.forEach(function ($file) {
            $file.removeEventListener('change', _this8._fileOnChangeHandle);
            $file.value = null;
          });
        }

        if (this._okList) {
          this._okList.forEach(function ($ok) {
            $ok.removeEventListener('click', _this8._clipImg);
          });
        }

        (0, _destroy2.default)(this);
      }
    }]);

    return PhotoClip;
  }();

  _exports.default = PhotoClip;
  ; // Set the transformation registration point

  function setOrigin($obj, originX, originY) {
    originX = (originX || 0).toFixed(2);
    originY = (originY || 0).toFixed(2);
    (0, _css.default)($obj, prefix + 'transform-origin', originX + 'px ' + originY + 'px');
  } // Set transform coordinates and rotation angle


  function setTransform($obj, x, y, angle) {
    // Too many decimal places in the coordinates of translate(x, y) will cause a bug
    // So here you need to keep two decimals
    x = x.toFixed(2);
    y = y.toFixed(2);
    angle = angle.toFixed(2);
    (0, _css.default)($obj, prefix + 'transform', 'translateZ(0) translate(' + x + 'px,' + y + 'px) rotate(' + angle + 'deg)');
  } // Set transform animation


  function setTransition($obj, x, y, angle, dur, fn) {
    // Here you need to read the previously set transform style, forcing the browser to render the style value to the element.
????????// Otherwise the browser may suspend the style rendering for performance reasons, and then wait until all the style settings are complete before rendering
????????// This will cause the previously set displacement to be applied to the animation as well.
    (0, _css.default)($obj, prefix + 'transform'); // The easing used here is the same as the default easing of iScroll

    (0, _css.default)($obj, prefix + 'transition', prefix + 'transform ' + dur + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)');
    setTransform($obj, x, y, angle);
    setTimeout(function () {
      (0, _css.default)($obj, prefix + 'transition', '');
      fn();
    }, dur);
  }

  module.exports = exports.default;
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  module.exports = function (context) {
    for (var _len = arguments.length, methods = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      methods[_key - 1] = arguments[_key];
    }

    methods.forEach(function (method) {
      context[method] = context[method].bind(context);
    });
  };
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  module.exports = function (context) {
    // Clear all attributes
    Object.getOwnPropertyNames(context).forEach(function (prop) {
      delete context[prop];
    });
    context.__proto__ = Object.prototype;
  };
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  var isArray = __webpack_require__(0);

  var isObject = __webpack_require__(1);

  var isBoolean = __webpack_require__(11);

  var isFunction = __webpack_require__(12);

  var isPlainObject = __webpack_require__(13);

  module.exports = function extend() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        target = arguments[0] || {},
        toString = Object.prototype.toString,
        i = 1,
        length = arguments.length,
        deep = false; // Processing deep copy

    if (isBoolean(target)) {
      deep = target; // Skip the boolean and the target

      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)


    if (!isObject(target) && !isFunction(target)) {
      target = {};
    } // If there is no merged object, then the target is a merged object, and the target is merged to the holder of the current function.


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name]; // Prevent infinite loops

          if (target === copy) {
            continue;
          } // Deep copy object or array


          if (deep && copy && ((copyIsArray = isArray(copy)) || isPlainObject(copy))) {
            if (copyIsArray) {
              copyIsArray = false;
              src = src && isArray(src) ? src : [];
            } else {
              src = src && isPlainObject(src) ? src : {};
            }

            target[name] = extend(deep, src, copy);
          } else if (copy !== undefined) {
            // Ignore only undefined values
            target[name] = copy;
          }
        }
      }
    } // Return the modified object


    return target;
  };
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine if it is a Boolean value
  module.exports = function (bool) {
    return typeof bool === 'boolean';
  };
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine whether it is a function
  module.exports = function (func) {
    return typeof func === 'function';
  };
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine if the object is a pure object (created by "{}" or "new Object")
  module.exports = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Determine if it is a percentage
  module.exports = function (value) {
    return /%$/.test(value + '');
  };
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  // Create element
  module.exports = function (parentNode, className, id, prop) {
    var elem = document.createElement('DIV');

    if (_typeof(className) === 'object') {
      prop = className;
      className = null;
    }

    if (_typeof(id) === 'object') {
      prop = id;
      id = null;
    }

    if (_typeof(prop) === 'object') {
      for (var p in prop) {
        elem.style[p] = prop[p];
      }
    }

    if (className) elem.className = className;
    if (id) elem.id = id;
    parentNode.appendChild(elem);
    return elem;
  };
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Remove element
  module.exports = function (elem) {
    elem.parentNode && elem.parentNode.removeChild(elem);
  };
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // returns the compatible prefix of the specified property in the current browser
????// Returns an empty string if no compatible prefix is ??????needed
????// all is a boolean value, if true, the property name containing the prefix is ??????returned
  module.exports = function (prop, all) {
    var returnProp = all ? prop : '';
    var testElem = document.documentElement;
    if (prop in testElem.style) return returnProp;
    var testProp = prop.charAt(0).toUpperCase() + prop.substr(1),
        prefixs = ['Webkit', 'Moz', 'ms', 'O'];

    for (var i = 0, prefix; prefix = prefixs[i++];) {
      if (prefix + testProp in testElem.style) {
        return '-' + prefix.toLowerCase() + '-' + returnProp;
      }
    }

    return returnProp;
  };
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Set style
  var isObject = __webpack_require__(1);

  var isNumber = __webpack_require__(2);

  var cssNumber = {
    'animationIterationCount': true,
    'columnCount': true,
    'fillOpacity': true,
    'flexGrow': true,
    'flexShrink': true,
    'fontWeight': true,
    'lineHeight': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'zIndex': true,
    'zoom': true
  };

  module.exports = function (elem, prop, value) {
    if (isObject(prop)) {
      for (var p in prop) {
        value = prop[p];
        if (isNumber(value) && !cssNumber[prop]) value += 'px';
        elem.style[p] = value;
      }

      return elem;
    }

    if (value === undefined) {
      return window.getComputedStyle(elem)[prop];
    } else {
      if (isNumber(value) && !cssNumber[prop]) value += 'px';
      elem.style[prop] = value;
      return elem;
    }
  };
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  // Setting properties
  module.exports = function (elem, prop, value) {
    if (_typeof(prop) === 'object') {
      for (var p in prop) {
        elem[p] = prop[p];
      }

      return elem;
    }

    if (value === undefined) {
      return elem[prop];
    } else {
      elem[prop] = value;
      return elem;
    }
  };
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var toArray = __webpack_require__(21); // Get the element (IE8 and above)


  module.exports = function (selector, context) {
    if (selector instanceof HTMLElement) {
      return [selector];
    } else if (_typeof(selector) === 'object' && selector.length) {
      return toArray(selector);
    } else if (!selector || typeof selector !== 'string') {
      return [];
    }

    if (typeof context === 'string') {
      context = document.querySelector(context);
    }

    if (!(context instanceof HTMLElement)) {
      context = document;
    }

    return toArray(context.querySelectorAll(selector));
  };
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function () {
  "use strict";

  // Similar array object to array
  module.exports = function (obj) {
    return Array.prototype.map.call(obj, function (n) {
      return n;
    });
  };
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (_exports, _hideAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getScale = getScale;
  _exports.pointRotate = pointRotate;
  _exports.angleToRadian = angleToRadian;
  _exports.loaclToLoacl = loaclToLoacl;
  _exports.globalToLoacl = globalToLoacl;
  _hideAction = _interopRequireDefault(_hideAction);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // Get the maximum zoom ratio
  function getScale(w1, h1, w2, h2) {
    var sx = w1 / w2;
    var sy = h1 / h2;
    return sx > sy ? sx : sy;
  } // Calculate the new coordinates of a point rotated around the origin


  function pointRotate(point, angle) {
    var radian = angleToRadian(angle),
        sin = Math.sin(radian),
        cos = Math.cos(radian);
    return {
      x: cos * point.x - sin * point.y,
      y: cos * point.y + sin * point.x
    };
  } // Angle turning


  function angleToRadian(angle) {
    return angle / 180 * Math.PI;
  } // Calculate the coordinates of the x and y coordinates on layerTwo on layerOne


  function loaclToLoacl(layerOne, layerTwo, x, y) {
    x = x || 0;
    y = y || 0;
    var layerOneRect, layerTwoRect;
    (0, _hideAction.default)([layerOne, layerTwo], function () {
      layerOneRect = layerOne.getBoundingClientRect();
      layerTwoRect = layerTwo.getBoundingClientRect();
    });
    return {
      x: layerTwoRect.left - layerOneRect.left + x,
      y: layerTwoRect.top - layerOneRect.top + y
    };
  } // Calculate the coordinates of the x and y coordinates relative to the window on the layer


  function globalToLoacl(layer, x, y) {
    x = x || 0;
    y = y || 0;
    var layerRect;
    (0, _hideAction.default)(layer, function () {
      layerRect = layer.getBoundingClientRect();
    });
    return {
      x: x - layerRect.left,
      y: y - layerRect.top
    };
  }
});

/***/ })
/******/ ]);
});