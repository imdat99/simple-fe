import { Action, Reducer, RootState, Subscriber } from "./types";
export * from "./types";
function createStore(reducer: Reducer) {
  let state = undefined as any as RootState;
  const subscribers: Subscriber[] = [];
  let store = {
    getState: () => state,
    dispatch: (action: Action) => {
      state = reducer(state, action);
      subscribers.forEach((handler) => handler());
    },
    subscribe: (handler: Subscriber) => {
      subscribers.push(handler);

      return () => {
        let index = subscribers.indexOf(handler);
        if (index >= 0) {
          subscribers.splice(0, index);
        }
      };
    },
  };
  store.dispatch({ type: "INIT" });
  return store;
}
export default createStore;
