import { h, mount } from "@core/render";
import { CustomElement, VNode } from "@core/type";
import { $render, diff } from "..";

const createState = (Com: any) => {
  return new Proxy(Com.data, {
    set(target, property, value) {
      target[property] = value;
      if (Com.watch) {
        Com.watch.call(Com, property);
      }
      Com.render.call(Com);
      return true;
    },
  });
};

export function customElement(tagname: string) {
  return function classDecorator<
    T extends {
      new (...args: any[]): Partial<CustomElement>;
    } & CustomElementConstructor
  >(constructor: T) {
    const Generated = class extends constructor {
      private $rootEl!: HTMLElement;
      private $oldView!: VNode;
      connectedCallback() {
        if (this.view) {
          this.mount();
        }
        if (this.data) {
          this.data = createState(this);
        }
        if (this.connected) {
          this.connected();
        }
      }

      render() {
        const newView = this.view ? this.view() : h("div");
        this.$rootEl = diff(
          this.$oldView,
          newView
        )(this.$rootEl) as HTMLElement;
        this.$oldView = newView;
      }

      mount() {
        this.replaceChildren(
          (this.$rootEl = mount(
            $render((this.$oldView = this.view ? this.view() : h("div"))),
            (this.$rootEl = document.createElement("div"))
          ) as HTMLElement)
        );
      }
    };
    customElements.define(tagname, Generated);
    return Generated;
  };
}
