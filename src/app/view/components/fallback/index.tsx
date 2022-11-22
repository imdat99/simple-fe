import { customElement } from "@core/decorator";
import { h } from "@core/render";
import "./fallback.css";

@customElement("fall-back")
export class FallBack extends HTMLElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return (
      <div class="loader">
        <div class="loader-inner ball-spin-fade-loader">
          {Array.from({ length: 8 }, () => h("div"))}
        </div>
      </div>
    );
  }
}
