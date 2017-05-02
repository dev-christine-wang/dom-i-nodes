const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(argument) {
  if (typeof argument === 'string') {
    const nodes = Array.from(document.querySelectorAll(argument));
    return new DOMNodeCollection(nodes);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);
  }
};
