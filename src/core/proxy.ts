import { App } from ".";

let _target: any = null;

export function createProxy(appInsrance: App) {
  /**
   * collect: collect dependences
   * @param {string} key The property path in data. For example, student.name students[0].name
   */
  function collect(key: any) {
    key;
    // _target is set in Watcher's constructor
    if (_target) {
      // appInsrance.$watch(key, _target._update.bind(_target));
    }
  }

  const createDataProxyHandler = (path?: any) => {
    return {
      set: (obj: any, key: any, value: any) => {
        const fullPath = path ? path + "." + key : key;

        const pre = obj[key];
        obj[key] = value;

        appInsrance.notifyChange(fullPath, pre, value);

        return true;
      },
      get: (obj: any, key: any) => {
        const fullPath = path ? path + "." + key : key;

        collect(fullPath);

        if (typeof obj[key] === "object" && obj[key] !== null) {
          return new Proxy<any>(obj[key], createDataProxyHandler(fullPath));
        } else {
          return obj[key];
        }
      },
      deleteProperty: (obj: any, key: any) => {
        if (key in obj) {
          const fullPath = path ? path + "." + key : key;
          const pre = obj[key];
          delete obj[key];
          appInsrance.notifyChange(fullPath, pre, undefined);
        }
        return true;
      },
    };
  };

  const state = appInsrance.options.state || {};
  const props = appInsrance?.options || {};
  // const methods = appInsrance.$options.methods || {};
  // const computed = appInsrance.$options.computed || {};

  const handler = {
    set: (_: any, key: string, value: any) => {
      if (key in props) {
        // first prop
        return createDataProxyHandler().set(props, key, value);
      } else if (key in state) {
        // then data
        return createDataProxyHandler().set(state, key, value);
      } else {
        // then class propertry and function
        (appInsrance as any)[key] = value;
      }

      return true;
    },
    get: (_: any, key: string) => {
      if (key in props) {
        // first prop
        return createDataProxyHandler().get(props, key);
      } else if (key in state) {
        // then data
        return createDataProxyHandler().get(state, key);
        // } else if (key in computed) {
        //   // then computed
        //   return computed[key].call(appInsrance.proxy);
        // } else if (key in methods) {
        //   // then methods
        //   return methods[key].bind(appInsrance.proxy);
      } else {
        // then class propertry and function
        return (appInsrance as any)[key];
      }
    },
  };
  return new Proxy(appInsrance, handler);
}

/**
 * @param {Watcher|ComputedWatcher|Mfe} target must implement update method
 */
export function setTarget(target: any) {
  _target = target;
}

export function clearTarget() {
  _target = null;
}
