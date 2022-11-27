import { observerImg } from "@app/utils/helper/lazyimg";

export class AppElement extends HTMLElement {
  params: any;
  $nextick: any;
  props: any;
  data: any;
  $id!: string;
  observer!: IntersectionObserver;
  $rootEl!: HTMLElement;
  constructor() {
    super();
    this.observer = observerImg();
  }
}
