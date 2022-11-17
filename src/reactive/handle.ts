import { Dep, Target } from "./dep";

const targetMap = new WeakMap();

function getDep(target: Target, key: string) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

const reactiveHandlers = {
  get(target: Target, key: string, receiver: any) {
    const dep = getDep(target, key);
    dep.depend();
    return Reflect.get(target, key, receiver);
  },
  set(target: Target, key: string, value: any, receiver: any) {
    const dep = getDep(target, key);
    const result = Reflect.set(target, key, value, receiver);
    dep.notify();
    return result;
  },
  // additional traps
  // has() {
  //   // triggered when using `key` in state
  // },
  // ownKeys() {
  //   // triggered when using Object.keys(state)
  // },
};

// Proxy and reactive handlers also work on arrays.
export function reactive<T extends object = any>(raw: T) {
  return new Proxy<T>(raw, reactiveHandlers);
}

export function ref<T = any>(value: T) {
  return new Proxy<{value: T}>({value}, reactiveHandlers)
}