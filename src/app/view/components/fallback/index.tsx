import { define } from "@core/decorator";
import { h } from "@core/render";
import "./fallback.scss";

export const LoadingScren = () => (
  <div class="loader">
    <div class="loader-inner" data-loading="Đang tải...">
      <div class="ball-spin-fade-loader">
        {Array.from({ length: 4 }, () => (
          <div class="loader-item" />
        ))}
      </div>
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
