import { VNode } from "snabbdom";
import { App } from ".";
export type State<S> = S[keyof S];
export type Component<S = Record<string, any>, V = any> = Partial<App> & {
  state?: S;
  [s: string]: any;
  view: (props: V) => VNode;
};
