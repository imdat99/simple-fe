import { H, VNode } from "./type";

// dom api
const renderElem = (Vel: VNode) => {
  const { tagName, attrs, children } = Vel || {};
  if (typeof tagName === "function") {
    return render((tagName as Function)({ ...attrs, children }));
  }
  const $el = document.createElement(tagName!);

  // set attributes
  for (const [k, v] of Object.entries(attrs || {})) {
    switch (k) {
      case "on":
        for (const [event, handler] of Object.entries(v || {})) {
          if (typeof handler === "function") {
            $el.addEventListener(event, handler as EventListener, false);
          }
        }
        break;
      case "props":
        break;
      case "html":
        $el.replaceChildren(v);
        break;
      default:
        $el.setAttribute(k, v);
        break;
    }
  }

  // set children
  for (const child of children || []) {
    const $child = render(child as VNode);
    if ($child) $el.appendChild($child);
  }

  return $el;
};

export const render = (vNode: VNode): HTMLElement => {
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode)) as any;
  }

  return renderElem(vNode);
};

export const mount = ($node: HTMLElement | Text, $target: HTMLElement) => {
  $target.replaceWith($node);
  return $node;
};

// hyperscript
export const h: H = (tagName = "", attrs, ...children): VNode => {
  return {
    tagName,
    attrs: attrs || {},
    children: (children || []).map((item) => item || "").flat(),
  };
};
