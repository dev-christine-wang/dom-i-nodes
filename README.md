# DOMiNodes

DOMiNodes is a lightweight JavaScript library for DOM manipulation, inspired by jQuery.

## API

[DOM Manipulation](#dom-manipulation)  
  * [`$l(selector)`](#$l(selector))  
  * [`$l(HTMLElement)`](#$l(HTMLElement))
  * [`DOMNodeCollection.prototype.html`](#DOMNodeCollection.prototype.html)  
  * [`DOMNodeCollection.prototype.empty`](#DOMNodeCollection.prototype.empty)  
  * [`DOMNodeCollection.prototype.append(child)`](#DOMNodeCollection.prototype.append(child))  
  * [`DOMNodeCollection.prototype.attr(key, val)`](DOMNodeCollection.prototype.attr(key, val))  
  * [`DOMNodeCollection.prototype.addClass(newClass)`](#DOMNodeCollection.prototype.addClass(newClass))  
  * [`DOMNodeCollection.prototype.removeClass(oldClass)`](DOMNodeCollection.prototype.removeClass(oldClass))  

[DOM Traversal](#dom-traversal)  
  * [`DOMNodeCollection.prototype.children`](#DOMNodeCollection.prototype.children)  
  * [`DOMNodeCollection.prototype.parent`](#DOMNodeCollection.prototype.parent)  
  * [`DOMNodeCollection.prototype.find(selector)`](#DOMNodeCollection.prototype.find(selector))
  * [`DOMNodeCollection.prototype.remove`](#DOMNodeCollection.prototype.remove)  

[Event Listeners](#event-listeners)  
  * [`DOMNodeCollection.prototype.on(eventName, cb)`](#DOMNodeCollection.prototype.on(eventName, cb))  
  * [`DOMNodeCollection.prototype.off(eventName)`](#DOMNodeCollection.prototype.off(eventName))  

[AJAX](#ajax)
  * [`$l.extend(base, ...otherObjs)`](#lextend(base, ...otherObjs))
  * [`$l.ajax(options)`](#lajax(options))

### DOM Manipulation

#### `$l(selector)`
Returns an instance of `DOMNodeCollection` with a list of all the elements within the document that match the provided string with CSS selector
#### `$l(HTMLElement)`
Returns an instance of `DOMNodeCollection` with a list of all the elements within the document that match the provided HTML element
#### `DOMNodeCollection.prototype.html`
Updates the `innerHTML` of all the nodes if an argument is provided.  Returns the `innerHTML` of the first node if an argument isn't provided
#### `DOMNodeCollection.prototype.empty`
Clears out the content of all the nodes
#### `DOMNodeCollection.prototype.append(child)`
Appends the `outerHTML` of an HTML element, a string, or each element in a jQuery-lite wrapped collection to the `innerHTML` of all the nodes
#### `DOMNodeCollection.prototype.attr(key, val)`
Returns the value for the provided key for the first node if only the key is provided.  Sets the value for the provided key for all the nodes if both the key and value are provided.
#### `DOMNodeCollection.prototype.addClass(newClass)`
Adds class to all the nodes
#### `DOMNodeCollection.prototype.removeClass(oldClass)`
Removes class from all the nodes

### DOM Traversal

#### `DOMNodeCollection.prototype.children`
Returns an instance of `DOMNodeCollection` of all the nodes' children
#### `DOMNodeCollection.prototype.parent`
Returns an instance of `DOMNodeCollection` of all the nodes' parents
#### `DOMNodeCollection.prototype.find(selector)`
Returns an instance of `DOMNodeCollection` of all the nodes matching the selector that are descendants of the nodes
#### `DOMNodeCollection.prototype.remove`
Removes the HTML and all the nodes from the DOM

### Event Listeners

#### `DOMNodeCollection.prototype.on(eventName, cb)`
Adds event handler to all the nodes by storing the callback as a value of the eventName property
#### `DOMNodeCollection.prototype.off(eventName)`
Removes event handler from all the nodes by checking the eventName property and removing the callback value

### AJAX

#### `$l.extend(base, ...otherObjs)`
Merges two or more objects
#### `$l.ajax(options)`
Sends asynchronous AJAX request

The `extend` and `ajax` functions have been implemented in the following way:
```JavaScript
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
```

After a XHR object is created, a callback is registered and the request is sent off with optional data.

## Example Usage

To demonstrate the versatility and functionality of DOMiNodes, I've built a to-do list app using the library.  To check out the app, download this [repo](https://github.com/christinewang319/dom-i-nodes#on), and open /demo/index.html in the terminal.
