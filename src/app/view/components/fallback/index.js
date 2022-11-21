import $render, { h, mount } from "@core/index";
import "./fallback.css";
export class FallBack extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mount();
  }
  count = 0;

  view() {
    return h("div", { class: "loader" }, [
      h(
        "div",
        { class: "loader-inner ball-spin-fade-loader" },
        Array.from({ length: 8 }, () => h("div"))
      ),
    ]);
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

customElements.define("fall-back", FallBack);
