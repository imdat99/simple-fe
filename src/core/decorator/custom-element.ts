import { h, mount } from "@core/render";
import { ElementContructor, VNode } from "@core/type";
import { $render, diff } from "..";

const randomId = (name: string) =>
  name + "_" + (Math.random() + 1).toString(36).substring(7);
function createState(stateObj: any) {
  const createDataProxyHandler = (path?: string) => ({
    get: (obj: Record<string, any>, key: string): Record<string, any> => {
      const fullPath = path ? path + "." + String(key) : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return new Proxy(obj[key], createDataProxyHandler(fullPath));
      } else {
        return obj[key];
      }
    },
    set(obj: Record<string, any>, key: string, value: any) {
      const fullPath = path ? path + "." + String(key) : key;

      stateObj._changeProp = {
        [fullPath]: {
          oldValue: obj[key],
          newValue: value,
        },
      };

      obj[key] = value;
      if (stateObj.watch) {
        stateObj.watch.call(stateObj, fullPath);
      }

      stateObj.render.call(stateObj);
      return true;
    },
  });

  const data = stateObj.data || {};
  const handler = {
    set: (_: never, key: string, value: any) => {
      if (key in data) {
        return createDataProxyHandler().set(data, key, value);
      }
      stateObj[key] = value;
      return true;
    },
    get: (_: never, key: string) => {
      if (key in data) {
        return createDataProxyHandler().get(data, key);
      }
      return stateObj[key];
    },
  };

  return new Proxy(stateObj, handler);
}

const isProxy = (obj: object) => {
  try {
    postMessage(obj, window as any);
  } catch (error) {
    return error && (error as any).code === 25;
  }
  return false;
};

export function define(tagname: string) {
  return function classDecorator<T extends ElementContructor>(constructor: T) {
    const compnentId = randomId(constructor.name);

    const Generated = class extends constructor {
      private $oldView!: VNode;
      $id = compnentId;
      connectedCallback() {
        if (this.stateData) {
          this.data = this.stateData();
        }
        if (this.view) {
          this.mount();
        }
        if (this.data && !isProxy(this.data)) {
          this.data = createState(this);
        }
        if (this.connected) {
          this.connected(this.$id);
        }
      }
      disconnectedCallback() {
        if (this.disconnected) {
          this.disconnected();
        }
      }
      render() {
        const newView = this.view ? this.view() : h("");
        this.$rootEl = diff(
          this.$oldView,
          newView
        )(this.$rootEl as any) as HTMLElement;
        this.$oldView = newView;
        if (this.watchRender) {
          this.watchRender();
        }
      }

      mount() {
        this.replaceChildren(
          (this.$rootEl = mount(
            $render((this.$oldView = this.view ? this.view() : h("div"))),
            (this.$rootEl = document.createTextNode("") as any)
          ) as HTMLElement)
        );
      }
    };
    customElements.define(tagname, Generated);
    return Generated;
  };
}
