import { AppElement } from "./appelement";

export type VChild = VNode | String | H;
export type H = (
  t: string,
  a?: Record<string, unknown> | null,
  ...c: VChild[] | any[]
) => VNode;
export type Attrs = Record<string, any>;
export interface VNode {
  tagName?: string;
  attrs: Attrs;
  children: VChild[];
}

export type ChildPatch = ($node: HTMLElement) => HTMLElement | String;
export type AdditionalPatch = (e: HTMLElement) => HTMLElement;
export type ChangePropCallback = Map<any, (ov?: any, nv?: any) => void>;

export type CustomElement = {
  _changePropCallbacks?: Record<string, string[]>;
  connected?: () => void;
  disconnected?: () => void;
  view: () => VNode;
  data: Record<string, unknown>;
  stateData: () => Record<string, any>;
};

export type ElementContructor = {
  new (...args: any[]): Partial<CustomElement & AppElement>;
} & CustomElementConstructor;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
