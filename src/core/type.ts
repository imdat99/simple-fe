export type VChild = VNode | String | H;
export type H = (
  t: string,
  a?: Record<string, unknown> | null,
  ...c: VChild[] | any[]
) => VNode;
export type Attrs = Record<string, any>;
export interface VNode {
  tagName: string;
  attrs: Attrs;
  children: VChild[];
}

export type ChildPatch = ($node: HTMLElement) => HTMLElement | String;
export type AdditionalPatch = (e: HTMLElement) => HTMLElement;

export type CustomElement = {
  connected: () => void;
  view: () => VNode;
  data: Record<string, unknown>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
