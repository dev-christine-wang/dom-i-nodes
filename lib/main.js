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
