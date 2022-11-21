import appRoute from "@app/routes";
import $render, { h, mount } from "@core/index";

export class AppNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mount();
  }
  count = 0;

  view() {
    return h(
      "div",
      {},
      appRoute
        .filter((item) => item.name)
        .map((item) =>
          h("div", null, [
            h("app-link", { to: item.path, target: "_blank" }, [item.name]),
          ])
        )
    );
  }

  render() {
    const newView = this.view();
    this.$rootEl = diff(this.$oldView, newView)(this.$rootEl);
    this.$oldView = newView;
  }

  mount() {
    this.replaceChildren(
      (this.$rootEl = mount(
        $render((this.$oldView = this.view())),
        (this.$rootEl = document.createElement("div"))
      ))
    );
  }
}

customElements.define("app-nav", AppNav);
