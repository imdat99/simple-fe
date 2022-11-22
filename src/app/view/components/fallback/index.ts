import { customElement } from "@core/decorator";
import { h } from "@core/render";
import "./fallback.css";

@customElement('fall-back')
export class FallBack extends HTMLElement {
  constructor() {
    super();
  }

  connected() {

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

}
