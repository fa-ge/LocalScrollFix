(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LocalScrollFix.js"] = factory();
	else
		root["LocalScrollFix.js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 使ios浏览器中局部滚动内容未占满视窗的一屏时候不出界
 */
var LocalScrollFix = function () {
    function LocalScrollFix(win) {
        _classCallCheck(this, LocalScrollFix);

        if (!win || win === window) return null;
        this.win = win;

        var fixDom = win.querySelector('.localScrollFix-fixDom');
        if (!fixDom) {
            this.createFixDom();
        } else {
            this.fixDom = fixDom;
        }

        this.isArrived = false;
        this.update();
    }

    _createClass(LocalScrollFix, [{
        key: 'createFixDom',
        value: function createFixDom() {
            this.win.insertAdjacentHTML('beforeend', '<div class="localScrollFix-fixDom" style="margin: 0; padding: 0"></div>');
            this.fixDom = this.win.querySelector('.localScrollFix-fixDom');
        }
    }, {
        key: 'removeFixDom',
        value: function removeFixDom() {
            this.win.removeChild(this.fixDom);
            this.fixDom = null;
        }
    }, {
        key: 'arrived',
        value: function arrived() {
            this.isArrived = true;
            this.removeFixDom();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.isArrived) {
                return;
            }

            var fixDomPaddingTop = this.computerFixDomPaddingTop();
            if (fixDomPaddingTop >= 0) {
                this.fixDom.style.paddingTop = fixDomPaddingTop + 2 + 'px';
            } else {
                this.arrived();
            }
        }

        /**
         * 计算fixDom所需要的paddingTop值
         * @returns {number}
         */

    }, {
        key: 'computerFixDomPaddingTop',
        value: function computerFixDomPaddingTop() {
            var fixDom = this.fixDom,
                win = this.win;


            var fixDomTop = fixDom.getBoundingClientRect().top;
            var winBottom = win.getBoundingClientRect().bottom;

            var _window$getComputedSt = window.getComputedStyle(win, null),
                winPaddingBottom = _window$getComputedSt.paddingBottom,
                winBorderBottomWidth = _window$getComputedSt.borderBottomWidth;

            return winBottom - parseFloat(winPaddingBottom) - parseFloat(winBorderBottomWidth) - fixDomTop;
        }
    }]);

    return LocalScrollFix;
}();

/* harmony default export */ exports["default"] = LocalScrollFix;


window.LocalScrollFix = LocalScrollFix;

/***/ }
/******/ ]);
});