import { observerImg } from "@app/utils/helper/lazyimg";
import { RootState } from "./store";
import { CustomElement, VNode } from "./type";

export interface AppElement<T = Record<string, any>> {
  watchRender(): void;
  connected(id?: string): void;
  connectStore<T>(store: RootState<T>): void;
  watch(property: string): void;
  disconnected(id?: string): void;
  view(): VNode;
  stateData(): T;
}
export abstract class AppElement<T = Record<string, any>>
  extends HTMLElement
  implements CustomElement<T>
{
  params: any;
  props: any = {};
  $id!: string;
  observer!: IntersectionObserver;
  $rootEl!: HTMLElement;
  constructor() {
    super();
    this.observer = observerImg();
  }
  data!: T;
}
