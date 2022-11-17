import { Effect } from "@/reactive";

export enum HOOK_TYPE {
  init = "InitHook",
  create = "CreateHook",
  insert = "InsertHook",
  prepatch = "PrePatchHook",
  update = "UpdateHook",
  postpatch = "PostPatchHook",
  destroy = "DestroyHook",
  remove = "RemoveHook",
  post = "PostHook",
}

interface IHook {
  type: HOOK_TYPE;
  effect: Effect;
  id: string;
}

let activeHook: IHook | null;

export class HOOK {
  subscribers = new Set<IHook>();

  depend(id: string) {
    if (activeHook) {
      console.log("this", this.subscribers, id)
      this.subscribers.add(activeHook);
    }
  }

  notify(type: HOOK_TYPE, id: string) {
    this.subscribers.forEach((hook: IHook) => {
      if (hook.type === type && hook.id === id) {
        // effect();
        hook.effect();
      }
    });
  }
}

  
const randomId = () => String(Math.random()) + Date.now()

export function onCreated(effect: Effect) {
  activeHook = { type: HOOK_TYPE.create, effect, id: randomId() };
  const tempTimeout = setTimeout(() => {
    activeHook = null;
  }, 0);
  clearTimeout(tempTimeout)
}

export function onInit(effect: Effect) {
  activeHook = { type: HOOK_TYPE.init, effect, id: randomId() };
  const tempTimeout = setTimeout(() => {
    activeHook = null;
  }, 0);
  clearTimeout(tempTimeout)
}

export function onDestroyed(effect: Effect) {
  activeHook = { type: HOOK_TYPE.destroy, effect, id: randomId() };
  const tempTimeout = setTimeout(() => {
    activeHook = null;
  }, 0);
  clearTimeout(tempTimeout)
}

// Vue 2 version
// function reactive(raw: ) {
//   Object.keys(raw).forEach((key) => {
//     const dep = new Dep();
//     let value = raw[key];

//     Object.defineProperty(raw, key, {
//       get() {
//         dep.depend();
//         return value;
//       },
//       set(newValue) {
//         value = newValue;
//         dep.notify();
//       },
//     });
//   });

//   return raw;
// }
