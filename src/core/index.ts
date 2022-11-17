import { watchRender } from "@/reactive/dep";
import {
  classModule,
  eventListenersModule,
  init,
  propsModule,
  styleModule,
  VNode,
} from "snabbdom";
import { HOOK, HOOK_TYPE } from "./hooks";

export const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

export function view(render: () => VNode) {
  let vdom: VNode;
  const hook = new HOOK();
  const id = String(Math.random()) + Date.now()
  hook.depend(id);
  const renderView = (el = vdom) => {
    vdom = el ? patch(el, render()) : render();
    const dom: VNode = {
      ...vdom,
      data: {
        ...vdom.data,
        hook: {
          create: () => {
            hook.notify(HOOK_TYPE.create, id);
          },
        },
      },
    };
    return dom;
  };
  watchRender(() => renderView());
  return renderView();
}
