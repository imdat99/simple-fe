import $render, { h, mount } from "@core/index";
export class AppMovie extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mount();
  }
  count = 0;

  view() {
    return h("div", {}, [h("h1", null, ["Phim"])]);
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

customElements.define("movie-page", AppMovie);
