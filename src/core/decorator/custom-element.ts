import { h, mount } from "@core/render";
import { CustomElement, VNode } from "@core/type";
import { $render, diff } from "..";

const randomId = (name: string) =>
  name + "_" + (Math.random() + 1).toString(36).substring(7);
function createState(stateObj: any) {
  const createDataProxyHandler = (path?: string) => ({
    get: (obj: Record<string, any>, key: string): Record<string, any> => {
      const fullPath = path ? path + "." + String(key) : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return new Proxy(obj[key], createDataProxyHandler(fullPath));
        // console.log("aaa", obj[key]);
        // return obj[key];
      } else {
        return obj[key];
      }
    },
    set(obj: Record<string, any>, key: string, value: any) {
      const fullPath = path ? path + "." + String(key) : key;
      // console.log("set", obj);

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
      // if (key in props) {
      //   // first prop
      //   return createDataProxyHandler().set(props, key, value);
      // } else
      if (key in data) {
        //   // then data
        return createDataProxyHandler().set(data, key, value);
      }
      // } else {
      //   // then class propertry and function
      //   vueInstance[key] = value;
      // }
      stateObj[key] = value;
      return true;
    },
    get: (_: never, key: string) => {
      // if (key in props) {
      //   // first prop
      //   return createDataProxyHandler().get(props, key);
      // } else if (key in data) {
      //   // then data
      if (key in data) {
        return createDataProxyHandler().get(data, key);
      }
      // } else if (key in computed) {
      //   // then computed
      //   return computed[key].call(vueInstance.proxy);
      // } else if (key in methods) {
      //   // then methods
      //   return methods[key].bind(vueInstance.proxy);
      // } else {
      //   // then class propertry and function
      //   return vueInstance[key];
      // }
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
  return function classDecorator<
    T extends {
      new (...args: any[]): Partial<CustomElement>;
    } & CustomElementConstructor
  >(constructor: T) {
    const compnentId = randomId(constructor.name);
    // const compnentDefaultState = componentStateMap.get(compnentId);

    const Generated = class extends constructor {
      private $rootEl!: HTMLElement | Text;
      private $oldView!: VNode;
      private $id = compnentId;
      connectedCallback() {
        if (this.stateData) {
          this.data = this.stateData();
        }
        if (this.view) {
          this.mount();
        }
        if (this.data && !isProxy(this.data)) {
          this.data = createState(this);
          // if (!compnentDefaultState) {
          // componentStateMap.set(compnentId, this.data);
          // }
        }
        if (this.connected) {
          this.connected();
        }
      }
      disconnectedCallback() {
        if (this.disconnected) {
          this.disconnected();
        }
        // console.log("diss", compnentId, this.data);
      }
      render() {
        const newView = this.view ? this.view() : h("div");
        this.$rootEl = diff(
          this.$oldView,
          newView
        )(this.$rootEl as any) as HTMLElement;
        this.$oldView = newView;
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
