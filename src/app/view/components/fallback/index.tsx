import { define } from "@core/decorator";
import { h } from "@core/render";
import "./fallback.css";

export const LoadingScren = () => (
  <div class="loader">
    <div class="loader-inner ball-spin-fade-loader">
      {Array.from({ length: 8 }, () => h("div"))}
    </div>
  </div>
);
@define("fall-back")
export class FallBack extends HTMLElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return <LoadingScren />;
  }
}
