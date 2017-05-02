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

  parent() {
    const parentNodes = [];

    this.htmlElements.forEach(parentNode =>
      parentNode.visted ? parentNodes.push(parentNode) : parentNode.visited = true);

    parentNode.forEach(node => node.visited = false);

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
 }

module.exports = DOMNodeCollection;
