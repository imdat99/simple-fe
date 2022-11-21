export * from "./diff";
// dom api
const renderElem = ({ tagName, attrs, children }) => {
  const $el = document.createElement(tagName);

  // set attributes
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "on" ) {
      for (const [event, handler] of Object.entries(v || {})) {
        if(typeof handler === 'function') {
          $el.addEventListener(event, handler, false)
        }
      }
    } else {
      $el.setAttribute(k, v);
    }
  }

  // set children
  for (const child of children) {
    const $child = render(child);
    $el.appendChild($child);
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

export default render;

export const mount = ($node, $target) => {
  $target.replaceWith($node);
  return $node;
};

// hyperscript

export const h = (tagName, attrs, children = []) => {
  return {
    tagName,
    attrs: attrs || {},
    children,
  };
};
