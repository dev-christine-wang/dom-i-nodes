/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(html) {
    if (typeof html === 'string') {
      this.htmlElements.forEach(node => node.innerHTML = html);
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
    } else if (typeof children === 'string') {
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

  parent() {
    const parentNodes = [];

    this.htmlElements.forEach(node => {
      if (!parentNodes.includes(node.parentElement)) {
        parentNodes.push(node.parentElement);
      }
    }); 

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let nodes = [];

    this.htmlElements.forEach(node => {
      const nodeList = node.querySelectorAll(selector);
      nodes = nodes.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(nodes);
  }

  remove() {
    this.htmlElements.forEach(node => node.parentNode.removeChild(node));
  }

  on(eventName, cb) {
    this.htmlElements.forEach(node => {
      node.addEventListener(eventName, cb);

      const eventKey = `DOMiNodesEvents-${eventName}`;

      if (typeof node[eventKey] === 'undefined') {
        node[eventKey] = [];
      }

      node[eventKey].push(cb);
    });
  }

  off(eventName) {
    this.htmlElements.forEach(node => {
      const eventKey = `DOMiNodesEvents-${eventName}`;

      if (node[eventKey]) {
        node[eventKey].forEach(cb => {
          node.removeEventListener(eventName, cb);
        });
      }

      node[eventKey] = [];
    });
  }
 }

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const _docReadyCbs = [];
let _docReady = false;

window.$l = arg => {
  switch(typeof(arg)) {
    case 'function':
      return pushDocReadyCb(arg);
    case 'string':
      const nodes = Array.from(document.querySelectorAll(arg));
      return new DOMNodeCollection(nodes);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

pushDocReadyCb = func => {
  if (!_docReady) {
    _docReadyCbs.push(func);
  } else {
    func();
  }
};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach(obj => {
    for (let prop in obj) {
      base[prop] = obj[prop];
    }
  });

  return base;
};

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {},
  };

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET') {
    options.url += '?' + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = obj => {
  let result = '';
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + '=' + obj[prop] + '&';
    }
  }

  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCbs.forEach(func => func());
});


/***/ })
/******/ ]);
//# sourceMappingURL=dom_i_nodes.js.map