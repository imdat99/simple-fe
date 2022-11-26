import { define } from "@core/decorator";
import { h } from "@core/render";
import "./fallback.scss";

export const LoadingScren = () => (
  <div class="loader">
    <div class="loader-inner ball-spin-fade-loader" data-loading="Đang tải...">
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
