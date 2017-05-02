class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(string) {
    if (typeof string === 'string') {
      for (let i = 0; i < this.htmlElements.length; i++) {
        this.htmlElements[i].innerHTML = string;
      }
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }
}
