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
import { clearTarget, createProxy, setTarget } from "./proxy";
import { Component } from "./types";

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
  const id = String(Math.random()) + Date.now();
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

export class App {
  constructor(component: Component) {
    this.options = component;
    this.proxy = createProxy(this);
    this.initWatcher();
    this.initWatch();
    return this.proxy;
  }
  options: Component;
  private proxy: any;
  private $oldNode!: VNode;
  $el!: VNode;
  deps: any;
  private props: any;
  private initWatcher() {
    this.deps = {};
  }

  private initWatch() {
    // const watch = this.options.watch || {};
    // const computed = this.options.computed || {};
    // const data = this.state;
    // for (let key in watch) {
    //   const handler = watch[key];
    //   if (key in data) {
    //     this.$watch(key, handler.bind(this.proxy));
    //   } else if (key in computed) {
    //     new ComputedWatcher(this.proxy, computed[key], handler);
    //   } else {
    //     throw "i don't know what you wanna do";
    //   }
    // }
  }

  notifyChange(key: any, pre: any, val: any) {
    key;
    pre;
    val;
    // const dep = this.deps[key];
    // dep && dep.notify({ pre, val });
    this.run.call(this.proxy, this.props);
  }
  private run<T>(props: T) {
    // console.log(this.$el);
    const vnode = this.options.view.call(this, props);
    const dom: VNode = {
      ...vnode,
      data: {
        ...vnode.data,
        hook: {
          create: () => {
            console.log("created");
            // hook.notify(HOOK_TYPE.create, id);
          },
        },
      },
    };
    if (this.$oldNode) {
      this.$el = patch(this.$oldNode, vnode);
    }
    this.$oldNode = dom;
  }
  $mount<T>(mountOption?: { root?: HTMLElement | VNode; props?: T }) {
    const { root, props } = mountOption || {};
    this.$oldNode = root as VNode;
    // this.$el = root as VNode;
    this.props = props;
    // collect dependences on first rendering
    setTarget(this);
    this.run(props);
    clearTarget();
    return this.$oldNode;
  }
}

export function appComponent<T = any, P = any>(component: Component<T, P>) {
  // const dep = new Dep();
  const com = new App(component);
  // console.log(com);
  return com;
}

export const cx = (classNames: string) => ({
  ...classNames
    .trim()
    .split(" ")
    .reduce(
      (acc: Record<string, boolean>, className) => ({
        ...acc,
        [className]: true,
      }),
      {}
    ),
});
