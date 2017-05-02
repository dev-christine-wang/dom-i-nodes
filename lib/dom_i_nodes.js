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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(argument) {
  if (typeof argument === 'string') {
    const nodes = Array.from(document.querySelectorAll(argument));
    return new DOMNodeCollection(nodes);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(node => node.innerHTML = html);
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.htmlElements.length === 0) {
      return;
    }

    if (children instanceof DOMNodeCollection) {
      this.htmlElements.forEach(node => {
        children.htmlElements.forEach(childNode => {
          node.innerHTML += childNode.outerHTML;
        });
      });
    } else if (children instanceof HTMLElement) {
      children = $l(children);
    } else if (typeof children === 'string'){
      this.htmlElements.forEach(node => node.innerHTML += children);
    }
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.htmlElements.forEach(node => node.setAttribute(key, val));
    } else {
      return this.htmlElements[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.htmlElements.forEach(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.htmlElements.forEach(node => node.classList.remove(oldClass));
  }

  children() {
    let childNodes = [];
    this.htmlElements.forEach(node => {
      childNodes = childNodes.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(childNodes);
  }
}


/***/ })
/******/ ]);