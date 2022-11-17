export type Effect = (...args: any) => void;
export type Target = Record<string, any>;
let activeEffect: Effect | null;
export class Dep {
  private subscribers = new Set<Effect>();

  depend(Effect: any) {
    this.subscribers.add(Effect);
  }

  notify(payload: any) {
    this.subscribers.forEach((effect: Effect) => {
      effect(payload);
    });
  }
}

export function watchEffect(effect: Effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

export function watchRender(render: Effect) {
  activeEffect = render;
  const tempTimeout = setTimeout(() => {
    activeEffect = null;
  }, 0);
  clearTimeout(tempTimeout);
}

export function watch(fn: Effect, dep: [any]) {
  activeEffect = fn;
  // effect();
  // fn()
  // args[0].call()
  dep.forEach((item: any) => {
    if (typeof item === "function") {
      item.call();
    } else if (typeof item === "object") {
      Object.values(item);
    } else {
      item.value;
    }
  });
  activeEffect = null;
}
