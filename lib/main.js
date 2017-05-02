const DOMNodeCollection = require('./dom_node_collection.js');

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
